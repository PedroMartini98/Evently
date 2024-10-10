import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(2, "TiTLE must be at least 2 characters."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
