"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
// Seed the octofit_db database with test data
const seed = async () => {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/octofit_db');
    console.log('Seed the octofit_db database with test data');
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
        { name: 'Asha Patel', email: 'asha.patel@example.com', role: 'captain', fitnessLevel: 'advanced' },
        { name: 'Kai Morgan', email: 'kai.morgan@example.com', role: 'member', fitnessLevel: 'intermediate' },
        { name: 'Mina Chen', email: 'mina.chen@example.com', role: 'member', fitnessLevel: 'beginner' },
    ]);
    const teams = await models_1.Team.insertMany([
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
    await models_1.Activity.insertMany([
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
    await models_1.LeaderboardEntry.insertMany([
        { name: users[0].name, score: 980, streak: 8 },
        { name: users[1].name, score: 945, streak: 6 },
        { name: users[2].name, score: 900, streak: 4 },
    ]);
    await models_1.Workout.insertMany([
        { title: 'HIIT Cardio', difficulty: 'moderate', duration: '30m', focus: 'endurance' },
        { title: 'Core Blast', difficulty: 'easy', duration: '20m', focus: 'core' },
        { title: 'Strength Flow', difficulty: 'hard', duration: '40m', focus: 'upper-body' },
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
};
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
