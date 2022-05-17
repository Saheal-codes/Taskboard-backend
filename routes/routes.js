const router = require("express").Router();
const usercontroller = require("../controllers/usercontroller");
const taskcontroller = require("../controllers/taskcontroller");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/registeruser", usercontroller.signupUser);
router.post("/loginuser", usercontroller.loginUser);
router.post(
  "/verifytoken",
  authmiddleware.verifytoken,
  usercontroller.verifytoken
);

router.post("/addtask", authmiddleware.verifytoken, taskcontroller.addTask);
router.post(
  "/deletetask",
  authmiddleware.verifytoken,
  taskcontroller.deleteTask
);
router.post("/showtask", authmiddleware.verifytoken, taskcontroller.showTasks);
router.post(
  "/showpendingtask",
  authmiddleware.verifytoken,
  taskcontroller.showPendingTasks
);

module.exports = router;
