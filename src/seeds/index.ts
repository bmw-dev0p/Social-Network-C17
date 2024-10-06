import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import mongoose from 'mongoose';
import { thoughtSeedData, userSeedData } from './data.js';


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

    // Associate friends with users (adding their user IDs to the friends array)
    await User.findByIdAndUpdate(users[0]._id, { friends: [users[1]._id, users[2]._id] }); // john_doe -> jane_smith, mike_jones
    await User.findByIdAndUpdate(users[1]._id, { friends: [users[0]._id, users[3]._id] }); // jane_smith -> john_doe, emily_clark
    await User.findByIdAndUpdate(users[2]._id, { friends: [users[3]._id] });              // mike_jones -> emily_clark
    await User.findByIdAndUpdate(users[3]._id, { friends: [users[1]._id] });              // emily_clark -> jane_smith
    await User.findByIdAndUpdate(users[4]._id, { friends: [users[0]._id, users[2]._id] }); // robert_brown -> john_doe, mike_jones

    
    // Associate thoughts with users
    await User.findByIdAndUpdate(users[0]._id,  { thoughts: [thoughts[0]._id] }); // john_doe -> Learning Mongoose is fun!
    await User.findByIdAndUpdate(users[1]._id,  { thoughts: [thoughts[1]._id] }); // jane_smith -> Mongoose schemas are powerful.
    await User.findByIdAndUpdate(users[2]._id,  { thoughts: [thoughts[2]._id] }); // mike_jones -> I enjoy building REST APIs!
    await User.findByIdAndUpdate(users[3]._id,  { thoughts: [thoughts[3]._id] }); // emily_clark -> JavaScript is such a versatile language.
    await User.findByIdAndUpdate(users[4]._id,  { thoughts: [thoughts[4]._id] }); // robert_brown -> Functional programming is very cool.
 

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
