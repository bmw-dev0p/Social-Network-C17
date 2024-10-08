import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User, Thought } from '../models/index.js';

// Aggregate function to get number of Users overall
export const userCount = async () => {
    const userCount = await User.aggregate()
        .count('UserCount');
    return userCount;
}

// function for # of friends
export const friendCount = async (userId: string) => {
    const user = await User.findById(userId);
    if (user) {
        const friendCount = user.friends.length;
        return friendCount;
    } else {
        throw new Error('User not found');
    }
}

/**
 * GET All Users /users
 * @returns an array of Users
*/
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        console.log('getting all users');

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
        console.log('getting user by id');

        const user = await User.findById(userId);
        if (user) {
            res.json({
                user,
                friendCount: await friendCount(userId),
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
 * @body object User (username, email)
 * @returns a single User object
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        console.log('creating a user');

        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * PUT User based on id /users/:id
 * @param string id
 * @body object username, email
 * @returns a single User object
*/
export const updateUser = async (req: Request, res: Response) => {
    try {
        console.log('updating a user');

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
 * DELETE User based on id /users/:id
 * @param string id
 * @returns string 
*/

export const deleteUser = async (req: Request, res: Response) => {
    try {
        console.log('deleting a user');
        
        // Delete the user
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        // Delete all thoughts associated with the user
        const thoughts = await Thought.deleteMany({ username: user.username });

        if (!thoughts) {
            return res.status(404).json({
                message: 'User deleted, but no thoughts found',
            });
        }

        return res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};


/**
 * POST friend based on /users/:userId/friends
 * @param string id
 * @body object assignment
 * @returns object User 
*/
// I wanted the functionality of adding a friend by username, so I modified the function to accept a username instead of an _id
// also added functionality to create a new user if the friend doesn't exist
export const addFriend = async (req: Request, res: Response) => {
    console.log('You are adding a friend by username');
    console.log(req.body);

    try {
        console.log('You are adding a friend');
        
        // get friend's username from request body
        const { username } = req.body;

        // Check if a user with the given username already exists
        let friend = await User.findOne({ username });

        // If the friend doesn't exist, create a new user
        if (!friend) {
            console.log(`No user found with username ${username}. Creating a new user...`);
            friend = new User({ username, email: `${username}@example.com` }); // Assign a default email or modify as needed
            await friend.save();
            console.log(`New user created with username ${username} and _id ${friend._id}`);
        }

        // Add the friend's _id and username to the current user's friends list
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { _id: friend._id, username: friend.username } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID :(' });
        }

        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
};



/**
 * DELETE friend based on /users/:userId/friends/:friendId
 * @param string userId
 * @param string friendId
 * @returns object User 
*/

export const removeFriend = async (req: Request, res: Response) => {
    try {
        console.log('You are removing a friend');
        console.log(req.params);

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
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
