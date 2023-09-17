const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("css"));
app.use(bodyParser.urlencoded({ extended: false }));
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
    res.render("homepage", { title: "Contact Table", data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/update-cobj", (req, res) => {
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  }); // Render the form.pug template
});

app.post("/update-cobj", async (req, res) => {
  const formData = req.body; // Access form data here
  console.log("Form Data", formData);
  // res.redirect("/");
  const update = {
    properties: {
      firstname: formData.firstName,
      lastname: formData.lastName,
      middle_name: formData.book,
      email: formData.email,
    },
  };
  console.log("PROPERTIRS", update);
  const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts`;
  const headers = {
    Authorization: `Bearer ${process.env.secret_key}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.post(updateContact, JSON.stringify(update), { headers });
    res.redirect("/");
  } catch (err) {
    console.error(err.response.data);
  }
});
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
