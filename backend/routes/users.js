import express from 'express';


import { deleteUser, getUser, getUsers, updateUser, createUser } from '../controllers/user.js';


const router = express.Router();

router.put('/:id', updateUser)

router.delete('/:id',deleteUser)

router.get('/',  getUsers)

router.post('/', createUser)

router.get('/:id', getUser)

export default router