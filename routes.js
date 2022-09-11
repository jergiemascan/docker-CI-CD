const express = require("express");
const router = express.Router();
const { signup, login } = require("./authController");

router.post("/signup/v1", signup);
router.post("/signin/v1", login);

/**
 * @openapi
 * /user:
 *    post:
 *     description: Creates a user!
 *     responses:
 *       '200':
 *         description: Creates a user.
 */

router.post("/user", (req, res) => {
    body = { email: "john@doe.com", password: "123qwe", id: "01" };
    res.status(200).json(body);
});
/**
 * @openapi
 * /user/allusers:
 *    get:
 *     description: gets all users!
 *     responses:
 *       '200':
 *         description: gets all users.
 */

router.get("/user/allusers", (req, res) => {
    body = { message: "gets all users" };
    res.status(200).json(body);
});

/**
 * @openapi
 * /user/id:
 *    delete:
 *     description: delete all a user!
 *     responses:
 *       '200':
 *         description: delete all a user.
 */
router.delete("/user/id", (req, res) => {
    body = { message: "deletes a user" };
});

/**
 * @openapi
 * /user/id:
 *    put:
 *     description: edit all user!
 *     responses:
 *       '200':
 *         description: edit all user.
 */
router.put("/user/id", (req, res) => {
    body = { message: "update a user" };
});

module.exports = router;
