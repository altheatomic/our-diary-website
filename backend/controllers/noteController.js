import Note from '../models/Note.js';

export const createNote = async (req, res) => {
  try {
    const { text, timestamp } = req.body;

    const newNote = new Note({
      text,
      timestamp,
      user: req.user._id,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }) 
      .sort({ _id: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};
