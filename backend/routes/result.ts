import express, { Router, Request, Response } from 'express';
import { addResult, allResults, fillResults, getResult, getResultsFromUser } from '../controllers/result'

const router = Router();
//all users
router.post('', addResult);

//get a user by id
router.get('/:id', getResult);

//fill results with :count instances of dummy data 
router.post('/fill/:count', fillResults)

//all results 
router.get('', allResults);

//results from a certain user
router.get('/from/:uid', getResultsFromUser);

export default router;
