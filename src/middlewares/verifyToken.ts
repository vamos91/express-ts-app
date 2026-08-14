import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const checkToken = (request: Request, response: Response, next: any) => {
  const token: string | undefined = request.headers.cookie;
  const tokenArray: string[] | undefined = token?.split("=");
  jsonwebtoken.verify(tokenArray[1], "secret", (err, decoded) => {
    if (err) {
      console.error("Token validation failed:", err);
      response.json({ message: "unauthorize" }).status(401);
    }
    console.log("Token is valid:", decoded);
    request.body.userInfo = decoded?.data;
    next();
  });
};
