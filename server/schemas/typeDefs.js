const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Type {
    id: ID!
    name: String!
  }

  type DogWalk {
    date: String
    hour: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    dogs: [PetProfile]
    address: String
    dogWalks: [DogWalk]
  }

  type Walker {
    id: ID!
    username: String!
    email: String!
    password: String!
    location: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    walker: Walker!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PetProfile {
    id: ID!
    petName: String!
    petBreed: String!
    petAge: Int!
    petSize: String!
    petGender: String!
    petDescription: String
    petImage: String
    ownerId: ID! 
  }

  type Appointment {
    id: ID!
    date: String!
    time: String!
    user: User!
    walker: Walker!
    petProfile: PetProfile!
  }

  type Query {
    walkers: [Walker]
    users: [User]
    user(id: ID!): User
    walker(username: String!): Walker
    getPetProfile(petId: ID!): PetProfile
    getPetProfiles: [PetProfile]
    getAllAppointment(id: ID!): Appointment
    getAllAppointments: [Appointment]
    appointments: [Appointment]
  }

  type Mutation {

    addUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    addComment(text: String!): Comment
    removeComment(id: ID!): Comment
    removeUser(id: ID!): User

    addPetProfile(
      petName: String!
      petBreed: String!
      petAge: Int!
      petSize: String!
      petGender: String!

      petDescription: String
      petImage: String
      ownerId: ID!
    ): PetProfile!

    updateUserAddress(id: ID!, address: String!): User
    addDogWalk(id: ID!, date: String!, hour: String!): User
  }
`;

module.exports = typeDefs;
