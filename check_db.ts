import { prisma } from "./src/lib/prisma";

async function checkCol() {
    try {
        const result = await prisma.$queryRaw`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'EventRegistration' AND column_name = 'handRaised';
        `;
        console.log("Check Result:", result);
    } catch (e) {
        console.error("Check Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

checkCol();
