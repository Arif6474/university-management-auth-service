import { IFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
    const result = await Faculty.findById(id)
      .populate('academicDepartment')
      .populate('academicSemester');
    return result;
  };

export const FacultyServices ={
    getSingleFaculty
}