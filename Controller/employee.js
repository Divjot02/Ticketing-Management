const employeeModel = require("../Models/employee");

function handleEmployeeDashboard(req, res) {
  if (req.session.employeeLoggedIn) {
    res.render("employeeDashboard", { session: req.session });
    return;
  }
  return res.redirect("/employee/Login");
}

// async function handleEmployeeForm(req, res) {
function handleEmployeeForm(req, res) {
  // ----------------------DOUBT----------------------------------
  if (req.session.employeeLoggedIn) {
    res.redirect("/employee/Dashboard");
    return;
  }

  res.render("employeeLogin", { message: null });
}
async function handleEmployeeLogin(req, res) {
  if (
    req.body.email.trim() !== "" &&
    req.body.password.trim() !== "" &&
    req.body.department.trim() !== ""
  )
    try {
      const email = req.body.email.trim();
      const password = req.body.password.trim();
      const department = req.body.department.trim();
      // console.log(email + department);
      const employee = await employeeModel.findOne({
        email: email,
        password: password,
        department: department,
      });
      if (employee) {
        req.session.employeeLoggedIn = true;
        req.session.username = employee.username;
        req.session.department = employee.department;
        req.session.email = employee.email;
        //redirect to dashboard
        res.redirect("/employee/Dashboard");
        return;
      }
      //if no match found then redirect to login page with an error message
      res.render("employeelogin", {
        message: "Invalid Email/Password/Department",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
}
async function handleEmployeeLogout(req, res) {
  // if (!req.session.employeeIsLoggedIn) {
  //   return res.redirect("/employee/login");
  // }
  req.session.employeeLoggedIn = false;
  res.redirect("/");
}
module.exports = {
  handleEmployeeForm,
  handleEmployeeLogin,
  handleEmployeeDashboard,
  handleEmployeeLogout,
};
