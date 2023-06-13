import { AcademicFacultyModel, IAcademicFaculty } from "./academiFaculty.interface";
import { Schema, model } from "mongoose";


const academicFacultySchema = new Schema<IAcademicFaculty, AcademicFacultyModel>(
    {
        title: {
          type: String,
          required: true,
         
        }
      },
      {
        timestamps: true,
      }
);

export const AcademicFaculty= model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
