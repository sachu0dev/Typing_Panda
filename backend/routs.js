const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require("./modal");
const UserScore = require("./modal");
const zod = require("zod");
const app = express();
const jwtPassword = "secret";
const cors = require('cors');
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
app.post("/score", verifyUserToken, async (req, res) => {
  try {
    const userScore = await UserScore.findOne({ email: req.user.email });
    const score = req.body;
    console.log(userScore);
    if (!userScore) {
      const newUserScore = new UserScore({
        email: req.user.email,
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

app.get("/profile", verifyUserToken, (req, res) => {
  
})
app.get("/rankings", verifyUserToken, (req, res) => {
  
})
app.use((err, req, res, next)=>{
  res.status(500).json({
    message: err.message
  })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});