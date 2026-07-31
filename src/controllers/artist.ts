import { Request, Response } from "express";
import { data } from "../database/data.js";
import { IArtist } from "../types/artistInterface.js";

export const index = (request: Request, response: Response) => {
  response.json({ message: data });
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
