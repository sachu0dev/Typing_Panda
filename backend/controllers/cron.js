const cron = require('node-cron');
const { UserScore } = require("../modal.js");

async function clearTodaysScore() {
    try {
        await UserScore.updateMany({}, { $set: { todayscore: [] } });
        console.log('Todayscore cleared successfully.');
    } catch (error) {
        console.error('Error clearing todayscore:', error.message || error);
    }
}

cron.schedule('0 0 * * *', () => {
    clearTodaysScore();
});
