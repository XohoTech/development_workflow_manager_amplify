import React from 'react';
import { Query } from 'react-apollo';
import ProjectList from '../../components/Projects/ProjectList';
import { listProjects } from '../../graphql/queries';
import { onCreateProject } from '../../graphql/subscriptions';

const Projects = () => (
  <div>
    <Query query={listProjects}>
      {({ refetch, subscribeToMore, ...result }) => (result.loading
        ? <p className="mb-5">Loading...</p>
        : result.error ? <p className="mb-5">Error fetching data, Check your network connection</p>
          : (
            <ProjectList
              projectList={result.data.listProjects.items}
              subscribeToProjects={() => subscribeToMore({
                document: onCreateProject,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  const newProject = subscriptionData.data.onCreateProject;
                  return {
                    ...prev,
                    listProjects: {
                      ...prev.listProjects,
                      items: [
                        newProject,
                        ...prev.listProjects.items

                      ]
                    }
                  };
                }
              })
              }
            />
          )
      )
      }
    </Query>
  </div>
);


export default Projects;
