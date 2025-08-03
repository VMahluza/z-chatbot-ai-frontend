import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      firstName
      lastName
      email
      role
    }
  }
`;

export default ME_QUERY;