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

export function queryById(ids) {
  if (ids.length === 0)
    return gql`query{
    
  }`;

  console.log("jalan");
  const query = gql`
    query ($filter: String!) {

      ${ids.map((id) => {
        return (
          id +
          ": " +
          `
          character(id: "${id}") {
            id
            name
            image
            species
          }`
        );
      })}
    }
  `;

  return query;
}

export default queryCharacter;
