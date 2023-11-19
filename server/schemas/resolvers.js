const User = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Define query resolvers if needed
  },
  Mutation: {
    addUser: async (parent, { username, email, password, role }) => {
      try {
        console.log("Adding user:", { username, email, role }); // Log input data
        const user = await User.create({ username, email, password, role });
        const token = signToken(user);
        console.log("User added successfully:", user); // Log user data
        return { token, user };
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error creating user");
      }
    },
    login: async (parent, { email, password }) => {
      try {
        console.log("User attempting to log in:", { email }); // Log login attempt
        const user = await User.findOne({ email });
        if (!user) {
          console.error("User not found for email:", email);
          throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          console.error("Incorrect password for user:", email);
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        console.log("User logged in successfully:", user); // Log successful login
        return { token, user };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Error during login");
      }
    },
    removeUser: async (parent, { username, email }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      if (context.user.role !== "admin") {
        throw new AuthenticationError("Unauthorized");
      }
      try {
        console.log("Removing user:", { username, email }); // Log removal attempt
        const user = await User.findOneAndDelete({ username, email });
        if (!user) {
          throw new Error("User not found");
        }
        console.log("User removed successfully:", user); // Log successful removal
        return user;
      } catch (error) {
        console.error("Error removing user:", error);
        throw new Error("Error deleting user");
      }
    },
  },
};

module.exports = resolvers;