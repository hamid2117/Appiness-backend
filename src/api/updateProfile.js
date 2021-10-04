import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'
import { protect } from './../auth/authMiddleware.js'
//*@desc update profile
//*@Api PUT /api/v1/profile
//*@Access Private

const router = express.Router()

router.get(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

router.put(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.fname = req.body.fname || user.fname
      user.lname = req.body.lname || user.lname
      user.email = req.body.email || user.email
      user.birthday = req.body.birthday || user.birthday
      user.gender = req.body.gender || user.gender

      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        email: updatedUser.email,
        gender: updatedUser.gender,
        token: generateToken(user._id),
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

router.put(
  '/forgetpssword',
  asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
      user.codee = req.codee
      const updateUser = await user.save()
      res.status(200).json(updateUser)
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

export default router
