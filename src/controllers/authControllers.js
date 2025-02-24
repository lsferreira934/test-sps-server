import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByEmailService,
} from "../service/userService.js";
import { insertTokenBlacklist } from "../service/tokenService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body.values;

  if (!name && !email && !password)
    return res.status(404).json({ error: "Data not found" });

  try {
    const hasUser = await getUserByEmailService(email);
    if (hasUser) res.status(404).json({ error: "Registered user" });

    await createUserService({ name, email, type: "default", password });

    return res
      .status(200)
      .json({ message: "User was registered successfully." });
  } catch (error) {
    console.log({ error: error.message });
    return res.status(400).json({ error: "User cannot be registered" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body.values;

  if (!email && !password)
    return res.status(400).json({ error: "Email or password is required" });

  try {
    const findUser = await getUserByEmailService(email);

    if (!findUser && findUser.password === password)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: findUser.id }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    });

    res
      .status(200)
      .json({ message: "Login successful", user: { ...findUser }, token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    if(!req.headers["authorization"] || !req.headers["authorization"].includes("Bearer ")) return res.status(500).end();
    const token = req.headers["authorization"].replace("Bearer ", "");

    await insertTokenBlacklist(token);

    res.status(200).end();
  } catch (error) {
    console.log({ error: error.message });
    return res.status(400).json({ error: "User cannot be logoff" });
  }
};
