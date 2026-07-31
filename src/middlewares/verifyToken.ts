import { Request, Response } from "express";

export const checkToken = (request: Request, response: Response, next: any) => {
  const user = { token: true };
  if (user.token) {
    next();
  } else {
    response.json({ message: "unauthorize" }).status(401);
  }
};
