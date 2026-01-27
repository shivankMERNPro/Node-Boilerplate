import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password is required'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z
      .string()
      .regex(/^\d{10}$/, 'Phone must be 10 digits')
      .optional(),
    
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });