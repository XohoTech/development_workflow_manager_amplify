import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card, CardBody, CardHeader, Collapse
} from 'reactstrap';
import ProjectPopup from './ProjectPopup';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: -1,
      projects: props.projectList
    };
  }


  componentDidMount() {
    const { subscribeToProjects } = this.props;
    this.subscription = subscribeToProjects();
  }

  componentWillUnmount() {
    this.subscription();
  }

  toggleRepo = (e) => {
    const { event } = e.target.dataset;
    const { collapse } = this.state;
    const collapseIndex = collapse === Number(event) ? -1 : Number(event);
    this.setState({ collapse: collapseIndex });
  };

  subscription;

  render() {
    const { projects, collapse } = this.state;
    const { history } = this.props;
    if (!projects) return <h3>No Projects</h3>;

    return (
      <div className="container">
        <ProjectPopup action="ADD" btnClassName="btn btn-primary float-right mr-3" />
        <label className="h4 page-header mb-3">Projects</label>

        {projects.map((project, index) => (
          <Card
            style={{
              marginBottom: '1rem',
              width: '60%'
            }}
            key={project.id}
          >
            <CardHeader
              onClick={this.toggleRepo}
              data-event={index}
            >
              {project.name}
            </CardHeader>
            <Collapse isOpen={collapse === index}>
              <CardBody>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <label className="text-primary">Key: </label>
                      <label className="text-info ml-sm-3">{project.key}</label>
                      <br />
                      <label className="text-primary">Owner: </label>
                      <label className="text-info ml-sm-3">{project.owner}</label>
                      <br />
                      {project.description && project.description.length > 0
                        ? (
                          <span>
                            <label className="text-primary">Description: </label>
                            <label className="text-info ml-sm-3">{project.description}</label>
                          </span>
                        )
                        : null}
                      {project.repositories.items.length > 0 ? (
                        <span>
                          <br />
                          <label className="text-primary">Repositories: </label>
                          {project.repositories.items.map(repo => (
                            <span key={repo.id}>
                              <br />
                              <label className="text-info ml-sm-3">{repo.name}</label>
                            </span>
                          ))}
                          <br />
                        </span>
                      ) : null}
                      <button
                        className="btn btn-dark float-right"
                        onClick={() => history.push({
                          pathname: '/projectDetails',
                          state: {
                            project: { ...project }
                          }
                        })}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Collapse>
          </Card>))}
      </div>
    );
  }
}

export default withRouter(ProjectList);
