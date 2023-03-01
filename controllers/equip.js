import Equip from "../models/Equip.js";
import Comment from "../models/Comment.js";
import Error from "../models/Error.js";

import mongoose from "mongoose";

export const getEquip = async (req, res) => {
  try {
    const equip = await Equip.find();
    res.status(200).json(equip);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTenEquipsWithSkip = async (req, res) => {
  const skip = req.params.skip;
  try {
    const equip = await Equip.find()
      .skip((Number(skip) - 1) * 10)
      .limit(10);
    res.status(200).json(equip);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEquip = async (req, res) => {
  const equip = req.body;
  const newEquip = new Equip(equip);
  try {
    await newEquip.save();
    res.status(200).json(newEquip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEquip = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  const { name, description, price, category, image } = req.body;
  if (name) findEquip.name = name;
  if (description) findEquip.description = description;
  if (price) findEquip.price = price;
  if (category) findEquip.category = category;
  if (image) findEquip.image = image;
  try {
    await findEquip.save();
    res.status(200).json(findEquip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  const { comment } = req.body;
  const { name, text } = comment;
  const newComment = new Comment({ user: name, text: text });
  newComment.save();
  findEquip.comments.push(newComment);
  try {
    await findEquip.save();
    res.status(200).json(findEquip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEquip = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  try {
    await findEquip.remove();
    res.status(200).json(findEquip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEquipById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send(`No equip with id: ${req.params.id}`);
  const findEquip = await Equip.findById(req.params.id);
  try {
    res.status(200).json(findEquip);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addError = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  const { error } = req.body;
  const { equip, problem } = error;
  const newError = new Error({ equip, problem });
  newError.save();
  findEquip.errors.push(newError);
  try {
    await findEquip.save();
    res.status(200).json(findEquip);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const registerEquip = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  if (findEquip.isRegisterd) {
    return res
      .status(409)
      .json({ message: "This equipment is already registered" });
  }
  const { whoRegistered, name } = req.body;
  findEquip.whoRegistered = whoRegistered;
  findEquip.registerName = name;
  findEquip.isRegisterd = true;
  findEquip.status = "대여중";
  try {
    await findEquip.save();
    return res.status(200).json(findEquip);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const cancelEquip = async (req, res) => {
  const findEquip = await Equip.findById(req.params.id);
  if (!findEquip.isRegisterd) {
    return res
      .status(409)
      .json({ message: "This equipment is not registered" });
  }
  findEquip.isRegisterd = false;
  findEquip.whoRegistered = "Not Registered";
  findEquip.registerName = "Not Registered";
  findEquip.status = "대여가능";
  try {
    await findEquip.save();
    return res.status(200).json(findEquip);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const searchEquip = async (req, res) => {
  let { keyword } = req.query;
  const regex = (pattern) => new RegExp(`.*${pattern}.*`);
  const titleRegex = regex(title);

  try {
    const equip = await Equip.find({
      $or: [{ name: titleRegex }, { category: titleRegex }],
    });
    res.status(200).json(equip);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const resetEquip = async (req, res) => {
  // reset all equip register status
  try {
    const equip = await Equip.find();
    equip.forEach((item) => {
      item.isRegisterd = false;
      item.whoRegistered = "Not Registered";
      item.registerName = "Not Registered";
      item.status = "대여가능";
      item.save();
    });
    res.status(200).json(equip);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
