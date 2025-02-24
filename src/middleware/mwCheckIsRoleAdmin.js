import { getUserByIdService } from "../service/userService.js";

export const mwCheckIsRoleAdmin = async (req, res, next) => {
  try {
    if (!req.$userId) return res.status(404).json({ error: "User not found." });

    const user = await getUserByIdService(req.$userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.type !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
    }

    next();
  } catch (error) {
    console.error("Error checking admin role:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};
