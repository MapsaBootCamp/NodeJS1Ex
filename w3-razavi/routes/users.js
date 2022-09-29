import { Router } from "express";
import { getUser } from "../utils.js";
import { asyncRun, asyncAll }  from "../config/async-sqlite-methods.js";

const router = Router();

// get users information
router
  .route("/")
  .get(async (req, res) => {
    const [usersErr, users] = await asyncAll(
      `SELECT userID, userName FROM users;`
    );
    if (usersErr) {
      throw usersErr;
    }
    res.json({
      Users: users,
    });
  })

  // create new user
  .post(async (req, res) => {
    // checking that username was sended
    if (!req.body.userName) {
      return res.status(400).json({
        err: "username is required!",
      });
    } else {
      // create new user
      await asyncRun(`INSERT INTO users(userName, password) VALUES(?, ?)`, [
        req.body.userName,
        req.body.password,
      ]);
      res.status(201).send({
        messgae: "user created",
        data: req.body.userName,
      });
    }
  });

// get user information
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

//change password
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  const oldPassword = user.password;
  const newPassword = req.body.password ? req.body.password : oldPassword;
  asyncRun(`UPDATE users SET password=? WHERE userID=?`, [newPassword, id]);
  res.send(`password of ${user.userName} succesfully updatede`);
});

// delete user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  //checking that user was existed
  let user = await getUser(id);
  if (!user) {
    return res.status(400).json({
      err: "this user not exist",
    });
  }

  // delete user
  await asyncRun(`DELETE FROM users WHERE userID=?`, id);
  res.send(`succesfully deleted`);
});

export default router;
