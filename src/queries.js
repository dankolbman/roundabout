import {gql} from 'apollo-boost';

export const TRIPS = gql`
  query Trips {
    trips {
      edges {
        node {
          id
          name
          createdAt
          description
          icon
          order
        }
      }
    }
  }
`;

export const TRIP = gql`
  query Trip($tripId: ID!) {
    trip(id: $tripId) {
      id
      name
      createdAt
      description
      geoJSON {
        type
        geometry {
          type
          coordinates
        }
      }
      distance {
        time
        value
      }
    }
  }
`;
