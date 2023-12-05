const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,

} = require("../controllers/userController");
const Controller = require('../controllers/Controller');
const socketIo = require('../utils/soket'); // Import your socketIo function
const io = socketIo();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth"); // for patner auth
// console.log(io)
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// Teams Routes
router.route('/teams')
  .get(isAuthenticatedUser, authorizeRoles("admin"), Controller.getAllTeamsByAdmin)
  .post(isAuthenticatedUser, authorizeRoles("admin"), Controller.createTeamByAdmin);

router.route('/teams/:id')
  .get(isAuthenticatedUser, Controller.getTeamByIdByAdmin)
  .put(isAuthenticatedUser, authorizeRoles("admin"), Controller.updateTeamByIdByAdmin)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), Controller.deleteTeamByIdByAdmin);

router.route('/user/teams')
  .get(isAuthenticatedUser, Controller.getTeamsByUserId);

// Task Routes
router.route('/tasks')
  .post(isAuthenticatedUser, authorizeRoles("admin"), Controller.createTaskByAdmin(io))
  .get(isAuthenticatedUser, authorizeRoles("admin"), Controller.getAllTasksCreatedByAdmin);

router.route('/tasks/:id')
  .put(isAuthenticatedUser, authorizeRoles("admin"), Controller.updateTaskByIdByAdmin)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), Controller.deleteTaskByIdByAdmin);

router.route('/user/tasks')
  .get(isAuthenticatedUser, Controller.getAllTasksForAllTeamMembers);

router.route('/user/tasks/:taskId')
  .get(isAuthenticatedUser, Controller.getTaskByIdForUser);

router.route('/tasks/:taskId/completions')
  .put(isAuthenticatedUser, Controller.updateCompletionStatusForTeamOrIndividual);

// Notification Routes
router.route('/user/notifications')
  .get(isAuthenticatedUser, Controller.getAllNotificationsForUser);

router.route('/user/notifications/:notificationId')
  .put(isAuthenticatedUser, Controller.updateNotificationReadStatus);

  // taskCompletions Routes
router.route('/taskCompletions')
  .get(isAuthenticatedUser, authorizeRoles("admin"), Controller.getAllTaskCompletions);

router.route('/taskCompletions/:taskCompletionId')
  .get(isAuthenticatedUser, authorizeRoles("admin"), Controller.getTaskCompletionById);

module.exports = router;

