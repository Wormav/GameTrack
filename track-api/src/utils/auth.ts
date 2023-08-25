import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const createJwtToken = (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
    expires: Date.now() + parseInt("86400000", 10),
  };
  const JWT_SECRET = process.env.JWT_SECRET ?? "";
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  return token;
}
