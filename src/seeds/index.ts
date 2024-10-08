import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import mongoose from 'mongoose';
import { reactionSeedData, thoughtSeedData, userSeedData } from './data.js';


// Function to seed data
const seedDatabase = async () => {
  try {
    console.log('Clearing collections...');
    // Clear existing collections
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Collections cleared!');

    // Seed Thoughts first
    console.log('Seeding thoughts...');
    const thoughts = await Thought.create(thoughtSeedData);
    console.log('Thoughts inserted!');

    // Seed Users next
    console.log('Seeding users...');
    const users = await User.insertMany(userSeedData);
    console.log('Users inserted!');

    // Seed Reactions
    console.log('Seeding reactions...');
    for (let i = 0; i < thoughts.length; i++) {
      await Thought.findByIdAndUpdate(thoughts[i]._id, { $push: { reactions: reactionSeedData[i] } });
    }

    // Associate friends with users (adding in reverse order)
    console.log('Associating friends...');
    for (let i = 0; i < users.length; i++) {
      // reverse count
      const j = (users.length - 1) - i;

      // Assign friend props
      const friend = {
        _id: users[j]._id,
        username: users[j].username
      };

      // Update the user with the friend
      await User.findByIdAndUpdate(
        users[i]._id, // i counting up
        { friends: [friend] } // j counting down
      );
    }

    console.log('One friend assigned per user in reverse order!');

    console.log('Friends associated!');


    // Associate thoughts with users
    console.log('Associating thoughts with users...');
    for (let i = 0; i < users.length; i++) {
      await User.findByIdAndUpdate(users[i]._id, { thoughts: [thoughts[i]._id] });
    }
    console.log('Thoughts associated with users!');


    console.log('Friends associated!');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const runSeed = async () => {
  try {
    console.log('Connecting to database...');
    await db();
    console.log('Database connected!');

    await seedDatabase();
    console.log('Seeding complete! 🌱');

    // Close the connection once seeding is complete
    console.log('Closing database connection...');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();
