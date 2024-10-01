import jwt from "jsonwebtoken";
import user from "../models/user.model.js";

const handleUserVerfication = async (req, res, next) => {
  try {
    const token =
      req.cookies.AccessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, msg: "Need Access Token" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      return res
        .status(403)
        .json({ success: false, msg: "User Need to Login Again" });
    }

    const userData = await user
      .findById(decodedToken._id)
      .select("-password -refereshToken");

    if (!userData) {
      return res
        .status(400)
        .json({ success: false, msg: "User Not Found using Token" });
    }

    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: "Error in authentication" });
  }
};

export { handleUserVerfication };
