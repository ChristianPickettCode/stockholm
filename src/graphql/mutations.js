/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserKey = /* GraphQL */ `
  mutation CreateUserKey(
    $input: CreateUserKeyInput!
    $condition: ModelUserKeyConditionInput
  ) {
    createUserKey(input: $input, condition: $condition) {
      id
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUserKey = /* GraphQL */ `
  mutation UpdateUserKey(
    $input: UpdateUserKeyInput!
    $condition: ModelUserKeyConditionInput
  ) {
    updateUserKey(input: $input, condition: $condition) {
      id
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUserKey = /* GraphQL */ `
  mutation DeleteUserKey(
    $input: DeleteUserKeyInput!
    $condition: ModelUserKeyConditionInput
  ) {
    deleteUserKey(input: $input, condition: $condition) {
      id
      userID
      createdAt
      updatedAt
      owner
    }
  }
`;
