import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("O email é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type signinFormData = z.infer<typeof signinSchema>;
