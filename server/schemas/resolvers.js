const User = require("../models/User");
const PetProfile = require("../models/Dogs"); // Ensure correct model name
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Define query resolvers
    getPetProfile: async (parent, { petId }) => {
      try {
        const petProfile = await PetProfile.findById(petId);
        if (!petProfile) {
          throw new Error("Pet profile not found");
        }
        return petProfile;
      } catch (error) {
        console.error("Error fetching pet profile:", error);
        throw new Error("Error fetching pet profile");
      }
    },
    getPetProfiles: async () => {
      try {
        const petProfiles = await PetProfile.find();
        return petProfiles;
      } catch (error) {
        console.error("Error fetching pet profiles:", error);
        throw new Error("Error fetching pet profiles");
      }
    },
    user: async (_, { id }) => {
      try {
        if (!id) {
          throw new Error("User ID must be provided");
        }

        // Fetch the user by ID from the database
        const user = await User.findById(id);

        // Check if the user exists
        if (!user) {
          throw new Error("User not found");
        }

        // Return the user object
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          address: user.address,
          // Include any other fields that are required by your GraphQL schema
        };
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user");
      }
    },
    // Add any other queries if needed
  },
  Mutation: {
    addUser: async (parent, { username, email, password, role }) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          role,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error creating user");
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
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
        const user = await User.findOneAndDelete({ username, email });
        return user;
      } catch (error) {
        console.error("Error removing user:", error);
        throw new Error("Error deleting user");
      }
    },
    addPetProfile: async (_, { name, breed, age, size }) => {
      try {
        const petProfile = await PetProfile.create({ name, breed, age, size });
        return petProfile;
      } catch (error) {
        console.error("Error adding pet profile:", error);
        throw new Error("Error adding pet profile");
      }
    },
    updateUserAddress: async (_, { id, address }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          { address },
          { new: true } // Return the updated user object
        );

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return {
          address: updatedUser.address,
          // include any other fields required in the response
        };
      } catch (error) {
        console.error("Error updating user address:", error);
        throw new Error("Error updating user address");
      }
    },
  },
};

module.exports = resolvers;
