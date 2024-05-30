import { z } from 'zod';

// Define Zod schemas for subobjects
const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20), // Ensure minimum 1 character and maximum 20 characters
  middleName: z.string().max(20), // Allow middleName to be optional and max 20 characters
  lastName: z.string().min(1).max(20), // Ensure minimum 1 character and maximum 20 characters
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(20), // Ensure minimum 1 character and maximum 20 characters
  fatherOccupation: z.string().min(1), // Ensure minimum 1 character
  fatherContactNo: z.string().min(1), // Ensure minimum 1 character
  motherName: z.string().min(1).max(20), // Ensure minimum 1 character and maximum 20 characters
  motherOccupation: z.string().min(1), // Ensure minimum 1 character
  motherContactNo: z.string().min(1), // Ensure minimum 1 character
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(20), // Ensure minimum 1 character and maximum 20 characters
  occupation: z.string().min(1), // Ensure minimum 1 character
  contact: z.string().min(1), // Ensure minimum 1 character
  address: z.string().min(1), // Ensure minimum 1 character
});

// Define Zod schema for the main object
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(30),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(), // Consider adding validation for date format if needed
      admissionSemester: z.string(),
      email: z.string().email(),
      contactNo: z.string().min(1),
      emergencyContact: z.string().min(1),
      bloodGroup: z.optional(z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: GuardianValidationSchema,
      localGurdian: z.optional(LocalGuardianValidationSchema),
      profileImg: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  createStudentValidationSchema,
};
