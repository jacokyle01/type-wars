import express, { Router, Request, Response } from 'express';
import { allUsers, addUser } from '../controllers/user';

const router = Router();
//all users
router.get('/', allUsers);

//add a user
router.post('', addUser);

export default router;
