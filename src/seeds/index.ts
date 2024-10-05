import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
// import cleanDB from './cleanDB.js';
// import { getRandomName, getRandomAssignments } from './data.js';
import { Types } from 'mongoose';
import mongoose from 'mongoose';


// Seed data for Reactions
const reactionSeedData = [
  {
    _id: new Types.ObjectId(),
    text: "Great thought!",
    username: "jane_smith",
    createdAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    text: "Interesting take.",
    username: "john_doe",
    createdAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    text: "I totally agree!",
    username: "emily_clark",
    createdAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    text: "Well said.",
    username: "mike_jones",
    createdAt: new Date(),
  },
  {
    _id: new Types.ObjectId(),
    text: "I don't think that's accurate.",
    username: "robert_brown",
    createdAt: new Date(),
  },
];

// Seed data for Thoughts
const thoughtSeedData = [
  {
    _id: new Types.ObjectId(),
    text: "Learning Mongoose is fun!",
    createdAt: new Date(),
    username: "john_doe",
    reactions: [reactionSeedData[0]._id, reactionSeedData[1]._id],
  },
  {
    _id: new Types.ObjectId(),
    text: "Mongoose schemas are powerful.",
    createdAt: new Date(),
    username: "jane_smith",
    reactions: [reactionSeedData[2]._id],
  },
  {
    _id: new Types.ObjectId(),
    text: "I enjoy building REST APIs!",
    createdAt: new Date(),
    username: "mike_jones",
    reactions: [reactionSeedData[3]._id],
  },
  {
    _id: new Types.ObjectId(),
    text: "JavaScript is such a versatile language.",
    createdAt: new Date(),
    username: "emily_clark",
    reactions: [reactionSeedData[1]._id, reactionSeedData[4]._id],
  },
  {
    _id: new Types.ObjectId(),
    text: "Functional programming is very cool.",
    createdAt: new Date(),
    username: "robert_brown",
    reactions: [],
  },
];

// Seed data for Users with Thoughts and Friends
const userSeedData = [
  {
    _id: new Types.ObjectId(),
    username: 'john_doe',
    email: 'john@example.com',
    thoughts: [thoughtSeedData[0]._id],
    friends: [new Types.ObjectId(), new Types.ObjectId()],  // Placeholder for a friend reference
  },
  {
    _id: new Types.ObjectId(),
    username: 'jane_smith',
    email: 'jane@example.com',
    thoughts: [thoughtSeedData[1]._id],
    friends: [new Types.ObjectId(), new Types.ObjectId()],
  },
  {
    _id: new Types.ObjectId(),
    username: 'mike_jones',
    email: 'mike@example.com',
    thoughts: [thoughtSeedData[2]._id],
    friends: [new Types.ObjectId()],
  },
  {
    _id: new Types.ObjectId(),
    username: 'emily_clark',
    email: 'emily@example.com',
    thoughts: [thoughtSeedData[3]._id],
    friends: [new Types.ObjectId()],
  },
  {
    _id: new Types.ObjectId(),
    username: 'robert_brown',
    email: 'robert@example.com',
    thoughts: [thoughtSeedData[4]._id],
    friends: [new Types.ObjectId(), new Types.ObjectId()],
  },
];



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
    await Thought.insertMany(thoughtSeedData);  // Changed to create() for debugging
    console.log('Thoughts inserted!');

    // Seed Users next
    console.log('Seeding users...');
    await User.insertMany(userSeedData);  // Changed to create() for debugging
    console.log('Users inserted!');
  } catch (error) {
    console.error('Error inserting seed data:', error);  // Detailed logging of errors
  }
};

const runSeed = async () => {
  try {
    console.log('Connecting to database...');
    await db(); // Ensure the database connection completes
    console.log('Database connected!');
    
    await seedDatabase(); // Seed data after connection

    console.log('Seeding complete! 🌱');
    console.table(userSeedData);
    console.table(thoughtSeedData);
    
    // Close the connection once seeding is complete
    console.log('Closing database connection...');
    await mongoose.connection.close();

    // Safely exit the process after the connection is closed
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);  // Capture and log any errors in seeding
    process.exit(1);
  }
};

runSeed();



