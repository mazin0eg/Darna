import app from "./app";
const port: number = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
