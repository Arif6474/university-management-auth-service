import { IAcademicFaculty } from './academiFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllFaculties = async (
    // filters: IAcademicSemesterFilter,
    // paginationOptions: IPagination
  ): Promise<IAcademicFaculty[]> => {
    // const { searchTerm, ...filtersData } = filters;
  
    // const andConditions = [];
    // if (searchTerm) {
    //   andConditions.push({
    //     $or: academicSemesterSearchableFields.map(field => ({
    //       [field]: {
    //         $regex: searchTerm,
    //         $options: 'i',
    //       },
    //     })),
    //   });
    // }
  
    // if (Object.entries(filtersData).length) {
    //   andConditions.push({
    //     $and: Object.entries(filtersData).map(([field, value]) => ({
    //       [field]: value,
    //     })),
    //   });
    // }
   
    // const whereConditions =
    //   andConditions.length > 0 ? { $and: andConditions } : {};
    // const { page, limit, skip, sortBy, sortOrder } =
    //   paginationHelpers.calculatePagination(paginationOptions);
    // const sortCondition: { [key: string]: SortOrder } = {};
    // if (sortBy && sortOrder) {
    //   sortCondition[sortBy] = sortOrder;
    // }
  
    const result = await AcademicFaculty.find({})
    //   .sort()
    //   .skip(skip)
    //   .limit(limit);
    // const total = await AcademicFaculty.countDocuments();
    return result
    // {
    //   meta: {
    //     page,
    //     limit,
    //     total,
    //   },
    //   data: result,
    // };
  };
export const AcademicFacultyServices = {
  createFaculty,
  getAllFaculties
};
