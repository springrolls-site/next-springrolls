import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, url, temp } = await req.body;

  console.log("METHOD: ", req.method);
  console.log("TEMP: ", temp);

  if (req.method === "POST") {
    console.log("inside");
    temp.map(async (value: any, index: any) => {
      const response = await prisma.link.updateMany({
        where: {
          // @ts-ignore
          // profileId: session.user.id,
          id: value.id,
        },
        data: {
          name: value.name,
          url: value.url,
        },
      });
      console.log("RESPONSEFORPUT: ", response);
    });
  } else if (req.method === "GET") {
    const response = await prisma.link.findMany({
      where: {
        // @ts-ignore
        profileId: 1,
      },
    });
    console.log("BACKENDRESPONSE: ", response);
    return res.json(response);
  } else if (req.method === "DELETE") {
    const response = await prisma.profile.update({
      where: {
        id: 1,
      },
      data: {
        links: {
          delete: {
            id: id,
          },
        },
      },
    });
  }
}
