import { gql } from "@apollo/client";

// const data = [
//   { name: "Keshi" },
//   { name: "Conor Maynard" },
//   { name: "Rex Orange County" },
//   { name: "Doja Cat" },
//   { name: "Clairo" },
//   { name: "Ariana Grande" },
// ];

// const artist = gql`
//   query {
//     ${data.map(({ name }, index) => {
//       return (
//         "data" +
//         index +
//         ": " +
//         `
//         artist(name: "${name}") {
//       id
//       name
//       image

//     }
//       `
//       );
//     })}}

// `;

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

export default queryCharacter;
