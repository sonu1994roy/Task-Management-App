const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true  ,  unique: true,},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    department: {
        type: String
    }
}, { timeStamp: true });

const Team = mongoose.model('Team', teamSchema);


const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignmentType: { type: String, enum: ['individual', 'team'], default: null },
  assignedTo: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      isTeam: { type: Boolean, default: false },
      completionStatus: {
        type: String,
        enum: ['pending', 'inprogress', 'completed'],
        default: 'pending',
      },
    },
  ],
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  dueDate: { type: Date },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
}, { timestamps: true });
const Task = mongoose.model('Task', taskSchema);


const taskCompletionSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  completionDate: { type: Date, default: Date.now },

});

const TaskCompletion = mongoose.model('TaskCompletion', taskCompletionSchema);



const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  link: { type: String },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  createdAt: { type: Date, default: Date.now },

});

const Notification =  mongoose.model('Notification', notificationSchema);


module.exports = {
    Team,
    Task,
    TaskCompletion,
    Notification
  };