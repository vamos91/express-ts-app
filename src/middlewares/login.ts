import { Request, Response } from "express";

export const checkCredentialsExist = (
  request: Request,
  response: Response,
  next: any,
) => {
  console.log(request.body.email === undefined);
  if (request.body.email === undefined || request.body.password === undefined) {
    response.status(401).json({ message: "Credentials missing" });
  } else {
    next();
  }
};

export const checkUserNotExist = (
  request: Request,
  response: Response,
  next: any,
) => {};
