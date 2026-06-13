import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import { neon } from '@neondatabase/serverless';
async function run() {
  const sql = neon('postgresql://neondb_owner:npg_UAb9WFMLn3kf@ep-proud-hall-aip3r4nk-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');
  const sql2 = neon('postgresql://neondb_owner:npg_UAb9WFMLn3kf@ep-proud-hall-aip3r4nk.us-east-1.aws.neon.tech/neondb?sslmode=require');
  
  try {
    console.log("Testing pooler:");
    await sql`SELECT 1`;
    console.log("Pooler worked");
  } catch(e: any) {
    console.log("Pooler failed:", e.message);
  }

  try {
    console.log("Testing direct:");
    await sql2`SELECT 1`;
    console.log("Direct worked");
  } catch(e: any) {
    console.log("Direct failed:", e.message);
  }
}
run();
