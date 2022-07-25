import { gql } from "@apollo/client";

export const queryCharacter = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

export const queryByName = gql`
  query ($filter: String!) {
    characters(page: 1, filter: { name: $filter }) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

export function queryById(id) {
  const query = gql`
  query{
    character(id: "${id}") {
      id
      name
      image
      species
      gender
      location{
        name
      }
      episode{
        name
        episode
      }
      status
    }
  }
`;

  return query;
}

export default queryCharacter;
