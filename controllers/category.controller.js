import { Category } from "../models/index.js";

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = await Category.create({ name, type, UserId: req.userId });
    if (!category) {
      return res
        .status(400)
        .json({ error: { message: "Category creation failed" } });
    } else {
      return res
        .status(201)
        .json({ message: "Category successfully added !!" });
    }
  } catch (error) {
    console.error("🚀 ~ createCategory ~ error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { UserId: req.userId },
    });

    res.status(201).json({
      count: categories.length,
      categories:
        categories.length == 0
          ? []
          : categories.map(({ id, name, type, UserId }) => ({
              id,
              name,
              type,
              userId: UserId,
            })),
    });

    // res.json(categories);
  } catch (error) {
    console.error("🚀 ~ getCategories ~ error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const category = await Category.findByPk(id);
    if (!category || category.UserId !== req.userId) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    category.type = type;
    await category.save();
    return res.status(201).json({ message: "Category successfully added !!" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category || category.UserId !== req.userId) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res.status(201).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
