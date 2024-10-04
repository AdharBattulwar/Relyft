import user from "../models/user.model.js";
import { Encrypt } from "../utils/passwordEncrypt.js";
import { handleFileUploadCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const handleGetAllUsers = async (req, res) => {
  const userData = await user.find({});
  res.send(userData);
};

const handleUserSignUp = async (req, res) => {
  const { username, email, fullName, password } = req.body;
  if (
    [username, email, fullName, password].some(
      (feilds) => feilds?.trim() === ""
    )
  ) {
    return res
      .status(400)
      .json({ success: false, msg: "Need to put the correct Data" });
  }
  const existingUser = await user.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.status(409).json({ success: false, msg: "User already Exists" });
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //   res.status(400).json({ success: false, msg: "Avatar Path is required" });
  // }

  // const avatar = await handleFileUploadCloudinary(avatarLocalPath);
  // const coverImage = await handleFileUploadCloudinary(coverImageLocalPath);

  // if (!avatar) {
  //   res.status(404).json({ success: false, msg: "avatar file not uploaded" });
  // }

  await user
    .create({
      username: username,
      email: email,
      fullName: fullName,
      // avatar: avatar.url,
      // coverImage: coverImage?.url || "",
      password: await Encrypt(password),
    })
    .then(() => {
      console.log("User Saved in Database");
      return res
        .status(201)
        .json({ success: "true", msg: "User Created Successfully" });
    })
    .catch((err) => {
      console.log("Error Occoured in Creating User", err);
      return res
        .status(401)
        .json({ success: "false", msg: "User can not be created" });
    });
};

const handleUserLogin = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email && !username) {
    return res
      .status(400)
      .json({ success: false, msg: "Username or Email is Required" });
  }

  const userData = await user.findOne({
    $or: [{ username }, { email }],
  });

  if (!userData) {
    return res.status(404).json({ success: false, msg: "User Not Found" });
  }

  const result = await userData.isPasswordCorrect(password);
  if (!result) {
    return res.status(401).json({ success: false, msg: "Invaild Credentilas" });
  }

  const refreshToken = await userData.generateRefreshToken();
  const accessToken = await userData.generateAccessToken();
  userData.refreshToken = refreshToken;
  await userData.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json({
      success: true,
      msg: "User Authenticated Succesfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
};

const handleLogoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const User = await user.findById(userId);

    if (!User) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    User.refreshToken = undefined;
    await User.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("AccessToken", options);
    res.clearCookie("RefreshToken", options);

    return res
      .status(200)
      .json({ success: true, msg: "User Logout Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: "Something Went Wrong during logout" });
  }
};

const handleRefreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.RefreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ success: false, msg: "Refresh Token Not Found" });
  }

  try {
    const decodedToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      return res
        .status(400)
        .json({ success: false, msg: "Refresh Token Invaild" });
    }

    const userData = await user.findById(decodedToken._id);

    if (refreshToken !== userData.refreshToken) {
      return res
        .status(400)
        .json({ success: false, msg: "Refresh Token Does Not Match" });
    }

    const accessToken = await userData.generateAccessToken();
    refreshToken = await userData.generateRefreshToken();

    userData.refreshToken = refreshToken;
    await userData.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(201)
      .cookie("AccessToken", accessToken, options)
      .cookie("RefreshToken", refreshToken, options)
      .json({
        success: true,
        msg: "Refresh & Access Token Genrated SuccessFully",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Something went Wrong while refreshing the Tokens",
    });
  }
};

const handleChangePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return res.status(400).json({
      success: false,
      msg: "Old and New Password need to be Different",
    });
  }

  const userData = await user.findById(req.user?._id);
  const OldPasswordCheckResponse = userData.isPasswordCorrect(oldPassword);

  if (!OldPasswordCheckResponse) {
    return res
      .status(400)
      .json({ success: false, msg: "Enter Correct Old Password" });
  }

  userData.password = await Encrypt(newPassword);
  await userData.save({ validateBeforeSave: false });
};

const handleGetCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
    msg: "Current User Found Succesfully",
  });
};

export {
  handleGetAllUsers,
  handleUserSignUp,
  handleUserLogin,
  handleLogoutUser,
  handleRefreshAccessToken,
  handleChangePassword,
  handleGetCurrentUser,
};
