import { Router } from 'express';
const router = Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

// /api/Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:ThoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/:thoughtId/reactions
router.route('/:userId/friends').post(addReaction);

// /api/thoughts/:thoughtId/reactions
router.route('/:userId/friends/:friendId').delete(removeReaction);

export { router as thoughtRouter };
