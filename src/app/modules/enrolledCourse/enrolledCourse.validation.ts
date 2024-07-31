import { z } from 'zod';

// create
const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const Validation = {
  createEnrolledCourseValidationSchema,
};
