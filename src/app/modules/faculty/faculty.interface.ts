import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
export type UserName = {
    firstName: string;
    lastName: string;
    middleName: string;
  };
  

  
  export type IFaculty = {
    id: string;
    name: UserName; //embedded object
    gender: 'male' | 'female';
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    designation: 'Professor' | 'Lecturer';
    academicDepartment: Types.ObjectId | IAcademicDepartment; // // reference _id
    academicSemester: Types.ObjectId | IAcademicSemester; // reference _id
    profileImage?: string;
  };
  
  export type FacultyModel = Model<IFaculty, Record<string, unknown>>;