import { gql } from "@apollo/client";

export const GET_PET_PROFILES = gql`
  query getPetProfiles {
    getPetProfiles {
      id
      petName
      petBreed
      petAge
      petSize
      petGender
      petDescription
      petImage
    }
  }
`;
export const YOUR_DOG_WALKS_QUERY = gql`
  query DogWalks {
    dogWalks {
      username
      dogName
      address
      walkDuration
    }
  }
`;

export const GET_USER_WITH_DOGS = gql`
  query GetUserWithDogs($id: ID!) {
    user(id: $id) {
      id
      username
      email
      dogs {
        id
        name: petName
        breed: petBreed
        petAge
        petSize
      }
    }
  }
`;

export const GET_WALKER_PROFILES = gql`
  query getWalkerProfiles {
    walkerProfiles {
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

export const GET_OWNER_PROFILES = gql`
  query getOwnerProfiles {
    ownerProfiles {
      id
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

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      role
      address
      imageUrl
      dogs {
        id
        petName
        petBreed
        petAge
        petSize
        petImage
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($petId: ID!) {
    checkout(petId: $petId) {
      session
    }
  }
`;

export const QUERY_WALKERS = gql`
  query getWalkers($city: String) {
    walkers(city: $city) {
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

// export const GET_ALL_APPOINTMENTS = gql`
// query getAllAppointments {
//     appointments {
//     id
//     date
//     time
//     user
//     walker
//     petProfile
//     }
// }

// `;
export const GET_ALL_APPOINTMENTS = gql`
  query getAllAppointments {
    getAllAppointments {
      id
      date
      time
      user {
        id
        username # Assuming your User type has a username field
      }
      petProfile {
        id
        petName # Assuming your PetProfile type has a petName field
      }
    }
  }
`;
