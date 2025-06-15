import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  console.log("🚀 ~ register ~ user: 25", user)
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token });
};
