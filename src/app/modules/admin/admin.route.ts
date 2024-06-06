import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:adminId', AdminController.getSingleFacultie);
router.patch('/:adminId', AdminController.updateAdmin);
router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoute = router;
