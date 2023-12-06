const { Team,
  Task,
  TaskCompletion,
  Notification } = require('../models/othersModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");
const sendEmail = require("../utils/sendEmail");
const mongoose = require('mongoose');
// Create a Team
exports.createTeamByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, members, department } = req.body;
  if (!name) {
    return next(new ErrorHander('Team name is required', 400));
  }
  let memberIds = [];
    memberIds = JSON.parse(members); 

  if (!Array.isArray(memberIds)) {
    return next(new ErrorHander('Invalid members format', 400));
  }
  // Convert string member IDs to ObjectId type
  const memberObjectIds = memberIds.map(memberId => mongoose.Types.ObjectId(memberId));

  const newTeam = await Team.create({ name, members: memberObjectIds, department });
  res.status(201).json({ success: true, data: newTeam });
});

// Get all Teams
exports.getAllTeamsByAdmin = catchAsyncErrors(async (req, res, next) => {
  let resultPerPage = parseInt(req.query.limit) || 10;
  const Count = await Team.countDocuments();
  const apiFeature = new ApiFeatures(Team.find(), req.query).search();
  apiFeature.pagination(resultPerPage);
  const teams = await apiFeature.query.populate('members', 'name avatar email _id');

  let filteredCount = teams.length;

  res.status(200).json({
    success: true,
    teams,
    Count,
    resultPerPage,
    filteredCount,
  });
});

// Get Team by ID
exports.getTeamByIdByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const team = await Team.findById(id).populate('members', 'name avatar email');
  if (!team) {
    return next(new ErrorHander(`Team not found with id ${id}`, 404));
  }
  res.status(200).json({ success: true, data: team });
});

// Update Team by ID
exports.updateTeamByIdByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, members, department } = req.body;

  let team = await Team.findById(id);
  if (!team) {
    return next(new ErrorHander(`Team not found with id ${id}`, 404));
  }
  let memberIds = [];
  memberIds = JSON.parse(members); 

if (!Array.isArray(memberIds)) {
  return next(new ErrorHander('Invalid members format', 400));
}
const memberObjectIds = memberIds.map(memberId => mongoose.Types.ObjectId(memberId));

  team.name = name || team.name;
  team.members = memberObjectIds || team.members;
  team.department = department || team.department;

  await team.save();

  res.status(200).json({ success: true, data: team });
});

// Delete Team by ID
exports.deleteTeamByIdByAdmin = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const team = await Team.findById(id);
  if (!team) {
    return next(new ErrorHander(`Team not found with id ${id}`, 404));
  }

  await team.remove();

  res.status(200).json({ success: true, data: {} });
});

// Get all Teams for a User by ID
exports.getTeamsByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  // Find teams where the user ID exists in the members array
  const userTeams = await Team.find({ members: { $in: [userId] } })
    .select('name  members')
    .populate('members', 'name avatar email');

  res.status(200).json({ success: true, data: userTeams });
});


// task controller **********************
//  create a task by admin
exports.createTaskByAdmin = (io) =>catchAsyncErrors(async (req, res) => {
  console.log(io)
  const { assignmentType, assignedTo, team, ...taskData } = req.body;
  const newTask = await Task.create({ ...taskData, assignmentType });
  if (assignmentType === 'individual') {
    const recipient =  assignedTo._id;
    const message = `You have been assigned a new task: ${newTask.title}`;
    const notification = await Notification.create({ recipient, message });
    await sendEmail({
      email: assignedTo && assignedTo.email,
      subject: `New Notfication`,
      message,
    });
    io.emit('sendNotification', recipient, message);
    newTask.assignedTo.push({ user: recipient, completionStatus: 'pending' });
    await newTask.save();
  } else if (assignmentType === 'team' && team) {
    const teamMembers = await Team.findById(team).select('members').populate('members');
    const message = `A new task has been assigned to your team: ${newTask.title}`;

    for (const member of teamMembers.members) {
      const notification = await Notification.create({ recipient: member._id, message });
      await sendEmail({
        email: member && member.email,
        subject: `New Notfication`,
        message,
      });
      io.emit('sendNotification', member._id, message);
      newTask.assignedTo.push({ user: member, isTeam: true, completionStatus: 'pending' });
    }
    await newTask.save();
  }

  res.status(201).json(newTask);
});

//  update a task by ID
exports.updateTaskByIdByAdmin = catchAsyncErrors(async (req, res) => {
  const taskId = req.params.id;
  const { assignmentType, assignedTo, team, ...updateData } = req.body;
  if (!taskId) {
    return next(new ErrorHander('task not found in any team', 404));
  }
  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

  if (assignmentType === 'individual') {
    const recipient = assignedTo && assignedTo.user;
    const message = `A task has been updated: ${updatedTask.title}`;
    // for notfication send and create via email soketio and create notification 
    const notification = await Notification.create({ recipient, message });
    await sendEmail({
      email: assignedTo && assignedTo.email,
      subject: `New Notfication`,
      message,
    });
    io.emit('sendNotification', recipient, message);
    updatedTask.assignedTo.push({ user: recipient, completionStatus: 'pending' });
    await updatedTask.save();
  } else if (assignmentType === 'team' && team) {
    const teamMembers = await Team.findById(team).select('members');
    const message = `A task has been updated to your team: ${updatedTask.title}`;

    for (const member of teamMembers.members) {
      const notification = await Notification.create({ recipient: member, message });
      await sendEmail({
        email: member && member.email,
        subject: `New Notfication`,
        message,
      });
      io.emit('sendNotification', member, message);
      updatedTask.assignedTo.push({ user: member, isTeam: true, completionStatus: 'pending' });
    }
    await updatedTask.save();
  }

  res.status(200).json(updatedTask);
});
// get all tasks created by admin
exports.getAllTasksCreatedByAdmin = catchAsyncErrors(async (req, res) => {
  const adminTasks = await Task.find().populate('assignedTo.user team');
  res.status(200).json(adminTasks);
});

// delete a task by ID
exports.deleteTaskByIdByAdmin = catchAsyncErrors(async (req, res) => {
  const taskId = req.params.id;
  const deletedTask = await Task.findByIdAndDelete(taskId);
  if (!deletedTask) {
    return next(new ErrorHander('task not found in any team', 404));
  }
  res.status(200).json({ message: 'Task deleted successfully' });
});



//  for user access task ***********************
// Get all tasks for all team members of the logged-in user
exports.getAllTasksForAllTeamMembers = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;
  const apiFeature = new ApiFeatures(Task.find({ 'assignedTo.user': userId }), req.query).search();
  const teamTasks = await apiFeature.query;
  res.status(200).json(teamTasks);
});

// Get task by ID for a user
exports.getTaskByIdForUser = catchAsyncErrors(async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return next(new ErrorHander('task not found in any team', 404));
  }

  if (task.assignedTo.some(assignee => assignee.user.equals(userId))) {
    // Check if the user is directly assigned to the task
    res.status(200).json(task);
  } else if (task.assignmentType === 'team') {
    // Check if the task is assigned to a team
    const teamAssigned = task.assignedTo.some(assignee => assignee.isTeam && assignee.user.equals(userId));

    if (teamAssigned) {
      // Return the task if the user is part of the assigned team
      res.status(200).json(task);
    } else {
      return next(new ErrorHander('User not authorized to access this task', 403));
    }
  } else {
    return next(new ErrorHander('User not authorized to access this task', 403));
  }
});

// Update completion status for team or individual tasks
exports.updateCompletionStatusForTeamOrIndividual = catchAsyncErrors(async (req, res) => {
  const taskId = req.params.taskId;
  const newCompletionStatus = req.body.completionStatus;
  const userId = req.user.id;

  const task = await Task.findById(taskId);

  if (!task) {
    return next(new ErrorHander('Task not found', 404));
  }

  if (task.assignmentType === 'team') {
    const teamId = task.team;
    const teamMembers = await Team.findById(teamId).select('members');

    for (const member of teamMembers.members) {
      const updatedTask = await Task.findOneAndUpdate(
        {
          _id: taskId,
          'assignedTo.user': member,
        },
        { 'assignedTo.$.completionStatus': newCompletionStatus },
        { new: true }
      );

      if (!updatedTask) {
        return next(new ErrorHander(`Task not found for user ${member}`, 404));
      }
    }

    res.status(200).json({ message: 'Completion status updated for team members' });
  } else if (task.assignmentType === 'individual') {
    const userAssigned = task.assignedTo.some(assignee => assignee.user.equals(userId));

    if (!userAssigned) {
      return next(new ErrorHander(`User not authorized to update this task`, 401));
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: taskId,
        'assignedTo.user': userId,
      },
      { 'assignedTo.$.completionStatus': newCompletionStatus },
      { new: true }
    );

    if (!updatedTask) {
      return next(new ErrorHander(`task Not found`, 404));
    }
    let updateFields = {};

    // create task complation history 
    if (newCompletionStatus === 'inprogress') {
      updateFields.startDate = Date.now();
    } else if (newCompletionStatus === 'completed') {
      updateFields.completionDate = Date.now();
    }

    // Update Task Completion History 
    if (Object.keys(updateFields).length !== 0) {
      const taskHistory = await TaskCompletion.findOneAndUpdate(
        { taskId: taskId, completedBy: userId },
        updateFields,
        { new: true, upsert: true }
      );
    }
    res.status(200).json({ message: 'Completion status updated for the individual task' });
  } else {
    return next(new ErrorHander(`Task is not assigned to a team or an individual`, 403));
  }
});

exports.getAllTaskCompletions = catchAsyncErrors(async (req, res) => {
  const taskCompletions = await TaskCompletion.find().populate('completedBy', 'taskId'); // Populate 'completedBy' with 'username'

  res.status(200).json(taskCompletions);
});

exports.getTaskCompletionById = catchAsyncErrors(async (req, res) => {
  const { taskCompletionId } = req.params;

  const taskCompletion = await TaskCompletion.findById(taskCompletionId).populate('completedBy', 'taskId');

  if (!taskCompletion) {
    return res.status(404).json({ message: 'Task completion not found' });
  }

  res.status(200).json(taskCompletion);
});


// Notification get 
exports.getAllNotificationsForUser = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;
  const notifications = await Notification.find({ recipient: userId });

  res.status(200).json(notifications);
});

exports.updateNotificationReadStatus = catchAsyncErrors(async (req, res) => {
  const notificationId = req.query.notificationId;
  const userId = req.user.id;
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return next(new ErrorHander(`Notification not foundl`, 404));
  }

  // Check if  the recipient of the notification
  if (notification.recipient.toString() !== userId) {
    return next(new ErrorHander(`Unauthorized to update this notification`, 403));
  }
  // Update the readBy field with the user's ID
  const updatedNotification = await Notification.findByIdAndUpdate(
    notificationId,
    { $addToSet: { readBy: userId } }, // Using $addToSet to avoid duplicates
    { new: true }
  );

  res.status(200).json(updatedNotification);
});



