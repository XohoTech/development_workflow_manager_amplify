// eslint-disable
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag';

export const onCreateProject = gql`subscription OnCreateProject {
  onCreateProject {
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
        __typename
      }
      nextToken
    }
    __typename
  }
}
`;
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
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
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
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
export const onCreateRepository = `subscription OnCreateRepository {
  onCreateRepository {
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
export const onUpdateRepository = `subscription OnUpdateRepository {
  onUpdateRepository {
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
export const onDeleteRepository = `subscription OnDeleteRepository {
  onDeleteRepository {
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
