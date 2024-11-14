import { z } from "zod";

export const socialSchemas = z.object({
  instagram: z
    .string()
    .regex(/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/, {
      message: "Please enter instagram url",
    })
    .optional(),
  twitter: z
    .string()
    .regex(/^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/, {
      message: "Please enter twitter url",
    })
    .optional(),

  tiktok: z
    .string()
    .regex(/^https?:\/\/(www\.)?tiktok\.com\/[a-zA-Z0-9_]+\/?$/, {
      message: "Please enter tiktok url",
    })
    .optional(),

  telegram: z
    .string()
    .regex(/^https?:\/\/(www\.)?t\.me\/[a-zA-Z0-9_]+\/?$/, {
      message: "Please enter telegram url",
    })
    .optional(),

  snapchat: z
    .string()
    .regex(/^https?:\/\/(www\.)?snapchat\.com\/add\/[a-zA-Z0-9_]+\/?$/, {
      message: "Please enter snapchat url",
    })
    .optional(),

  youtube: z
    .string()
    .regex(
      /^https?:\/\/(www\.)?youtube\.com\/(user|c|channel)\/[a-zA-Z0-9_-]+\/?$/,
      { message: "Please enter youtube url" }
    )
    .optional(),
});

export type SocialSchemas = z.infer<
  typeof socialSchemas
>;