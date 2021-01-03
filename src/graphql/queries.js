/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserKey = /* GraphQL */ `
  query GetUserKey($userID: String!) {
    getUserKey(userID: $userID) {
      id
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserKeys = /* GraphQL */ `
  query ListUserKeys(
    $userID: String
    $filter: ModelUserKeyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserKeys(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
