const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("css"));
// * Please includethe private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = "";

app.get("/", async (req, res) => {
  const contacts =
    "https://api.hubapi.com/crm/v3/objects/contacts?properties=email,middle_name,firstname";
  const headers = {
    Authorization: `Bearer ${process.env.secret_key}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(contacts, { headers });
    const data = resp.data.results;
    res.render("contacts", { title: "Contact Table", data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/update", (req, res) => {
  res.render("form"); // Render the form.pug template
});

app.post("/submit", (req, res) => {
  const formData = req.body; // Access form data here
  console.log("Form Data", formData);
  res.redirect("/");
});
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
