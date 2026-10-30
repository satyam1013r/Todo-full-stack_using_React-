import express from "express"
import  * as authController from "../controllers/auth.controller.js"
import authmiddleware from "../middleware/auth.middleware.js";
const authRouter=express.Router();


authRouter.post("/register",authController.register)
authRouter.post("/login",authController.login)
    // for testing (1- login ->copy access token         2- Test it )
// authRouter.get("/protected", authmiddleware, (req, res) => {
//   res.status(200).json({
//     message: "Access granted",
//     user: req.user,
//   });
// });
authRouter.get("/getMe",authmiddleware,authController.getMe)
authRouter.post("/refreshToken",authController.refreshToken)
authRouter.post("/logout",authController.logout)
authRouter.post("/logoutAll",authmiddleware,authController.logoutAll)
export default authRouter;