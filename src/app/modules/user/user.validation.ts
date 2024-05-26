import { z } from 'zod';

// studentSchema validation
const UserSchemaValidation = z.object({
  password: z
    .string({
        invalid_type_error: 'Password must be a string',
    })
    .max(20, 'Password should be 20 Character')
    .min(8, 'Password should be 8 Character').optional(),
});

export default UserSchemaValidation;
