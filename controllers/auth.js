import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    return res.status(200).send("User has been created");
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000)
      return res.status(409).send("Conflict, user already exists");
    else return res.status(500).send("Server Error");
  }
};

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
export const login = async (req, res) => {
  const { username, password } = req.body;
  const secret = process.env.JWT_SECRET;
  try {
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // create token
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      secret,
      {
        expiresIn: 129600,
      }
    );
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        loginId: user.loginId,
        type: user.type,
        isAdmin: user.isAdmin,
      },
      message: "User logged in",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const checkUser = async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return res.status(200).json({
        success: true,
        message: "User verified",
      });
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  }
};

export const checkAdmin = async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
      
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.isAdmin);
      if (decoded.isAdmin) {
        return res.status(200).json({
          success: true,
          message: "Admin verified",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Not an admin",
        });
      }
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  }
};
