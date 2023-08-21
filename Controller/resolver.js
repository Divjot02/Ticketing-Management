const resolverModel = require("../Models/resolver");

function handleResolverDashboard(req, res) {
  if (req.session.resolverLoggedIn) {
    res.render("resolverDashboard", { session: req.session });
    return;
  }
  return res.redirect("/resolver/Login");
}

// async function handleResolverForm(req, res) {
function handleResolverForm(req, res) {
  // ----------------------DOUBT----------------------------------
  if (req.session.resolverLoggedIn) {
    res.redirect("/resolver/Dashboard");
    return;
  }
  res.render("resolverLogin", { message: null });
}
async function handleResolverLogin(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department;
    // console.log(email + department);
    const resolver = await resolverModel.findOne({
      email: email,
      password: password,
      department: department,
    });
    if (resolver) {
      req.session.resolverLoggedIn = true;
      req.session.username = resolver.username;
      req.session.department = resolver.department;
      //redirect to dashboard
      res.redirect("/resolver/Dashboard");
      return;
    }
    //if no match found then redirect to login page with an error message
    res.render("resolverlogin", {
      message: "Invalid Email/Password/Department",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
async function handleResolverLogout(req, res) {
  // if (!req.session.resolverIsLoggedIn) {
  //   return res.redirect("/resolver/login");
  // }
  req.session.resolverLoggedIn = false;
  res.redirect("/");
}
module.exports = {
  handleResolverForm,
  handleResolverLogin,
  handleResolverDashboard,
  handleResolverLogout,
};
