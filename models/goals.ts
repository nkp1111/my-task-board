import { models, model, Schema } from "mongoose";


const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'not started'
  },
  description: {
    type: String
  },
  icon: {
    type: String,
  },
  completedAt: {
    type: Date,
  },
  note: {
    type: String,
  }
}, {
  timestamps: true
});


const GoalSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true
  },
  tasks: [
    TaskSchema,
  ]
}, {
  timestamps: true,
})

GoalSchema.index({ userId: 1, name: 1 }, { unique: true });

const Goal = models.Goal || model("Goal", GoalSchema);

export { Goal };