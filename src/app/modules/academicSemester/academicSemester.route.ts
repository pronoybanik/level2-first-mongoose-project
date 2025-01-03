import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.vlidator';
import validateZodRequest from '../../middlewares/validateZodRequest';
import auth from '../../middlewares/auth';
const route = express.Router();

route.post(
  '/create-academic-semester',
  validateZodRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

route.get('/', auth(), AcademicSemesterControllers.getAllAcademicSemester);

// Home work , --> get , id by get, patch

export const AcademicSemesterRoutes = route;
