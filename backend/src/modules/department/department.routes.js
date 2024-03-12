import express from 'express';
import * as departmentController from './department.controller.js';

const router = express.Router();

router.post('/', departmentController.createDepartment);

export default router;
