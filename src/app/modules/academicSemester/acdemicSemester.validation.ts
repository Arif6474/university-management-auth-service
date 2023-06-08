import { z } from 'zod';
import {  academicSemesterCodes, academicSemesterTitles, acdemicSemesterMonths } from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string , ...string[]],{
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...acdemicSemesterMonths] as [string , ...string[]],{
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...acdemicSemesterMonths] as [string , ...string[]],{
      required_error: 'End Month is required',
    }),
  }),
});

export const UserValidation = {
  createAcademicSemesterZodSchema,
};
