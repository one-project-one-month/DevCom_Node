export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden access",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation error",
  INTERNAL_ERROR: "Internal server error",
} as const;
