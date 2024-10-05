import { Router } from 'express';
const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
  updateUser,
} from '../../controllers/userController.js';

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

export { router as userRouter} ;
