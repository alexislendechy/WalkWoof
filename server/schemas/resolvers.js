const User = require("../models");
const PetProfile = require('../models/Dogs');
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
        throw new Error("Error fetching pet profiles absbsd");
      }
    },
    user: async (parent, args, context) => {
      // Check if there's a user in the context
      if (context.user) {
        try {
          // Fetch the user based on the ID from the context
          const user = await User.findById(context.user._id);
          
          if (!user) {
            throw new AuthenticationError('User not found');
          }

          // You can perform additional logic or populate related fields here if needed

          return user;
        } catch (error) {
          console.error('Error fetching user:', error);
          throw new AuthenticationError('Error fetching user');
        }
      }

      // If there's no user in the context, throw an AuthenticationError
      throw new AuthenticationError('Not authenticated');
    },
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
    addPetProfile: async (_, { name, breed, age, size }, context) => {
      try {
        // Ensure the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("User not authenticated");
        }

        console.log("Adding pet profile:", { name, breed, age, size });

        // Create the pet profile
        const petProfile = await PetProfile.create({ 
          name, 
          breed, 
          age, 
          size,
          owner: context.user._id, });

        // Associate the pet profile with the user
        await User.findByIdAndUpdate(
          context.user.id,
          { $push: { dogs: petProfile } }, // Assuming you have a field named "pets" in your User model
          { new: true }
        );

        console.log("Pet profile added successfully:", petProfile);

        // Return the necessary fields in the response
        return {
          id: petProfile._id.toString(),
          petName: petProfile.name,
          petBreed: petProfile.breed,
          petAge: petProfile.age,
          petSize: petProfile.size,
          owner: context.user._id,
        };
      } catch (error) {
        console.error("Error adding pet profile:", error);
        throw new Error("Error adding pet profile");
      }
    },
  },
}

module.exports = resolvers;
