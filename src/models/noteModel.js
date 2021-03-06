import mongoose from 'mongoose'

const noteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    note: { type: String, required: true },
  },
  { timestamps: true }
)

const User = mongoose.model('Note', noteSchema)

export default User
