import express, { Router, Request, Response } from 'express';
import { addResult, getResult } from '../controllers/result'

const router = Router();
//all users
router.post('', addResult);

//get a user by id
router.get('/:id', getResult);

export default router;
