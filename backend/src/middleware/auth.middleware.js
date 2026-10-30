import jwt from "jsonwebtoken";
import config from "../config/config.js";
import SessionModel from "../models/users/session.model.js"

export async function authmiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    // extract the token and verify it
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, config.JWT_SECRET);

    //
    const session = await SessionModel.findById(decode.sessionId);

    if (
      !session ||
      session.revoked ||
      decode.tokenVersion !== session.tokenVersion
    ) {
      return res.status(401).json({
        message: "Session expired, revoked or access token outdated",
      });
    }

    // id available to nexxt handler
    req.user = {
      id: decode.id,
      sessionId: decode.sessionId,
    };
    // pass to next controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired access token" });
  }
}

export default authmiddleware;
