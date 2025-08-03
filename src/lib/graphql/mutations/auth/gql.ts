import { gql } from "@apollo/client";

const LOGIN_USER = gql`
    mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            payload
        }
    }
`;
export default LOGIN_USER;