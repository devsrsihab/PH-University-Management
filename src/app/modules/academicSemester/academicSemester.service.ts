import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterToDB = async (playload: TAcademicSemester) => {
  const result = await AcademicSemester.create(playload);
  return result;
};

export const AcademicSemeterServices = {
  createAcademicSemesterToDB,
};
