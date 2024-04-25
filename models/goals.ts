import { models, model, Schema } from "mongoose";


const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
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
  processNote: {
    type: String,
  }
}, {
  timestamps: true
});


const GoalSchema = new Schema({
  name: {
    type: String,
    length: 3,
    required: true,
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

const Goal = models.Goal || model("Goal", GoalSchema);

export default Goal;