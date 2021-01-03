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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      data
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      data
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      data
      owner
      createdAt
      updatedAt
    }
  }
`;
