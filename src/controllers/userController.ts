import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { user } from "../database/user.js";

export const signin = (request: Request, response: Response) => {
  console.log("user infos", request.body);
  const token = jsonwebtoken.sign(
    {
      data: request.body.email + "-" + request.body.role,
    },
    "secret",
    { expiresIn: "1h" },
  );
  console.log("token:", token);
  if (token) {
    //response.json({ message: token });
    response
      .status(200)
      .cookie("accessToken", token)
      .json({ message: "you are connected" });
  }
};

export const signup = (request: Request, response: Response) => {
  console.log(request.body);
  user.push(request.body);
  response.json({ message: user });
};
