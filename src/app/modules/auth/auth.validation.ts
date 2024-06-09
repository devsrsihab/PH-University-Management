import { z } from 'zod';

// login validation 
const loginValidatonSchema = z.object({
  body: z.object({
    id: z.string({required_error: 'id is required', invalid_type_error: 'id must be string'}),
    password: z.string({required_error: 'password is required', invalid_type_error: 'password must be string'}),
  }),
});


export const AuthValidation = {
  loginValidatonSchema,
};
