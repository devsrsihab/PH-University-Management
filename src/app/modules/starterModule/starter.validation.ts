import { z } from 'zod';

// studentSchema validation
const CreateSchemaValidation = z.object({
  body: z.object({}),
});

// update validation
const UpdateSchemaValidation = z.object({
  body: z.object({}),
});

export const Validation = {
  CreateSchemaValidation,
  UpdateSchemaValidation,
};
