import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

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

export const checkUserNotExist = async (
  request: Request,
  response: Response,
  next: any,
) => {
  const user = await prisma.user.findFirst({
    where: {
      email: request.body.email,
    },
  });
  if (user) {
    next();
  } else {
    response.status(400).json({ message: "User not exist" });
  }
};
