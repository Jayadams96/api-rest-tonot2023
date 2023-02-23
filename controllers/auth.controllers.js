//import { User } from "../models/user.js";

export const register = (req, res) => {
  /*
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
*/
  res.json({ ok: true });
};

export const login = (req, res) => {
  /*
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
*/
  res.json({ ok: "login" });
};
