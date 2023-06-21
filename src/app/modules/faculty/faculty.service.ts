/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};
const updateFaculty = async (
    id: string,
    payload: Partial<IFaculty>
  ): Promise<IFaculty | null> => {
    const isExist = await Faculty.findOne({_id: id });
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faculty is not found');
    }
    const { name, ...facultyData } = payload;
  
    const updatedFacultyData: Partial<IFaculty> = { ...facultyData };
  
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IFaculty>; // `name.firstName`
        (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
      });
    }
 
    const result = await Faculty.findOneAndUpdate({_id: id }, updatedFacultyData, {
      new: true,
    })
      .populate('academicDepartment')
      .populate('academicSemester');
    return result;
  };
export const FacultyServices = {
  getSingleFaculty,
  updateFaculty
};
