import mongoose from 'mongoose'

const alarmSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    dayAlarm: { type: String, required: true },
    nightAlarm: { type: String, required: true },
  },
  { timestamps: true }
)

const User = mongoose.model('Alarm', alarmSchema)

export default User
