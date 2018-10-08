// eslint-disable
// this is an auto generated file. This will be overwritten

import gql from 'graphql-tag';

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
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
export const listProjects = gql`query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getRepository = `query GetRepository($id: ID!) {
  getRepository(id: $id) {
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
export const listRepositorys = `query ListRepositorys(
  $filter: ModelRepositoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listRepositorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
