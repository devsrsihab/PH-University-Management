import { academicSemesterNameCodeMapper } from './academicSemester.contants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterToDB = async (playload: TAcademicSemester) => {
    
  // check valid code
  if (academicSemesterNameCodeMapper[playload.name] !== playload.code) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.create(playload);
  return result;
};

export const AcademicSemeterServices = {
  createAcademicSemesterToDB,
};
