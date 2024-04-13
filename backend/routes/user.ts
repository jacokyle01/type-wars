import express, { Router, Request, Response } from 'express';
import { allUsers } from '../controllers/user';

const router = Router();
router.get('/all', allUsers);

export default router;

