import {
  createUserService,
  deleteUserService,
  getUserByEmailService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "../service/userService.js";

export const createUser = async (req, res) => {
  const { name, email, password, type } = req.body;

  if (!name || !email || !password || !type) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hasUser = await getUserByEmailService(email);
    console.log(hasUser)
    if (hasUser) {
      return res.status(409).json({ error: "User already registered." });
    }

    await createUserService({ name, email, type, password });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to register user." });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    return res
      .status(200)
      .json({ message: "Users retrieved successfully.", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to retrieve users." });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User retrieved successfully.", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Failed to retrieve user." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, type } = req.body;

  if (!name && !email && !password && !type) {
    return res
      .status(400)
      .json({ error: "At least one field is required for update." });
  }

  try {
    const user = await updateUserService(id, { name, email, password, type });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user." });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await deleteUserService(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Failed to delete user." });
  }
};
