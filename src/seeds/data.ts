
// Seed data for Reactions
const reactionSeedData = [
    {
      text: "Great thought process!",
      username: "rickyRoll",
    },
    {
      text: "Interesting take on things.",
      username: "johnSnow",
    },
    {
      text: "I totally agree!",
      username: "machoMan",
    },
    {
      text: "Well met!",
      username: "cyberPunk",
    },
    {
      text: "I don't really think so.",
      username: "peterPiper",
    },
    {
      text: "SSssssSSss",
      username: "dangerNoodle",
    },
    {
      text: "Relatable.",
      username: "trashPanda",
    },
  ];
  
  // Seed data for Thoughts
  const thoughtSeedData = [
    {
      text: "Hold the door!",
      username: "johnSnow",
      reactions: [], 
    },
    {
      text: "Const until you cant",
      username: "rickyRoll",
      reactions: [],
    },
    {
      text: "AI will take my job",
      username: "cyberPunk",
      reactions: [],
    },
    {
      text: "I love the smell of napalm in the morning.",
      username: "machoMan",
      reactions: [],
    },
    {
      text: "I picked a peck of pickled peppers.",
      username: "peterPiper",
      reactions: [],
    },
    {
      text: "Don't ssSSsstep on me!",
      username: "dangerNoodle",
      reactions: [],
    },
    {
      text: "To eat or not to eat, that is the question.",
      username: "trashPanda",
      reactions: [],
    },
  ];
  
  // Seed data for Users
  const userSeedData = [
    {
      username: 'johnSnow',
      email: 'john@example.com',
      thoughts: [],  // Placeholder for thoughts
      friends: [],  // Placeholder for friends
    },
    {
      username: 'rickyRoll',
      email: 'ricky@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'cyberPunk',
      email: 'cyber@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'machoMan',
      email: 'macho@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'peterPiper',
      email: 'peter@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'dangerNoodle',
      email: 'noodle@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'trashPanda',
      email: 'trash@example.com',
      thoughts: [],
      friends: [],
    },
  ];

  export { reactionSeedData, thoughtSeedData, userSeedData };