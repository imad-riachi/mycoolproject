// Drizzle configuration with multiple authentication options
module.exports = {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    // Primary option: Use connection string from environment variable
    // This will be either a direct connection with database password
    // or a connection through the Supabase connection pooler with API key
    connectionString: process.env.DATABASE_URL,
    
    // Fallback options (commented out, uncomment if needed):
    /*
    // Option 1: Direct connection with explicit password
    host: "db.yadoicocfztaojckmxfx.supabase.co",
    port: 5432,
    database: "postgres", 
    user: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    
    // Option 2: Connection pooler with project reference
    // connectionString: "postgresql://postgres.yadoicocfztaojckmxfx:postgres@aws-0-us-west-1.pooler.supabase.com:5432/postgres?options=project%3Dyadoicocfztaojckmxfx",
    */
  },
};
