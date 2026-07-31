import { Request, Response } from "express";
import { data } from "../database/data.js";
import { IArtist } from "../types/artistInterface.js";
import { prisma } from "../lib/prisma.js"; //const prisma = new PrismaClient();

export const index = async (request: Request, response: Response) => {
  const user = await prisma.user.findMany();
  console.log("user:", user);
  response.json({ message: user });
};

export const readOneArtist = (request: Request, response: Response) => {
  console.log("je suis dans readOneArtist", request.params.id);
};

export const createArtist = (request: Request, response: Response) => {
  const artistData: IArtist = {
    ...request.body,
    createdAt: new Date(),
  };
  const datalength = data.length;
  data.push(artistData);
  const dataUpated = data.length;
  if (dataUpated === datalength + 1) {
    response.json({ message: "New artist added !" });
  }
};
