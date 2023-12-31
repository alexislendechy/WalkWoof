import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      token
      user {
        id
        username
        role
      }
    }
  }
`;
export const UPDATE_USER_ADDRESS = gql`
  mutation updateUserAddress($id: ID!, $address: String!) {
    updateUserAddress(id: $id, address: $address) {
      id
      address
    }
  }
`;

export const ADD_OWNER_PROFILE = gql`
  mutation addOwnerProfile(
    $ownerName: String!
    $ownerEmail: String!
    $ownerPhone: String!
    $ownerAddress: String!
    $ownerCity: String!
    $ownerState: String!
    $ownerZip: String!
    $ownerCountry: String!
    $ownerWebsite: String!
    $ownerDescription: String!
    $ownerImage: String!
  ) {
    addOwnerProfile(
      ownerName: $ownerName
      ownerEmail: $ownerEmail
      ownerPhone: $ownerPhone
      ownerAddress: $ownerAddress
      ownerCity: $ownerCity
      ownerState: $ownerState
      ownerZip: $ownerZip
      ownerCountry: $ownerCountry
      ownerWebsite: $ownerWebsite
      ownerDescription: $ownerDescription
      ownerImage: $ownerImage
    ) {
      _id
      ownerName
      ownerEmail
      ownerPhone
      ownerAddress
      ownerCity
      ownerState
      ownerZip
      ownerCountry
      ownerWebsite
      ownerDescription
      ownerImage
    }
  }
`;

export const ADD_PET_PROFILE = gql`
  mutation AddPetProfile(
    $petName: String!
    $petBreed: String!
    $petAge: Int!
    $petSize: String!
    $ownerId: ID!
    $petGender: String!
    $petImage: String
    $petDescription: String
  ) {
    addPetProfile(
      petName: $petName
      petBreed: $petBreed
      petAge: $petAge
      petSize: $petSize
      ownerId: $ownerId
      petGender: $petGender
      petImage: $petImage
      petDescription: $petDescription
    ) {
      id
      petName
      petBreed
      petAge
      petSize
      ownerId
      petGender
      petImage
      petDescription
    }
  }
`;

export const ADD_WALKER_PROFILE = gql`
  mutation addWalkerProfile(
    $walkerName: String!
    $walkerEmail: String!
    $walkerPhone: String!
    $walkerAddress: String!
    $walkerCity: String!
    $walkerState: String!
    $walkerZip: String!
    $walkerCountry: String!
    $walkerWebsite: String!
    $walkerDescription: String!
    $walkerImage: String!
  ) {
    addWalkerProfile(
      walkerName: $walkerName
      walkerEmail: $walkerEmail
      walkerPhone: $walkerPhone
      walkerAddress: $walkerAddress
      walkerCity: $walkerCity
      walkerState: $walkerState
      walkerZip: $walkerZip
      walkerCountry: $walkerCountry
      walkerWebsite: $walkerWebsite
      walkerDescription: $walkerDescription
      walkerImage: $walkerImage
    ) {
      id
      walkerName
      walkerEmail
      walkerPhone
      walkerAddress
      walkerCity
      walkerState
      walkerZip
      walkerCountry
      walkerWebsite
      walkerDescription
      walkerImage
    }
  }
`;

export const ADD_DOG_WALK = gql`
  mutation addDogWalk($id: ID!, $date: String!, $hour: String!) {
    addDogWalk(id: $id, date: $date, hour: $hour) {
      id
      dogWalks {
        date
        hour
      }
    }
  }
`;


export const DELETE_PET = gql`
  mutation DeletePet($petId: ID!) {
    deletePetProfile(petId: $petId) {
      id
      petName
      petBreed
      petAge
      petSize
    }
  }
`;