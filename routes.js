const express = require("express");
const User = require("./userModel");
const router = express.Router();

const { signup, login } = require("./authController");

router.post("/auth/signup/v1", signup);
router.post("/auth/signin/v1", login);
router.patch("/update/:id", async function (req, res) {
    try {
        const user = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                },
            }
        );
        const updatedUser = await user.save();
        res.json({ message: "User Updated", user: updatedUser });
    } catch (err) {
        res.status(401).json({
            status: "no user found",
        });
    }
});

router.delete("/delete/:id", async function (req, res) {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (user) {
            await user.remove();
            res.status(200).json({ message: "user deleted" });
        }
    } catch (e) {
        res.status(401).json({
            status: "no user found",
        });
    }
});

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Create a new user
 *     description: Creates a user!
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's firstname.
 *                 example: Jon
 *               lastname:
 *                 type: string
 *                 description: The user's lastname.
 *                 example: Doe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: secret
 *               confirmpassword:
 *                 type: string
 *                 description: To confirm user's password have to match password.
 *                 example: secret
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: jon.doe@some.where
 *     responses:
 *       200:
 *         description: Creates a user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Jone Doe
 *                     email:
 *                       type: string
 *                       description: The user's name.
 *                       example: Jone Doe
 */

router.post("/user/register", (req, res) => {
    body = { email: "john@doe.com", password: "123qwe", id: "01" };
    res.status(200).json(body);
});
/**
 * @openapi
 * /user/allusers:
 *   get:
 *     summary: get all users
 *     description: get all user!
 *
 *     responses:
 *       200:
 *         description: Users list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Jone Doe
 *                     email:
 *                       type: string
 *                       description: The user's name.
 *                       example: Jone Doe
 */

router.get("/user/allusers", (req, res) => {
    // body = { message: "gets all users" };
    res.status(200).json();
    res.send();
});

/**
 * @openapi
 * /user/{userId}:
 *  delete:
 *      description: Delete user
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *      responses:
 *          200:
 *              description: User that was deleted
 */
router.delete("/user/{id}", (req, res) => {
    let { id } = req.params.id;
    // body = { message: "user deleted" };
    return res.status(200).json({ userID: id, body: body });
});

/**
 * @openapi
 * /user/update/{id}:
 *  put:
 *
 *    summary: Update user
 *    description: This can only be done by the logged in user.
 *    operationId: updateUser
 *    parameters:
 *      - name: username
 *        in: path
 *        description: name that need to be updated
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      default:
 *        description: successful operation
 *
 */
router.put("/user/{id}", (req, res) => {
    body = { message: "update a user" };
    res.status(200).json(body);
});

module.exports = router;
