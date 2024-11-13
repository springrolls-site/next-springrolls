import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { LinkStateType } from "../manage-links";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import authOption from "@/lib/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, links } = await req.body;

  const session = await getServerSession(req, res, authOption);

  if (req.method === "POST") {
    await prisma.link.create({
      data: {
        name: "",
        url: "",
        profileId: session.user.id,
      },
    });
    return res.json({ msg: "Field Create successful!" });
  } else if (req.method === "PUT") {
    links.map(async (value: LinkStateType, index: Number) => {
      const response = await prisma.link.updateMany({
        where: {
          id: value.id,
        },
        data: {
          name: value.name,
          url: value.url,
        },
      });
      return res.json({ msg: "Update successful!" });
    });
  } else if (req.method === "GET") {
    const response = await prisma.link.findMany({
      where: {
        profileId: session?.user?.id,
      },
      select: {
        id: true,
        name: true,
        url: true,
      },
    });
    return res.json(response);
  } else if (req.method === "DELETE") {
    const response = await prisma.profile.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        links: {
          delete: {
            id: id,
          },
        },
      },
    });
    return res.json({ msg: "Delete successful!" });
  }
}
