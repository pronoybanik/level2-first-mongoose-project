import { StudentModel } from './student.module';
import { Student } from './student.interface';

const createStudentIntoBD = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id } }])
  return result;
};

const deletedStudentsFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, {
    isDeleted: true
  });
  return result;
};

export const StudentServices = {
  createStudentIntoBD,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deletedStudentsFromDB
};
