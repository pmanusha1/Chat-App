import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import RegisterUser from './model.js'
import auth from './middleware.js'
import message from './messageModel.js'

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

    let exist = await RegisterUser.findOne({ email })
    if (exist) {
      return res.status(400).send("User already exists")
    }

    if (password !== confirmpassword) {
      return res.status(400).send('Passwords do not match')
    }

    let newUser = new RegisterUser({
      username,
      email,
      password,
      confirmpassword
    })

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

        let payload = {
            user: {
                id: exist._id
            }
        }

        jwt.sign(payload, 'jwtSecret', {expiresIn: 3600000}, (err, token) => {
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
        let exist = await RegisterUser.findById(req.user.id)

        if(!exist) {
            return res.status(400).send("User not found")
        }
        res.json(exist)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("Server Error")
    }
})

app.post('/addmsg', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const exist = await RegisterUser.findById(req.user.id)

    const newmsg = new message({
      user: req.user.id,
      username: exist.username,
      text
    })

    await newmsg.save()

    let allmsg = await message.find()

    return res.json(allmsg)

  } catch (error) {
    console.log(error)
    return res.status(500).send("Server Error")
  }
})

app.get('/getmsg', auth, async (req, res) => {
  try {
    let allmsg = await message.find()
    return res.json(allmsg)

  } catch (error) {
    console.log(error)
    return res.status(500).send('Server Error')
  }
})

app.listen(process.env.PORT, () => console.log("Server running on port", process.env.PORT))
