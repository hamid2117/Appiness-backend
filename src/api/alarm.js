import express from 'express'
import Alarm from '../models/reminderModel.js'
import { protect } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//*@desc Create Alarm
//*@Api POST /api/v1/alarm
//*@Access User

router.post(
  '/alarm',
  protect,
  asyncHandler(async (req, res) => {
    const { dayAlarm, nightAlarm } = req.body

    const alarmm = new Alarm({
      nightAlarm,
      dayAlarm,
      user: req.user._id,
    })

    const createdAlarm = await alarmm.save()
    if (createdAlarm) {
      res.status(201).json(createdAlarm)
    } else {
      throw new Error(error)
    }
  })
)

//*@desc Edit Alarm
//*@Api PUT /api/v1/editalarm/:id
//*@Access User

router.put(
  '/editalarm/:id',
  protect,
  asyncHandler(async (req, res) => {
    const alarmm = await Alarm.findById(req.params.id)
    if (alarmm) {
      alarmm.dayAlarm = req.body.dayAlarm || alarmm.dayAlarm
      alarmm.nightAlarm = req.body.nightAlarm || alarmm.nightAlarm
      const updatedAlarm = await alarmm.save()
      res.status(200).json(updatedAlarm)
    } else {
      res.status(404)
      throw new Error('Alarm is not foundedd . ')
    }
  })
)

export default router
