const users = {};

exports.signup = async (req, res, next) => {
  const newUser = await users.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  users.push(newUser);

  res.send(users);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({
      status: "failed",
      message: "Please enter your email and password!",
    });
    return;
  }
};
