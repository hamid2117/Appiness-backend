import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'

//*@desc login the user
//*@Api POST /api/v1/login
//*@Access Public

const router = express.Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: 'User is not found !' })

    if (user && password && (await user.matchpin(password))) {
      res.json({
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        gender: user.gender,
        token: generateToken(user._id),
      })
    } else {
      return res.status(403).json({ message: 'Wronge password!' })
    }
  })
)

export default router
