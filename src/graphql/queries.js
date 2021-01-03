/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserKey = /* GraphQL */ `
  query GetUserKey($id: ID!) {
    getUserKey(id: $id) {
      id
      userID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listUserKeys = /* GraphQL */ `
  query ListUserKeys(
    $filter: ModelUserKeyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserKeys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      data
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
