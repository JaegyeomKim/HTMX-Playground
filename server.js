import express from "express";

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse Json bodies (as sent by API clients)
app.use(express.json());

// Handle Get request to fetch users
app.get("/users", async (req, res) => {
  setTimeout(async () => {
    const limit = +req.query.limit || 10;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
    );
    const users = await response.json();

    res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
        ${users.map((user) => `<li>${user.username}</li>`).join("")}
    </ul>
  `);
  }, 2000);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
