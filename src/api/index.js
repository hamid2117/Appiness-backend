import express from 'express'
import registerApi from './register.js'
import loginApi from './login.js'
import updateProfile from './updateProfile.js'
import adminApi from './admin.js'
import noteApi from './note.js'
import alarmApi from './alarm.js'
const router = express.Router()
router.use(registerApi)
router.use(loginApi)
router.use(noteApi)
router.use(updateProfile)
router.use(adminApi)
router.use(alarmApi)

export default router
