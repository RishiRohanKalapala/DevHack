const { Client } = require('pg');

async function fixDB() {
    const connectionString = "postgresql://postgres.ppagieuhkepiofewifzm:devhacknewredlix@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
    const client = new Client({
        connectionString: connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log("Connected to database successfully!");

        console.log("Adding 'handRaised' column to 'EventRegistration'...");
        await client.query(`
            ALTER TABLE "EventRegistration" 
            ADD COLUMN IF NOT EXISTS "handRaised" BOOLEAN NOT NULL DEFAULT false;
        `);
        console.log("Column 'handRaised' ensured!");

        console.log("Verifying table schema...");
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'EventRegistration' AND column_name = 'handRaised';
        `);
        console.log("Verification result:", res.rows);

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

fixDB();
