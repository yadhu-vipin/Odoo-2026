import { RequestHandler } from "express";
export const getTest: RequestHandler = async (req, res) => {
  res.json({ message: "Hil" });
};