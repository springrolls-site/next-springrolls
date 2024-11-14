import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOption from "@/lib/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { social } = await req.body;

  const session = await getServerSession(req, res, authOption);

  if (req.method === "POST") {
    const isThere = await prisma.socialMedia.findFirst({
      where: {
        profileId: session?.user.id,
      },
    });

    if (!isThere) {
      await prisma.socialMedia.create({
        data: {
          profileId: session?.user.id,
          instagramUrl: "",
          snapchatUrl: "",
          telegramUrl: "",
          tiktokUrl: "",
          twitterUrl: "",
          youtubeUrl: "",
        },
      });
    }

    const response = await prisma.profile.update({
      where: {
        id: session?.user.id,
      },
      data: {
        socialMedia: {
          update: {
            instagramUrl: social[0].instagramUrl,
            snapchatUrl: social[0].snapchatUrl,
            telegramUrl: social[0].telegramUrl,
            tiktokUrl: social[0].tiktokUrl,
            twitterUrl: social[0].twitterUrl,
            youtubeUrl: social[0].youtubeUrl,
          },
        },
      },
    });
    return res.json({ msg: "Update successful!" });
  } else if (req.method === "GET") {
    const response = await prisma.socialMedia.findMany({
      where: {
        profileId: session?.user?.id,
      },
      select: {
        instagramUrl: true,
        snapchatUrl: true,
        telegramUrl: true,
        tiktokUrl: true,
        twitterUrl: true,
        youtubeUrl: true,
      },
      orderBy: {
        createdAt: "asc"
      }

    });
    return res.json(response);
  }
}
