const User = require("../models/User");
const PetProfile = require("../models/Dogs"); // Ensure correct model name
const Appointment = require("../models/Appointments");
const { signToken, AuthenticationError } = require("../utils/auth");
const mongoose = require("mongoose");

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

        // Fetch the dogs manually
        const Dog = mongoose.model("Dog");
        const dogs = await Dog.find({ _id: { $in: user.dogs } });

        // Map the dog fields to the expected GraphQL fields
        const dogData = dogs.map((dog) => ({
          id: dog._id.toString(), // Convert ObjectId to string
          petName: dog.name,
          petBreed: dog.breed,
          petAge: dog.age,
          petSize: dog.size,
          petGender: dog.gender,
          petImage: dog.image,
          petDescription: dog.description,

        }));

        //console.log("User data:", user);

        // Return the user object
        return {
          id: user._id.toString(), // Convert ObjectId to string
          username: user.username,
          email: user.email,
          role: user.role,
          address: user.address,
          imageUrl: user.imageUrl,
          dogs: dogData,
        };
      } catch (error) {
        console.error("Error fetching user:", error); // Log the error object
        throw new Error("Error fetching user");
      }
    },

    
    
    getAllAppointments: async () => {
      try {
        const appointments = await Appointment.find();
        // If your model uses MongoDB's ObjectId, you might need to convert it to string
        return appointments.map((appointment) => ({
          id: appointment._id.toString(), // Convert ObjectId to string
          date: appointment.date,
          time: appointment.time,
          user: appointment.user,
          address: appointment.address,
          petProfile: appointment.petProfile,
        }));
      } catch (error) {
        console.error("Error fetching appointments:", error);
        throw new Error("Failed to fetch appointments");
      }
    },
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
    addPetProfile: async (parent, { petName, petBreed, petAge, petSize, ownerId, petGender, petImage, petDescription }) => {
      try {
        //console.log("Adding pet profile:", { petName, petBreed, petAge, petSize, ownerId, petGender, petImage, petDescription });
        const petProfile = await PetProfile.create({ name: petName, breed: petBreed, age: petAge, size: petSize, owner: ownerId, gender: petGender, image: petImage, description: petDescription });
    
        if (!petProfile.name) {
          throw new Error("Failed to create pet profile, name is null");
        }

        console.log("Pet profile added successfully:", petProfile);

        // Fetch the user and update their dogs array
        const user = await User.findById(ownerId);
        user.dogs.push(petProfile._id);
        await user.save();

        // Map MongoDB _id to GraphQL id
        const { _id, name, breed, age, size, gender, image, description, owner, ...rest } = petProfile.toObject();
        const petProfileWithIdAndPetName = { id: _id.toString(), petName: name, petBreed: breed, petAge: age, petSize: size, petGender: gender, petImage: image, petDescription: description, ownerId: owner,  ...rest };
    
        return petProfileWithIdAndPetName;
      } catch (error) {
        console.error("Error adding pet profile:", error);
        throw new Error("Error adding pet profile");
      }
    },

    editUser: async (_, { id, username, email, password, role, address, imageUrl }) => {
      try {
        // Fetch the user by ID from the database
        const user = await User.findById(id);
    
        // Check if the user exists
        if (!user) {
          throw new Error("User not found");
        }
    
        // Update the user fields
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;
        if (role !== undefined) user.role = role;
        if (address !== undefined) user.address = address;
        if (imageUrl !== undefined) user.imageUrl = imageUrl;
    
        // Save the updated user
        await user.save();
    
        // Return the updated user
        return user;
      } catch (error) {
        console.error("Error editing user:", error); // Log the error object
        throw new Error("Error editing user");
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
    addDogWalk: async (_, { id, date, hour }) => {
      try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }

        // Add the dog walk to the user's dogWalks
        const newDogWalk = { date: new Date(date), hour };
        user.dogWalks.push(newDogWalk);
        await user.save();
        // Create a new appointment
        const newAppointment = new Appointment({
          user: user.username,
          petProfile: user.dogs,
          date: date,
          time: hour,
          address: user.address,
        });
        await newAppointment.save();

        // Return both the updated user and the new appointment
        return { user, appointment: newAppointment };
      } catch (error) {
        console.error(error);
        throw new Error("Error adding dog walk and creating appointment");
      }
    },
    deletePetProfile: async (parent, { petId }) => {
      const deletedPetProfile = await PetProfile.findByIdAndDelete(petId);
      if (!deletedPetProfile) {
        throw new Error("Dog not found");
      }
      return {
        id: deletedPetProfile._id,
        petName: deletedPetProfile.name,
        petBreed: deletedPetProfile.breed,
        petAge: deletedPetProfile.age,
        petSize: deletedPetProfile.size,
        petGender: deletedPetProfile.gender,
        petDescription: deletedPetProfile.description,
        petImage: deletedPetProfile.image,
        ownerId: deletedPetProfile.owner,
      };
    },
  },
};

module.exports = resolvers;
