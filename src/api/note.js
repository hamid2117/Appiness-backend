import express from 'express'
import Note from '../models/noteModel.js'
import { protect } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//*@desc fetch all Note
//*@Api Get /api/v1/notes
//*@Access Private

router.get(
  '/notes',
  protect,
  asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id })

    if (notes) {
      res.json(notes)
    } else {
      res.status(404)
    }
  })
)

//*@desc delete Note
//*@Api delete /api/v1/note/:id
//*@Access Private

router.delete(
  '/note/:id',
  protect,
  asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (note) {
      await note.remove()
      res.json({ message: 'Note is removed' })
    } else {
      res.status(404)
      throw new Error('Note is not found')
    }
  })
)

//*@desc Fetch each Note
//*@Api GET /api/v1/note/:id
//*@Access Private

router.get(
  '/note/:id',
  protect,
  asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (note) {
      res.json(note)
    } else {
      throw new Error('Note not found')
    }
  })
)

//*@desc Create Note
//*@Api POST /api/v1/user
//*@Access Private

router.post(
  '/note',
  protect,
  asyncHandler(async (req, res) => {
    const { note } = req.body

    const notee = new Note({
      note,
      user: req.user._id,
    })

    const createdNote = await notee.save()
    if (createdNote) {
      res.status(201).json(createdNote)
    } else {
      throw new Error(error)
    }
  })
)

//*@desc Edit Note
//*@Api PUT /api/v1/editnote/:id
//*@Access Private

router.put(
  '/editnote/:id',
  protect,
  asyncHandler(async (req, res) => {
    const notee = await Note.findById(req.params.id)
    if (notee) {
      notee.note = req.body.note || notee.note

      const updatedNote = await notee.save()
      res.status(200).json(updatedNote)
    } else {
      res.status(404)
      throw new Error('Note is not foundedd . ')
    }
  })
)

export default router
