const userModel = require("../Models/users");

function handleUserDashboard(req, res) {
  if (req.session.isLoggedIn) {
    // const { username } = req.session;
    // res.render("userDashboard", { username });
    res.render("userDashboard.ejs", { username: req.session.username });
  } else {
    res.redirect("/user/Login"); // Redirect to the login page if not logged in
  }
}

function handleLoginForm(req, res) {
  if (req.session.isLoggedIn) {
    res.redirect("user/userDashboard.ejs");
    return;
  }
  res.render("login", { message: null });
}

async function handleUserLogin(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({ email: email, password: password });
    if (user) {
      req.session.isLoggedIn = true;
      req.session.username = user.username;
      req.session.email = user.email;
      //redirect to dashboard
      res.redirect("/user/Dashboard");
      return;
    }
    //   res.redirect("/invalid");
    res.render("login", { message: "Invalid Email/Password" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
////////////////////////------------Need to think bout this'
function handleRegisterForm(req, res) {
  res.render("register", { message: null });
}

async function handleUserRegister(req, res) {
  if (
    req.body.username.trim() !== "" &&
    req.body.email.trim() !== "" &&
    req.body.password.trim() !== ""
  ) {
    try {
      const email = req.body.email.trim();
      const user = await userModel.findOne({ email: email });
      if (user) {
        res.render("register", {
          message: "Email Already exists!! TRY using another OR LOGIN",
        });
        return;
      }
      //get all the form data to save in db
      // const userObj = new userModel({
      //   username: req.body.username.trim(),
      //   email: req.body.email.trim(),
      //   password: req.body.password.trim(),
      // });
      const userObj = new userModel(req.body);
      await userObj.save();
      //redirect to login
      //   res.redirect("/user/Login");
      res.render("login.ejs", {
        message: "Registered Successfully! Login to proceed to dashboard",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    //("All fields are required");
    res.render("register.ejs", { message: "All fields are required" });
  }
}

function handleUserLogout(req, res) {
  req.session.isLoggedIn = false;
  // req.session.username = null;

  // Redirect to the home page
  res.redirect("/");
}

module.exports = {
  handleLoginForm,
  handleUserLogin,
  handleRegisterForm,
  handleUserRegister,
  handleUserLogout,
  handleUserDashboard,
};
