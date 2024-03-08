const express = require('express');
// const cron = require('cron');
const { cron } = require('./controllers/cron.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User, UserScore } = require("./modal.js");
const zod = require("zod");
const app = express();
const jwtPassword = "secret";
const cors = require('cors');
app.use('/clear-todays-score', cron);
app.use(express.json());
app.use(cors());
// mongoose connection
mongoose.connect("mongodb+srv://admin:sachu@typingpanda.mgdkzdd.mongodb.net/main", {
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
});
// zod schema
const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
  username: zod.string().max(20)
})
const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
})
async function verifyUserToken(req, res, next){
  try{
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, jwtPassword);
  const user = await User.findOne({email: decoded.email});
  if(!user){
    return res.status(401).json({
      message: "Unauthorized"
    })
  }
  req.user = user;
  next();
} catch {
  return res.status(401).json({
    message: "Unauthorized"
  })
}
}
function signupInputCheck(req, res, next){
  const user = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username
  }
  const result = signupSchema.safeParse(user);
  if(!result.success){
    return res.status(400).json({
      message: "invalid input"
    })
  }
  next();
}
var AllScore = {
  time: 0,
  lessons: 0,
  topSpeed: 0,
  avgSpeed: 0,
  avgAccuracy: 0,
  score: 0
};
async function calculateAllTime(req, res, next) {
  try {
    AllScore = {
      time: 0,
      lessons: 0,
      topSpeed: 0,
      avgSpeed: 0,
      avgAccuracy: 0,
      score: 0
    };
    const userscore = await UserScore.findOne({ username: req.user.username });
    userscore.scores.forEach(obj => {
      AllScore.time += parseFloat(obj.time);
      AllScore.lessons += 1;
      if(parseFloat(obj.speed) > AllScore.topSpeed){
        AllScore.topSpeed = parseFloat(obj.speed)
      }
      AllScore.avgSpeed += parseFloat(obj.speed);
      AllScore.avgAccuracy += parseFloat(obj.acuracy);
    });
    AllScore.time = formatTime(AllScore.time);
    AllScore.topSpeed = `${AllScore.topSpeed}wpm`;
    AllScore.avgSpeed = `${(AllScore.avgSpeed / (AllScore.lessons)).toFixed(1)}wpm`;
    AllScore.avgAccuracy = `${(AllScore.avgAccuracy / (AllScore.lessons)).toFixed(2)}%`;
    AllScore.score = (parseInt(AllScore.avgSpeed) * parseInt(AllScore.lessons)).toFixed(0);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
var TodayScore = {
  time: 0,
  lessons: 0,
  topSpeed: 0,
  avgSpeed: 0,
  avgAccuracy: 0,
  score: 0
};
cron.schedule('30 18 * * *', async () => {
  try {
    console.log("Trying to clear today's score");
    await UserScore.updateMany({}, { $set: { todayscore: [] } });
    console.log('Todayscore cleared successfully.');
  } catch (error) {
    console.error('Error clearing todayscore:', error.message || error);
  }
});
module.exports = app;
function checkDate() {
  let currentDate = new Date().getDate();
  setInterval(async () => {
      let newDate = new Date().getDate();
      if (newDate !== currentDate) {
          await clearTodayscore();
          currentDate = newDate;
      }
  }, 60000);
}
checkDate();
async function getTopTenSpeeds(req, res, next) {
  try {
    // Retrieve all UserScore documents
    const allUserScores = await UserScore.find();

    // Calculate top speed for each user
    const userTopSpeeds = {};

    allUserScores.forEach(score => {
      const username = score.username;
      const topSpeed = Math.max(...score.scores.map(entry => parseFloat(entry.speed)));

      if (!userTopSpeeds[username] || topSpeed > userTopSpeeds[username].topSpeed) {
        userTopSpeeds[username] = { username: username, topSpeed };
      }
    });
    const topUsers = Object.values(userTopSpeeds).sort((a, b) => b.topSpeed - a.topSpeed).slice(0, 20);
    res.json({ leaderboard: topUsers });
  } catch (error) {
    // Handle errors
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function calculateTodayTime(req, res, next) {
  try {
    TodayScore = {
      time: 0,
      lessons: 0,
      topSpeed: 0,
      avgSpeed: 0,
      avgAccuracy: 0,
      score: 0
    };
    const userscore = await UserScore.findOne({ username: req.user.username });
    userscore.todayscore.forEach(obj => {
      TodayScore.time += parseFloat(obj.time);
      TodayScore.lessons += 1;
      if(parseFloat(obj.speed) > TodayScore.topSpeed){
        TodayScore.topSpeed = parseFloat(obj.speed)
      }
      TodayScore.avgSpeed += parseFloat(obj.speed);
      TodayScore.avgAccuracy += parseFloat(obj.acuracy);
    });
    TodayScore.time = formatTime(TodayScore.time);
    TodayScore.topSpeed = `${TodayScore.topSpeed}wpm`;
    TodayScore.avgSpeed = `${(TodayScore.avgSpeed / (TodayScore.lessons)).toFixed(1)}wpm`;
    TodayScore.avgAccuracy = `${(TodayScore.avgAccuracy / (TodayScore.lessons)).toFixed(2)}%`;
    TodayScore.score = (parseInt(TodayScore.avgSpeed) * parseInt(TodayScore.lessons)).toFixed(0);
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
function formatTime(input) {
  const hours = Math.floor(input / 60); 
  const remainingMinutes = input % 60; 
  const minutes = Math.floor(remainingMinutes); 
  const seconds = Math.round((remainingMinutes - minutes) * 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function signinInputCheck(req, res, next){
  const user = {
    email: req.body.email,
    password: req.body.password,
  }
  const result = signinSchema.safeParse(user);
  if(!result.success){
    return res.status(400).json({
      message: "invalid input"
    })
  }
  next();
}
app.post("/signup",signupInputCheck, async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }
    const existingUser = await User.findOne({email: user.email, username: user.username});
    if(existingUser){
      return res.status(400).json({
        message: "User already exists"
      })
    }
    const newUser = new User(user);
    newUser.save();
    return res.status(201).json({
      message: "User created successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      message: "User already exists"
    })
  }
});

app.post("/signin",signinInputCheck, async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    }
    const existingUser = await User.findOne({email: user.email});
    if(existingUser){
      if(existingUser.password === user.password){
        const token = jwt.sign(user, jwtPassword);
        return res.status(200).json({
          message: "Login successful",
          token,
          username: existingUser.username
        })
      }
      return res.status(400).json({
        message: "Wrong password"
      })
    }
    return res.status(400).json({
      message: "Invalid credentials or user does not exist"
    })
  }
  catch{
    return res.status(500).json({
      message: "Internal server error"
    })
  }
});
const json = require('express').json;

app.post("/score", verifyUserToken, async (req, res) => {
  try {
    const userScore = await UserScore.findOne({ username: req.user.username });
    const score = req.body;
    if (!userScore) {
      const newUserScore = new UserScore({
        username: req.user.username,
        todayscore: [score],
        scores: [score]
      });
      await newUserScore.save();
    } else {
      if (!userScore.todayscore || !userScore.scores) {
        userScore.todayscore = [score];
        userScore.scores = [score];
      } else {
        userScore.todayscore.push(score);
        userScore.scores.push(score);
      }
      await userScore.save();
    }

    return res.status(201).json({
      message: "Score saved successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});


app.get("/profile", verifyUserToken, calculateAllTime,calculateTodayTime, async (req, res) => {
  res.status(201).json({
    todayStats: TodayScore,
    allTimeStats: AllScore
  })
})
app.get("/rankings", verifyUserToken,getTopTenSpeeds)
app.use((err, req, res, next)=>{
  res.status(500).json({
    message: err.message
  })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});