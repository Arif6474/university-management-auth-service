/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';

import { IStudent, IStudentFilters,  } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';


const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPagination
): Promise<IGenericResponse<IStudent[]>> => {
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

  const result = await Student.find(whereConditions)
  .populate('academicFaculty')
  .populate('academicDepartment')
  .populate('academicSemester')
    .sort()
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleStudent = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id)
  .populate('academicFaculty')
  .populate('academicDepartment')
  .populate('academicSemester')
  return result;
};
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({id})
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student is not found')

  }
  const { name , guardian , localGuardian , ...studentData} =payload
  
  const updatedStudentData: Partial<IStudent> = { ...studentData }; 

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key =>{
      const nameKey =`name.${key}` as keyof Partial<IStudent>; // `name.firstName`
     ( updatedStudentData as any)[nameKey] = name[key as keyof typeof name]

    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key =>{
      const guardianKey =`guardian.${key}` as keyof Partial<IStudent>; // `guardian.contactNo`
     ( updatedStudentData as any)[guardianKey] = guardian[key as keyof typeof guardian]

    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key =>{
      const localGuardianKey =`localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.contactNo`
     ( updatedStudentData as any)[localGuardianKey] = localGuardian[key as keyof typeof localGuardian]

    })
  }
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
  .populate('academicFaculty')
  .populate('academicDepartment')
  .populate('academicSemester')
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
  .populate('academicFaculty')
  .populate('academicDepartment')
  .populate('academicSemester')
  return result;
};
export const StudentServices = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
