export const errorMessages = {
  nameTooShort: "Name must have at least 2 characters.",  //
  requiredEmail: "Email is required.", // add to zod schama
  invalidEmail: "Invalid email address.", //
  requiredPassword: "Password is required.", //
  passwordTooShort: "Password must have at least 6 characters.", //
  passwordsDontMatch: "Passwords do not match.", //
  emailAlreadyRegistered: "Email already registered.", //
  invalidCredentials: "Invalid email or password.", //
  registrationSuccess: "User successfully registered!", // not error
  registrationFailed: "Registration failed.", //
  loginFailed: "Login failed.", //
  updateRoleSuccess: "Role updated successfully.", // not error
  failedToUpdateRole: "Failed to update user role.", //
  invalidRole: "Invalid user role.", //
  sessionRestoreFail: "Failed to restore session.", //
  sessionRetrieveFail: "Failed to retrieve session.", // confirm if is same as sessionRestoreFail
  sessionExpired: "Session expired. Please log in again.",  //
  loggedOut: "You have been logged out.", // not error
  failedToLoadUsers: "Failed to load user list.", //
  fallbackMessage: "An unexpected error occurred.", // confirm
};
