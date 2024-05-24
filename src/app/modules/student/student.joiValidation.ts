import Joi from 'joi';
import { TUserName, TGurdian, TLocalGurdian, TStudent } from './student.interface';

// Username validation schema
const UserNameSchema = Joi.object<TUserName>({
  firstName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .required()
    .messages({
      'string.max': 'Vai First name lagbe should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .messages({
      'string.max': 'Middle name should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
    }),
  lastName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .required()
    .messages({
      'string.max': 'Last name should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
      'any.required': 'Last name is required',
    }),
});

// Guardian validation schema
const GurdianSchema = Joi.object<TGurdian>({
  fatherName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .required()
    .messages({
      'string.max': 'Father name should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
      'any.required': 'Father name is required',
    }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
    .messages({
      'string.pattern.base': '{#label} is not a valid contact number',
      'any.required': 'Father contact number is required',
    }),
  motherName: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .required()
    .messages({
      'string.max': 'Mother name should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
      'any.required': 'Mother name is required',
    }),
  motherContactNo: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
    .messages({
      'string.pattern.base': '{#label} is not a valid contact number',
      'any.required': 'Mother contact number is required',
    }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
});

// Local Guardian validation schema
const LocalGurdianSchema = Joi.object<TLocalGurdian>({
  name: Joi.string()
    .max(20)
    .trim()
    .pattern(/^[A-Za-z ]+$/, 'alphabets')
    .required()
    .messages({
      'string.max': 'Name should not exceed 20 characters',
      'string.pattern.base': '{#label} is not a valid name',
      'any.required': 'Name is required',
    }),
  occupation: Joi.string().required().messages({
    'any.required': 'Occupation is required',
  }),
  contact: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
    .messages({
      'string.pattern.base': '{#label} is not a valid contact number',
      'any.required': 'Contact number is required',
    }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required',
  }),
});

// Student validation schema
const StudentValidatorSchema = Joi.object<TStudent>({
  id: Joi.string().required().messages({
    'any.required': 'ID is required',
  }),
  name: UserNameSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "{#label} is not valid. Allowed values are 'male', 'female', or 'other'",
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(), // Consider date validation if necessary
  email: Joi.string().email().required().messages({
    'string.email': '{#label} is not a valid email',
    'any.required': 'Email is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        "{#label} is not valid. Allowed values are 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
    }),
  contactNo: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
    .messages({
      'string.pattern.base': '{#label} is not a valid contact number',
      'any.required': 'Contact number is required',
    }),
  emergencyContact: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
    .messages({
      'string.pattern.base': '{#label} is not a valid contact number',
      'any.required': 'Emergency contact number is required',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  gurdian: GurdianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGurdian: LocalGurdianSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(), // Consider URL validation if necessary
  isActive: Joi.string().valid('active', 'inactive').default('active').optional().messages({
    'any.only': '{#label} is not valid. Allowed values are "active" or "inactive"',
  }),
});

export default StudentValidatorSchema;
