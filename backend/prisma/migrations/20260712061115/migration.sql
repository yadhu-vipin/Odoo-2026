-- CreateTable
CREATE TABLE "roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
