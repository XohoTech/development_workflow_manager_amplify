import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { deleteProject } from '../../graphql/mutations';
import RepositoryPopup from '../Repository/RepositoryPopup';
import ProjectPopup from './ProjectPopup';
import RepositoryList from '../Repository/RepositoryList';
import { listProjects } from '../../graphql/queries';

class ProjectDetails extends Component {
  constructor(props) {
    super(props);

    const { location } = this.props;

    if (location.state) {
      this.state = {
        project: { ...location.state.project }
      };
    }
  }

  render() {
    const { history } = this.props;

    if (this.state) {
      const { project } = this.state;

      return (
        <div>
          <ProjectPopup btnClassName="float-right btn btn-dark mr-3" action="UPDATE" project={project} />
          <Mutation
            mutation={deleteProject}
            variables={{ input: { id: project.id } }}
            refetchQueries={[{ query: listProjects }]}
            awaitRefetchQueries
            onCompleted={() => history.push('/projects')}
          >
            {deleteMuation => (
              <button
                className="btn btn-dark float-right mr-3"
                onClick={() => deleteMuation()}
              >
                Delete Project
              </button>
            )}
          </Mutation>
          <label className="h4 page-header mb-3">{project.name}</label>
          <br />
          <label className="text-primary">Project Key: </label>
          <label className="text-info ml-sm-3">{project.key}</label>
          <br />
          <label className="text-primary">Owner: </label>
          <label className="text-info ml-sm-3">{project.owner}</label>
          <br />
          <label className="text-primary">Description: </label>
          <label className="text-info ml-sm-3">{project.description}</label>
          <br />
          <label className="h3 mt-2">Repositories</label>
          <RepositoryPopup action="ADD" btnClassName="inline btn-primary repo btn mt-2" project={project} />
          <br />
          {project.repositories.items.length > 0
            ? (
              <span className="container">
                <div className="row">
                  <label className="col-3 h4 ">Name</label>
                  <label className="col-3 h4 ml-sm-3">Language</label>
                </div>
                <RepositoryList project={project} />
              </span>
            ) : null}
        </div>
      );
    }

    history.push('/projects');
    return <div>No Details</div>;
  }
}

export default withRouter(ProjectDetails);
