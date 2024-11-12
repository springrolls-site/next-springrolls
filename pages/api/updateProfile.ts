import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multiparty from "multiparty";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Disable Next.js' built-in bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "/public/uploads");

// Ensure the upload directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Use multiparty to handle the form data and file uploads
  const form = new multiparty.Form({ uploadDir });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    // Extract text fields
    const name = fields.name ? fields.name[0] : "";
    const bio = fields.bio ? fields.bio[0] : "";

    // Process uploaded files
    const profileImageFile = files.profileImage ? files.profileImage[0] : null;
    const backgroundImageFile = files.backgroundImage ? files.backgroundImage[0] : null;

    const profileImageUrl = profileImageFile ? `/uploads/${path.basename(profileImageFile.path)}` : null;
    const backgroundImageUrl = backgroundImageFile ? `/uploads/${path.basename(backgroundImageFile.path)}` : null;

    console.log("Profile Image URL:", profileImageUrl);
    console.log("Background Image URL:", backgroundImageUrl);

    try {
      const updatedProfile = await prisma.profile.upsert({
        where: { userId: session.user.id },
        update: {
          name,
          bio,
          profileImageUrl,
          backgroundImageUrl,
        },
        create: {
          userId: session.user.id,
          name,
          bio,
          profileImageUrl,
          backgroundImageUrl,
        },
      });

      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
}
