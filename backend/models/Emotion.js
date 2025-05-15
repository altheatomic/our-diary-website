import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema({
  userId: { type: String, required: true },       // bạn có thể dùng ObjectId nếu muốn
  date: { type: String, required: true },         // định dạng: "YYYY-MM-DD"
  emotion: { type: String, required: true }       // emoji ví dụ: "😀"
});

emotionSchema.index({ userId: 1, date: 1 }, { unique: true }); // ngăn trùng ngày/user

export default mongoose.model("Emotion", emotionSchema);
