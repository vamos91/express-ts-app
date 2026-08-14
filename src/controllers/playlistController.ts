import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const index = async (request: Request, response: Response) => {
  console.log(request);
  const playlists = await prisma.playlist.findMany();
  if (playlists && playlists.length > 0) {
    response.status(200).json({ playlists });
  } else {
    response.json({ message: "Aucune playlist !" });
  }
};

export const read = async (request: Request, response: Response) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: Number(request.params.id),
    },
  });
  const tracks = await prisma.playlist_has_track.findMany({
    where: {
      playlist_id: playlist?.id,
    },
    include: {
      track: true,
    },
  });
  console.log("tracks_id", tracks);
  if (tracks) {
    response.status(200).json({ tracks });
  }
};

export const create = async (request: Request, response: Response) => {
  console.log(request.body);
  const user = await prisma.user.findFirst({
    where: {
      email: request.body.userInfo,
    },
  });

  if (!user) {
    return response.status(404).json({ message: "Utilisateur introuvable" });
  }

  const playlistData = {
    title: request.body.title,
    description: request.body.description,
    is_public: request.body.is_public,
    user_id: user.id,
  };

  const playlist_new = await prisma.playlist.create({
    data: {
      ...playlistData,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
  if (playlist_new) {
    response.status(201).json({ message: playlist_new });
  }
};

export const addTrack = async (request: Request, response: Response) => {
  console.log(request.params.id_playlist);
  console.log(request.params.id_track);
  const playlist = await prisma.playlist_has_track.create({
    data: {
      playlist_id: Number(request.params.id_playlist),
      track_id: Number(request.params.id_track),
    },
  });
  if (playlist) {
    response.status(201).json({ "New song added": playlist });
  }
};
