import app from "./app";
import connectToDB from "./db/conn";
const PORT: number = parseInt(process.env.PORT as string, 10);

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Error in App file");
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is listing PORT : ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error("❌ Error during DB connection:", error);
    throw error;
  });
