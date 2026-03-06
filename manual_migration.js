const { PrismaClient } = require("./src/generated/prisma");
const prisma = new PrismaClient();

async function main() {
    console.log("Adding handRaised column manually via raw sql...");
    try {
        await prisma.$executeRawUnsafe(`
            ALTER TABLE "EventRegistration" 
            ADD COLUMN IF NOT EXISTS "handRaised" BOOLEAN NOT NULL DEFAULT false;
        `);
        console.log("Column 'handRaised' successfully ensured in 'EventRegistration'!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
