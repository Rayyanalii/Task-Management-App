import { Request } from "express";
import Task from "../models/Tasks";

export const createTask = async (req: Request, res: any) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newTask = new Task({
      title,
      description,
      userId: (req as any).userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req: Request, res: any) => {
  try {
    const tasks = await Task.find({ userId: (req as any).userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: Request, res: any) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: Request, res: any) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
