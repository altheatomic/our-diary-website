import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: String, required: true }
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
