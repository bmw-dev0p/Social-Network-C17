import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User, Thought } from '../models/index.js';

// Aggregate function to get number of Users overall

export const userCount = async () => {
    const userCount = await User.aggregate()
        .count('UserCount');
    return userCount;
}


/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        const userObj = {
            users,
            userCount: await userCount(),
        }

        res.json(userObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

/**
 * GET User based on id /users/:id
 * @param string id
 * @returns a single User object
*/
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                // grade: await grade(userId)
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * POST User /users
 * @param object User
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
/**
 * PUT User based on id /users/:id
 * @param object id, username
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };
/**
 * DELETE User based on id /Users/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        // delete User
        const user = await User.findOneAndDelete({ _id: req.params.UserId });

        if (!user) {
            return res.status(404).json({ message: 'No such User exists' });
        }

        // delete associated thoughs with user
        const thought = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({
                message: 'User deleted, but no Thoughts found',
            });
        }

        return res.json({ message: 'User successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/**
 * POST friend based on /users/:UserId/friends
 * @param string id
 * @param object assignment
 * @returns object User 
*/

export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No User found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * DELETE friend based on /users/:userId/friends/:friendId
 * @param string assignmentId
 * @param string UserId
 * @returns object User 
*/

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No User found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
