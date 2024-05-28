import { academicSemesterNameCodeMapper } from './academicSemester.contants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// create academic semester
const createAcademicSemesterToDB = async (payload: TAcademicSemester) => {
  // check valid code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all all semesters
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// get single semesters
const getSingleAcademicSemesterFromDB = async(id:string)=> {
    const result = await AcademicSemester.findById(id);
    return result 
}

// update semesters
const updateAcademicSemesterToDB = async(id: string, payload:TAcademicSemester) => {
  // check valid code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload, { new: true });
  return result 
}



export const AcademicSemeterServices = {
  createAcademicSemesterToDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterToDB,
};
