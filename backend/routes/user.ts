import express, { Router, Request, Response } from 'express';
import { allUsers, addUser, getUser, updateEmail, deleteUser, deleteUsers, getUserByName} from '../controllers/user';

const router = Router();
//all users
router.get('', allUsers);

//get a user by id
router.get('/:id', getUser);

//get a user by username 
router.get('/name/:name', getUserByName)

//update information of a user
//use case: update email
router.put('/:id', updateEmail);

//add a user
router.post('', addUser);

// delete a user
// ex. user deletes his account
router.delete('/:id', deleteUser);

//delete all users 
router.delete('', deleteUsers);


export default router;
