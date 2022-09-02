const User = require("./userModel");

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    });

    res.sendStatus(201).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!email || !password) {
        res.status(401).json({
            status: "failed",
            message: "Please enter your email and password!",
        });
    } else if (
        !user ||
        !(await user.correctPassword(password, user.password))
    ) {
        res.status(401).json({
            status: "failed",
            message: "Incorrect email or password",
        });
    } else {
        res.status(201).json({
            status: "success",
            message: "welcome",
        });
    }
};
