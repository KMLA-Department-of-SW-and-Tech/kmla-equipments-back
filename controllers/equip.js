import Equip from "../models/Equip.js";
import Comment from "../models/Comment.js";
import Error from "../models/Error.js";

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