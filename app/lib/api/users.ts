// lib/api/users.ts

/**
 * Handles HTTP responses and errors consistently
 * @param {Response} response - Fetch response object
 * @returns {Promise<T>} - Resolved with JSON data or rejected with error
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};

export const userApi = {
  // User Registration
  register: async (userData: Record<string, any>): Promise<any> => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    }
  },

  // User Login
  login: async (credentials: Record<string, any>): Promise<any> => {
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  },

  // Get Current User Profile
  getCurrentUser: async (): Promise<any> => {
    try {
      const response = await fetch("/api/v1/users/me");
      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch user profile");
    }
  },

  // Update User Profile
  updateProfile: async (userData: Record<string, any>): Promise<any> => {
    try {
      const response = await fetch("/api/v1/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    }
  },

  // Update User Password
  updatePassword: async (passwordData: Record<string, any>): Promise<any> => {
    try {
      const response = await fetch("/api/v1/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to update password");
    }
  },

  // Get All Users (Admin only)
  getAllUsers: async (
    queryParams: Record<string, string> = {}
  ): Promise<any> => {
    try {
      const query = new URLSearchParams(queryParams).toString();
      const response = await fetch(`/api/v1/users?${query}`);
      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch users");
    }
  },

  // Get User by ID (Admin only)
  getUserById: async (userId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch user");
    }
  },

  // Delete User (Admin only)
  deleteUser: async (userId: string): Promise<any> => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
      });
      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to delete user");
    }
  },

  // Upload Profile Picture
  uploadProfilePicture: async (file: File): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch("/api/v1/users/profile-picture", {
        method: "POST",
        body: formData,
      });

      return handleResponse<any>(response);
    } catch (error: any) {
      throw new Error(error.message || "Failed to upload profile picture");
    }
  },
};
