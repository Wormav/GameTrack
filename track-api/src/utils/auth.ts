import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const createJwtToken = (user: User) => {
  const payload = {
    id: user.id,
    username: user.username,
    expires: Date.now() + parseInt(process.env.JWT_EXPIRATION as string, 10),
  };
  const JWT_SECRET = process.env.JWT_SECRET ?? "";
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}
