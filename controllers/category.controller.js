import { Category } from "../models/index.js";

export const createCategory = async (req, res) => {
  const { name, type } = req.body;
  const category = await Category.create({ name, type, UserId: req.userId });
  res.json(category);
};

export const getCategories = async (req, res) => {
  const categories = await Category.findAll({ where: { UserId: req.userId } });
  res.json(categories);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const category = await Category.findByPk(id);
  if (!category || category.UserId !== req.userId) {
    return res.status(404).json({ message: "Category not found" });
  }
  category.name = name;
  category.type = type;
  await category.save();
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category || category.UserId !== req.userId) {
    return res.status(404).json({ message: "Category not found" });
  }
  await category.destroy();
  res.json({ message: "Category deleted successfully" });
}