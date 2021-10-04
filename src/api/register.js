import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'

const router = express.Router()

//*@desc To create a user
//*@Api POST /api/v1/register
//*@Access Public

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { fname, lname, email, password } = req.body

    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) {
      return res
        .status(409)
        .json({ status: 'error', error: 'email already in use' })
    } else {
      const user = await User.create({
        fname,
        lname,
        email,
        password,
      })
      if (user) {
        res.status(201).json({
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          token: generateToken(user._id),
        })
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)
router.post(
  '/googleregister',
  asyncHandler(async (req, res) => {
    const { familyName, givenName, email } = req.body

    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) {
      return res.status(201).json({
        email: alreadyExist.email,
        fname: alreadyExist.fname,
        lname: alreadyExist.lname,
        token: generateToken(alreadyExist._id),
      })
    } else {
      const user = await User.create({
        fname: givenName,
        lname: familyName,
        email,
        password: '123456789',
      })
      if (user) {
        res.status(201).json({
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          token: generateToken(user._id),
        })
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)

export default router
