import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
  userUUID: { type: String, unique: true, required: true },
  likes: [String],
  disLikes: [String],
});
