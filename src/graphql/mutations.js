// eslint-disable
// this is an auto generated file. This will be overwritten

import gql from 'graphql-tag';

export const createProject = gql`mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    key
    owner
    description
    url
    repositories {
      items {
        id
        name
        language
        url
      }
      nextToken
    }
  }
}
`;
export const updateProject = gql`mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    name
    key
    owner
    description
    url
    repositories {
      items {
        id
        name
        language
        url
      }
      nextToken
    }
  }
}
`;
export const deleteProject = gql`mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    name
    key
    owner
    description
    url
    repositories {
      items {
        id
        name
        language
        url
      }
      nextToken
    }
  }
}
`;

export const createRepository = gql`mutation CreateRepository($input: CreateRepositoryInput!) {
  createRepository(input: $input) {
    id
    name
    project {
      id
      name
      key
      owner
      description
      url
    }
    language
    url
  }
}
`;
export const updateRepository = gql`mutation UpdateRepository($input: UpdateRepositoryInput!) {
  updateRepository(input: $input) {
    id
    name
    project {
      id
      name
      key
      owner
      description
      url
    }
    language
    url
  }
}
`;
export const deleteRepository = gql`mutation DeleteRepository($input: DeleteRepositoryInput!) {
  deleteRepository(input: $input) {
    id
    name
    project {
      id
      name
      key
      owner
      description
      url
    }
    language
    url
  }
}
`;
