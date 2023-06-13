import { IAcademicFaculty } from "./academiFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  
  const result = await AcademicFaculty.create(payload);
  return result;
};

export const AcademicFacultyServices = {
    createFaculty,
 
};
