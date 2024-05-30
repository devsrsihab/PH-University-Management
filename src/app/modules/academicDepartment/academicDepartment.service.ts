import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create academic semester
const createAcademicDepartmentToDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// get all all semesters
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

// get single semesters
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

// update semesters
const updateAcademicDepartmentToDB = async (id: string, payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentToDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentToDB,
};
