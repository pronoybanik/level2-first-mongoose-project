import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.vlidator';

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body.Student;

        // data validation using joi
        const { error, value } = StudentValidationSchema.validate(student);

        const result = await StudentServices.createStudentIntoBD(value);

        if (error) {
            res.status(500).json({
                success: false,
                message: 'something went wrong',
                error: error.details,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'something went wrong',
            err: error,
        });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'Student are rerived successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'something went wrong',
            err: error,
        });
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;
        const result = await StudentServices.getSingleStudentsFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong',
            err: error,
        });
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;

        const result = await StudentServices.deletedStudentsFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student is delete successfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
