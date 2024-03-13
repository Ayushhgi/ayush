require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./auth-router");
const connectDb = require("./utils/db");
const PORT = 4000;
const User = require("./models/user-model");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const bodyParser = require("body-parser");
const Listing = require("./models/listing");
const path = require("path");
// const flash = require("connect-flash");
// Mount the router
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    },
  })
);
app.use(session());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
// app.use("/api", router);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// passport js

passport.use(new LocalStrategy(User.authenticate()));

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/healthCare", (req, res) => {
  res.render("heathCare.ejs");
});

app.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    res.redirect("/HeathCare");
  } catch (error) {
    console.log(error);
    res.redirect("/signup");
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    res.redirect("/healthCare");
  }
);

app.get("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/HealthCare");
  });
});

app.get("/healthCare", async (req, res) => {
  const allListings = await Listing.find({});
  Listing.find({}).then((res) => {
    console.log(res);
  });
  res.render("healthCare.ejs", { allListings });
});

app.get("/healthCare/new", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("new.ejs");
});

app.get("/healthCare/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("info.ejs", { listing });
});

app.get("/yoga", (req, res) => {
  res.render("heathCare.ejs");
});

app.get("/services", (req, res) => {
  res.render("services.ejs");
});

// create route
