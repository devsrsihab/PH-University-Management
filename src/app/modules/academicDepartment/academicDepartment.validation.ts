import { z } from 'zod';

// studentSchema validation
const CreateAcademicDepertmentSchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Depertment must be string',
    }),
    academicDepertment: z.string({
      invalid_type_error: 'Academic Depertment must be string',
    }),
  }),
});

// update validation
const UpdateAcademicDepertmentSchemaValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Depertment must be string',
      })
      .optional(),
    academicDepertment: z
      .string({
        invalid_type_error: 'Academic Depertment must be string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  CreateAcademicDepertmentSchemaValidation,
  UpdateAcademicDepertmentSchemaValidation,
};
