const User = require("./userModel");

exports.signup = async (req, res, next) => {
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });

    try {
        if (!newUser) {
            res.status(401).json({
                status: "Please enter your email and password!",
            });
        }
    } catch (err) {
        console.log(err);
    }
    res.status(201).json({
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

// exports.update = async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     // const user = await User.findOne({ id }).select("+password");
//     // if (user) {
//     //     user.name = req.body.name || user.name;
//     // user.email = req.body.email || user.email;
//     const updatedUser = await user.save();
//     res.send({ message: "User Updated", user: updatedUser });
//     // } else if (!user) {
//     res.status(401).json({
//         status: "no user found",
//     });
//     // }
// };
// exports.remove = async (req, res, next) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await user.remove();
//         res.status(200).json({ message: "user deleted" });
//     }
//     if (!user) {
//         res.status(401).json({
//             status: "no user found",
//         });
//     }
// };
