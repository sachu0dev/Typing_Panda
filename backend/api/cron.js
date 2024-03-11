const cron = require('node-cron');
const { UserScore } = require("../modal.js");

export default async function handler(request, response) {
    try {
        await UserScore.updateMany({}, { $set: { todayscore: [] } });
        console.log('Todayscore cleared successfully.');
    } catch (error) {
        console.error('Error clearing todayscore:', error.message || error);
    }

}