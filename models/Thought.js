const { Schema, model, Types } = require("mongoose");
const { type } = require("os");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reaction: {
    type: String,
    required: true,
    MaxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: { type: String, default: true },
});
const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      default: true,
      required: true,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
