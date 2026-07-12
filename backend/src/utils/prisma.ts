import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;
console.log(process.env.DATABASE_URL,"Tets")
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({adapter});
