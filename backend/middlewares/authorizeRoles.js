import ApiError from "../utils/ApiError.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Make sure user is attached from isAuthenticated middleware
    if (!req.user) {
      return next(new ApiError(401, "Not authenticated"));
    }

    // Check if user role exists
    const userRole = req.user.role;
    if (!userRole) {
      return next(new ApiError(403, "User role not found"));
    }

    // Check authorization
    if (!allowedRoles.includes(userRole)) {
      return next(
        new ApiError(403, "You are not authorized to perform this action")
      );
    }

    // User allowed
    next();
  };
};
