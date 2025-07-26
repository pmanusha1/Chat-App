import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import RegisterUser from './model.js'
import auth from './middleware.js'
import Message from './messageModel.js'

const app = express()
dotenv.config()

app.use(express.json())

app.use(cors({origin: "*"}))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err))

app.get('/', (req, res) => {
  res.send("Chat app")
})


app.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body

    const exist = await RegisterUser.findOne({ email })
    if (exist) return res.status(400).send("User already exists")
    if (password !== confirmpassword) return res.status(400).send('Passwords do not match')

    const newUser = new RegisterUser({ username, email, password, confirmpassword })
    await newUser.save()
    res.status(200).send('Registered Successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        let exist = await RegisterUser.findOne({email})

        if (!exist) {
            return res.status(400).send("User not found")
        }

        if(exist.password !== password) {
            return res.status(400).send("Invalid credentials")
        }

        const payload = {
          user: {
            id: exist._id,
            username: exist.username,
            email: exist.email
          }
        };

        jwt.sign(payload, 'jwtSecret', {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            return res.json({token})
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send("Invalid token")
    }
})

app.get('/myprofile', auth, async (req, res) => {
  try {
    const user = await RegisterUser.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post('/addmsg', auth, async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    const newMessage = new Message({
      sender: req.user.id,
      receiver: receiverId,
      text
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get('/getmsg/:id', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.get('/users', auth, async (req, res) => {
  try {
    const users = await RegisterUser.find({ _id: { $ne: req.user.id } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


app.listen(process.env.PORT, () => console.log("Server running on port", process.env.PORT))
