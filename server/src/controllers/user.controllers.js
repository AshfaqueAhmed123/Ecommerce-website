import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIARY,
} from "../../env.js";

const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
      phoneNumber,
      interests,
      shippingAddress,
    } = req.body;
    const duplicateUser = await User.findOne({ username, email });
    if (duplicateUser) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "user with this email or username already exists in our system"
          )
        );
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPass,
      phoneNumber,
      interests,
      shippingAddress,
    });
    if (!user) {
      return res.status(500).json(new ApiError(500, "error registering user"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "user registered sucessfully", user));
  } catch (error) {
    return res
      .status(error?.status || 400)
      .json(new ApiError(error?.status || 400, error?.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email && !username) {
      return res
        .status(400)
        .json(new ApiError(400, "email or username is required"));
    }
    if (!password) {
      return res.status(400).json(new ApiError(400, "password is required"));
    }
    const user = await User.findOne({
      $or: [{ email: email || null }, { username: username || null }],
    });
    if (!user) {
      return res.status(404).json(new ApiError(404, "invalid credentials"));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(
      password,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json(new ApiError(400, "invalid credentials"));

    // generate access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: user.role},
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIARY }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, "login successful", { accessToken, refreshToken })
      );
  } catch (error) {
    return res
      .status(error?.status || 400)
      .json(new ApiError(error?.status || 400, error?.message));
  }
};

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(400)
                .json(new ApiError(400, "refresh token is required in authorization header"));
        }

        const refreshToken = authHeader.split(" ")[1];

        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(404).json(new ApiError(404, "user not found"));
        }

        user.refreshToken = null;
        await user.save();

        return res.status(200).json(new ApiResponse(200, "logout successful"));
    } catch (error) {
        return res
            .status(error?.status || 400)
            .json(new ApiError(error?.status || 400, error?.message));
    }
};

export { register, login, logout };
