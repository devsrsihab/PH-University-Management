import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create academic semester
const createAcademicFacultyToDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all all semesters
const getAllAcademicFacultysFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// get single semesters
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update semesters
const updateAcademicFacultyToDB = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyToDB,
  getAllAcademicFacultysFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyToDB,
};
