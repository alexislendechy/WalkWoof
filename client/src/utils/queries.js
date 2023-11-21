import {gql} from '@apollo/client';

export const GET_PET_PROFILES = gql`
    query getPetProfiles {
        getPetProfiles {
            id
            name: petName  
            breed: petBreed  
            age: petAge  
            size: petSize  
            petGender
            petDescription
            petImage
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
    export const GET_USER = gql`
    query getUser($token: String!) {
      user(token: $token) {
        id
        username
        email
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
        _id
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

