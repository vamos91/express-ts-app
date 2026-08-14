import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const checkToken = (request: Request, response: Response, next: any) => {
  const cookie = request.headers.cookie;
  if (!cookie) {
    return response.status(401).json({
      message: "Cookie manquant",
    });
  }
  const tokenArray: string[] = cookie?.split("=");
  jsonwebtoken.verify(tokenArray[1], "secret", (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      console.error("Token validation failed:", err);
      return response.json({ message: "unauthorize" }).status(401);
    }
    console.log("Token is valid:", decoded);
    request.body.userInfo = decoded.data;
    next();
  });
};
