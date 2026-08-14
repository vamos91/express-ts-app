import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

export const checkToken = (request: Request, response: Response, next: any) => {
  // Récupère le cookie envoyé avec la requête.
  const cookie = request.headers.cookie;

  // Interrompt la requête si aucun cookie d'authentification n'est présent.
  if (!cookie) {
    return response.status(401).json({
      message: "Cookie manquant",
    });
  }

  // Extrait la valeur du token depuis un cookie au format « nom=valeur ».
  const tokenArray: string[] = cookie?.split("=");

  // Vérifie la signature et la validité du JWT avec la clé secrète.
  jsonwebtoken.verify(tokenArray[1], "secret", (err, decoded) => {
    // Refuse les tokens invalides, absents ou dont le contenu n'est pas un objet.
    if (err || !decoded || typeof decoded === "string") {
      console.error("Token validation failed:", err);
      return response.json({ message: "unauthorize" }).status(401);
    }

    // Rend l'identité décodée accessible aux contrôleurs suivants.
    console.log("Token is valid:", decoded);
    request.body.userInfo = decoded.data;

    // Autorise la poursuite de la requête vers le prochain middleware.
    next();
  });
};
