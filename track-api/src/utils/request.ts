import { Request } from "express";
import { JwtFromRequestFunction } from "passport-jwt";

const cookieExtractor: JwtFromRequestFunction = function (req: Request): string | null {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { cookies }: { cookies: { jwt?: string } } = req;
  return cookies.jwt || null;
};


export default cookieExtractor