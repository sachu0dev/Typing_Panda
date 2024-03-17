
const { UserScore } = require("../modal.js");

// export default async function cron(request, response) {
//     try {
//         await UserScore.updateMany({}, { $set: { todayscore: [] } });
//         console.log('Todayscore cleared successfully.');
//     } catch (error) {
//         console.error('Error clearing todayscore:', error.message || error);
//     }

// }
const cron = async () => {
    try {
        await UserScore.updateMany({}, { $set: { todayscore: [] } });
        console.log('Todayscore cleared successfully.');
    } catch (error) {
        console.error('Error clearing todayscore:', error.message || error);
    }
};

module.exports = cron;