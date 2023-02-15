import express from "express";
import Error from "../models/Error.js";

export const getErrorById = async (req, res) => {
  const { id } = req.params;
  try {
    const error = await Error.findById(id);
    res.status(200).json(error);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
