import { prisma } from "../src/lib/prisma.js";

const tracks = [
  { title: "Blinding Lights", duration: 200 },
  { title: "Get Lucky", duration: 369 },
  { title: "Midnight City", duration: 244 },
  { title: "Lose Yourself", duration: 326 },
  { title: "Instant Crush", duration: 337 },
  { title: "Billie Jean", duration: 294 },
  { title: "Take On Me", duration: 225 },
  { title: "Dreams", duration: 257 },
];

async function main() {
  const now = new Date();

  for (const track of tracks) {
    const existingTrack = await prisma.track.findFirst({
      where: {
        title: track.title,
      },
    });

    if (existingTrack) {
      await prisma.track.update({
        where: {
          id: existingTrack.id,
        },
        data: {
          duration: track.duration,
          updated_at: now,
        },
      });
    } else {
      await prisma.track.create({
        data: {
          ...track,
          created_at: now,
          updated_at: now,
        },
      });
    }
  }

  console.log(`${tracks.length} tracks ont été ajoutées ou mises à jour.`);
}

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
