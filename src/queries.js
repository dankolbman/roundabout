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
        }
      }
    }
  }
`;
