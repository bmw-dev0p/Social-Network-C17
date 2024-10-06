
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
  ];
  
  // Seed data for Thoughts
  const thoughtSeedData = [
    {
      text: "Hold the door!",
      username: "johnSnow",
      // since the requirements want a nested array of subdocuments, 
      // we can insert the entire reaction object
      reactions: [reactionSeedData[0]], 
    },
    {
      text: "Const until you cant",
      username: "rickyRoll",
      reactions: [reactionSeedData[2]],
    },
    {
      text: "AI will take my job",
      username: "cyberPunk",
      reactions: [reactionSeedData[3]],
    },
    {
      text: "I love the smell of napalm in the morning.",
      username: "machoMan",
      reactions: [reactionSeedData[4]],
    },
    {
      text: "I picked a peck of pickled peppers.",
      username: "peterPiper",
      reactions: [reactionSeedData[1]],
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
      username: 'cyberPunk",',
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
  ];

  export { thoughtSeedData, userSeedData };