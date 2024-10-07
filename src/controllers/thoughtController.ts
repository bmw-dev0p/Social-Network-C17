import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { Thought } from '../models/index.js';

// function for # of thoughts
export const thoughtCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('thoughtCount');
    return numberOfThoughts;
}

// function for # of reactions
// first tried to use "unwind" but it returned total number of reactions for entire doc.
export const reactionCount = async (thoughtId: string) => {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
        const reactionCount = thought.reactions.length;
        return reactionCount;
    } else {
        throw new Error('Thought not found');
    }
}

export const reactionCountTotal = async () => {
    const numberOfReactions = await Thought.aggregate([
        { $unwind: "$reactions" },
        { $count: "reactionCount" }
    ]);
    return numberOfReactions;
}

/**
 * GET All Thoughts /thoughts
 * @returns an array of thoughts
*/
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();

        const thoughtObj = {
            thoughts,
            thoughtCount: await thoughtCount(),
            reactionTotal: await reactionCountTotal(),
        }

        res.json(thoughtObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET Thought based on id /Thoughts/:id
 * @param string id
 * @returns a single Thought object
*/
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json({
                thought,
                reactionCount: await reactionCount(thoughtId),
            });
        } else {
            res.status(404).json({
                message: 'thought not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST Thought /thoughts
 * @param object thought
 * @returns a single thought object
*/

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * PUT Thought based on id /thoughts/:id
 * @param object id, username
 * @returns a single Thought object
*/
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

/**
 * DELETE thought based on id /Thoughts/:id
 * @param string id
 * @returns string 
*/

export const deleteThought = async (req: Request, res: Response) => {
    try {
        // delete thought
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }


        return res.json({ message: 'thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST Reaction based on thoughts/:thoughtId/reactions
 * @param string id
 * @param object assignment
 * @returns object thought 
*/

export const addReaction = async (req: Request, res: Response) => {
    console.log('You are adding a reaction');
    console.log(req.body);
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE Reaction based on /:thoughtId/reactions/:reactionId
 * @param string thoughttId
 * @param string reactionId
 * @returns object thought 
*/

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}
