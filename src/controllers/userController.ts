import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const signin = (request: Request, response: Response) => {
  const token = jsonwebtoken.sign(
    {
      data: request.body.email,
    },
    "secret",
    { expiresIn: "1h" },
  );
  if (token) {
    response
      .status(200)
      .cookie("accessToken", token)
      .json({ message: "you are connected", status: "connected" });
  }
};

export const signup = async (request: Request, response: Response) => {
  console.log(request.body);
  try {
    const user = await prisma.user.create({
      data: {
        email: request.body.email,
        password: request.body.password,
        role: "basic",
        isValidated: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    response.status(201).json({ user: user });
  } catch (error) {
    console.log("error:", error);
    response.status(500);
  }
};
