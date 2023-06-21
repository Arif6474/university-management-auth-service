/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';
import { IPagination } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { studentSearchableFields } from '../student/student.constant';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const getAllFaculties = async (
    filters: IFacultyFilters,
    paginationOptions: IPagination
  ): Promise<IGenericResponse<IFaculty[]>> => {
    const { searchTerm, ...filtersData } = filters;
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        $or: studentSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
  
    if (Object.entries(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
  
    const result = await Faculty.find(whereConditions)
      .populate('academicDepartment')
      .populate('academicSemester')
      .sort()
      .skip(skip)
      .limit(limit);
    const total = await Faculty.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
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
  const isExist = await Faculty.findOne({ _id: id });
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

  const result = await Faculty.findOneAndUpdate(
    { _id: id },
    updatedFacultyData,
    {
      new: true,
    }
  )
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};
export const FacultyServices = {
  getSingleFaculty,
  updateFaculty,
  getAllFaculties
};
