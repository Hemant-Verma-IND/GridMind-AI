export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initializePostgresSchema } = await import("./app/lib/pg");
    try {
      await initializePostgresSchema();
    } catch (error) {
      console.error("PostgreSQL initialization failed:", error);
    }
  }
}