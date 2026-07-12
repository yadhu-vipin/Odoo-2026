-- AlterTable
ALTER TABLE "user" ADD COLUMN     "resetPasswordExpiry" TIMESTAMP(3),
ADD COLUMN     "resetPasswordToken" TEXT,
ALTER COLUMN "roleId" SET DEFAULT 0;
