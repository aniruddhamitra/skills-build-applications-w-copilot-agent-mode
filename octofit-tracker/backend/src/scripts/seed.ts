import mongoose from 'mongoose';
import { connectToDatabase } from '../database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
const seed = async () => {
  await connectToDatabase();
  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Asha Patel', email: 'asha.patel@example.com', role: 'captain', fitnessLevel: 'advanced' },
    { name: 'Kai Morgan', email: 'kai.morgan@example.com', role: 'member', fitnessLevel: 'intermediate' },
    { name: 'Mina Chen', email: 'mina.chen@example.com', role: 'member', fitnessLevel: 'beginner' },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Night Owls',
      sport: 'CrossFit',
      captain: users[0].name,
      members: users.map((user) => user.name),
    },
    {
      name: 'River Runners',
      sport: 'Running',
      captain: users[1].name,
      members: [users[1].name, users[2].name],
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      duration: '35m',
      calories: 310,
      date: '2026-06-27',
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      duration: '45m',
      calories: 340,
      date: '2026-06-27',
    },
    {
      userId: users[2]._id.toString(),
      type: 'yoga',
      duration: '25m',
      calories: 180,
      date: '2026-06-27',
    },
  ]);

  await LeaderboardEntry.insertMany([
    { name: users[0].name, score: 980, streak: 8 },
    { name: users[1].name, score: 945, streak: 6 },
    { name: users[2].name, score: 900, streak: 4 },
  ]);

  await Workout.insertMany([
    { title: 'HIIT Cardio', difficulty: 'moderate', duration: '30m', focus: 'endurance' },
    { title: 'Core Blast', difficulty: 'easy', duration: '20m', focus: 'core' },
    { title: 'Strength Flow', difficulty: 'hard', duration: '40m', focus: 'upper-body' },
  ]);

  console.log('Seed data inserted successfully');
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
