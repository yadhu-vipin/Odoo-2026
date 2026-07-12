'use client'
import {prisma} from "../utils/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail} from "../utils/sendMail.js"
import crypto from "crypto";
import { RequestHandler } from "express";

type VerificationPayload = {
  userData: { name: string; email: string; password: string,};
  otp: string;
};
const generateEncodedToken = ({userId,role}:{userId:number,role:number}) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign(
    { userId ,role},
    secret,
    { expiresIn: "7d" }
  );

  return Buffer.from(token).toString("base64");
};

function getRandomInt(min:number, max:number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const signup:RequestHandler = async (req, res) => {
  console.log(req.body,"Null")
  const { userData } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.mail },
  });
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const otp = getRandomInt(100000, 999999).toString();
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const verificationToken = jwt.sign(
    {
      userData: {
        name: userData.name,
        email: userData.mail,
        password: hashedPassword,
      },
      otp,
    },
    secret,
    { expiresIn: "10m" },
  );

  await sendEmail(
    userData.mail,
    "Verify Your Account",
    `Your verification code is: <b>${otp}</b>. It expires in 10 minutes.`,
  ).catch(console.error);

  res.status(200).json({
    message: "OTP sent to email. Please verify to complete registration.",
    verificationToken,
  });
};
export const verifyOtp:RequestHandler =async (req, res) => {
  const { otp, verificationToken } = req.body;

  if (!otp || !verificationToken) {
    return res.status(400).json({ message: "OTP and token are required" });
  }

  try {
    const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
    const decoded = jwt.verify(verificationToken, secret)  as unknown as VerificationPayload;

    if (decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }
    console.log(decoded.userData)
    const { name, email, password } = decoded.userData;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        isEmailVerified: true,
        roleId:2
      },
    });

    const sessionToken = generateEncodedToken(
      {
        userId: user.userId,
        role:2
      },
    );
    res.cookie("token", sessionToken, {
      httpOnly: true,
      secure: false, //change in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      isAdmin: false,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Session expired. Please sign up again." });
  }
};

export const login:RequestHandler =async (req, res) => {
  const { email, password } = req.body;

  const user=await prisma.user.findUnique({
    where:{
      email:email,
    },
    select:{
      userId:true,
      password:true,
      name:true,
      roleId:true,
    }
  })
  if (!user) {
    console.log("No user found with email:", email);
    return res.status(401).json({ message: "User Not Found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  console.log("Password match successful for user:", email);
  const encodedToken = generateEncodedToken(
    {
      userId: user.userId,
      role:user.roleId
    },
  );
  res.cookie("token", encodedToken, {
    httpOnly: true,
    secure: false, //change in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Login successful",
  });
};


export const forgotPassword:RequestHandler = async (req, res) => {
  console.log("JI")
  try {
    const { email } = req.body;
    console.log("JI")
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // generate token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // hash token for DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpiry =
      new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { userId: user.userId },

      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpiry:
          new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    const resetUrl =
      `${process.env.FRONTEND_URL}` +
      `/auth/reset-password/${resetToken}`;
    console.log("Reset URL:", resetUrl);
    await sendEmail(
      user.email,
      "Reset Your Password",
      `
    <h2>Password Reset</h2>

    <p>Click below to reset your password:</p>

    <a href="${resetUrl}">
      Reset Password
    </a>

    <p>This link expires in 10 minutes.</p>
  `
    );

    res.json({
      message: "Reset email sent",
    });

  } catch (err) {
    console.error(err);
    
    res.status(500).json({
      message: "Failed to send reset email",
    });
  }
};

export const resetPassword:RequestHandler = async (req, res) => {
  try {
    const { token } = req.params;
    
    const { password } = req.body;
    console.log(token,password,"Kk")
    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    console.log(hashedToken,"asa")
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,

        resetPasswordExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        userId: user.userId,
      },

      data: {
        password: hashedPassword,

        resetPasswordToken: null,

        resetPasswordExpiry: null,
      },
    });

    res.json({
      message: "Password reset successful",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to reset password",
    });
  }
};