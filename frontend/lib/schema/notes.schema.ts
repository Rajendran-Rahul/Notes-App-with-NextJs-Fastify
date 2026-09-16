import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  tags: z
    .array(z.string().trim().min(1, "Tag cannot be empty").max(30))
    .max(10, "You can add up to 10 tags")
    .optional()
})

export type CreateNoteFormValues = z.infer<typeof createNoteSchema>;
