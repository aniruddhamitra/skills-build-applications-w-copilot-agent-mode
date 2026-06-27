"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get(['/api/health', '/api/health/'], (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    try {
        const users = await models_1.User.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.post(['/api/users', '/api/users/'], async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    try {
        const teams = await models_1.Team.find().sort({ createdAt: -1 });
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
app.post(['/api/teams', '/api/teams/'], async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().sort({ createdAt: -1 });
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
app.post(['/api/activities', '/api/activities/'], async (req, res) => {
    try {
        const activity = await models_1.Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    try {
        const entries = await models_1.LeaderboardEntry.find().sort({ score: -1 });
        res.json(entries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
app.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    try {
        const entry = await models_1.LeaderboardEntry.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    try {
        const workouts = await models_1.Workout.find().sort({ createdAt: -1 });
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
app.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    try {
        const workout = await models_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
const start = async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`Base URL: ${baseUrl}`);
    });
};
start();
