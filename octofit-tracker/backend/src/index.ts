import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const users = [
  { id: '1', name: 'Asha', email: 'asha@example.com', role: 'captain' },
  { id: '2', name: 'Kai', email: 'kai@example.com', role: 'member' },
];

const teams = [
  { id: '1', name: 'Night Owls', sport: 'CrossFit' },
  { id: '2', name: 'River Runners', sport: 'Running' },
];

const activities = [
  { id: '1', type: 'run', duration: '30m', calories: 280 },
  { id: '2', type: 'strength', duration: '45m', calories: 320 },
];

const leaderboard = [
  { id: '1', name: 'Asha', score: 980 },
  { id: '2', name: 'Kai', score: 945 },
];

const workouts = [
  { id: '1', title: 'HIIT Cardio', difficulty: 'moderate' },
  { id: '2', title: 'Core Blast', difficulty: 'easy' },
];

app.get(['/api/health', '/api/health/'], (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.get(['/api/users', '/api/users/'], (_req, res) => {
  res.json(users);
});

app.post(['/api/users', '/api/users/'], (req, res) => {
  const user = { id: `${users.length + 1}`, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.get(['/api/teams', '/api/teams/'], (_req, res) => {
  res.json(teams);
});

app.post(['/api/teams', '/api/teams/'], (req, res) => {
  const team = { id: `${teams.length + 1}`, ...req.body };
  teams.push(team);
  res.status(201).json(team);
});

app.get(['/api/activities', '/api/activities/'], (_req, res) => {
  res.json(activities);
});

app.post(['/api/activities', '/api/activities/'], (req, res) => {
  const activity = { id: `${activities.length + 1}`, ...req.body };
  activities.push(activity);
  res.status(201).json(activity);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
  res.json(leaderboard);
});

app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
  const entry = { id: `${leaderboard.length + 1}`, ...req.body };
  leaderboard.push(entry);
  res.status(201).json(entry);
});

app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
  res.json(workouts);
});

app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
  const workout = { id: `${workouts.length + 1}`, ...req.body };
  workouts.push(workout);
  res.status(201).json(workout);
});

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed', error);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`Base URL: ${baseUrl}`);
  });
};

start();
