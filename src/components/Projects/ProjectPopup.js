import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { createProject, updateProject } from '../../graphql/mutations';
import { listProjects } from '../../graphql/queries';

class ProjectPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      key: '',
      owner: 'xohotech',
      description: '',
      alert: false
    };

    const { action, project } = this.props;

    if (action === 'UPDATE') {
      this.state = {
        ...project
      };
    }
  }

  projectMutationHandler = (mutation) => {
    const { name, key, owner, description } = this.state;
    const { action, project } = this.props;
    if (name && key) {
      this.setState({ alert: false });
      const variables = {
        input: { name, key, owner }
      };
      if (description && description.length > 0) {
        variables.input.description = description;
      }
      if (action === 'UPDATE') {
        variables.input.id = project.id;
      }
      mutation({ variables });
    } else {
      this.setState({ alert: true });
    }
  }

  render() {
    const { btnClassName, action, history } = this.props;
    const { name, key, owner, description, alert } = this.state;
    return (
      <div>
        <Popup
          trigger={(
            <button className={btnClassName}>
              { action === 'ADD' ? 'Add Project' : 'Update Project' }
            </button>
          )}
          modal
        >
          {(close) => {
            this.close = close;
            return (
              <div className="popup-modal">
                <div className="header">{action === 'ADD' ? 'Create New Project' : 'Update Project'}</div>
                <div className="content ml-3 col-9">
                  {alert ? (
                    <span>
                      <label className="h5 red ly-2">Name and Key are required</label>
                      <br />
                    </span>
                  ) : null}
                  <label className="grey-text">Name</label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    value={name}
                    className="form-control"
                    maxLength="62"
                    onChange={(event) => { this.setState({ name: event.target.value }); }}
                  />
                  <br />
                  <label className="grey-text">Key</label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    value={key}
                    className="form-control"
                    maxLength="62"
                    onChange={(event) => { this.setState({ key: event.target.value }); }}
                  />
                  <br />
                  <label className="grey-text">Description</label>
                  <input
                    type="text"
                    id="defaultFormRegisterNameEx"
                    value={description}
                    className="form-control"
                    maxLength="62"
                    onChange={(event) => { this.setState({ description: event.target.value }); }}
                  />
                  <br />
                  <label className="grey-text">Owner</label>
                  <select
                    value={owner}
                    className="form-control"
                    onChange={event => this.setState({ owner: event.target.value })}
                  >
                    <option value="xohotech">xohotech</option>
                  </select>
                </div>
                <div className="actions">
                  <Mutation
                    mutation={action === 'ADD' ? createProject : updateProject}
                    refetchQueries={[{ query: listProjects }]}
                    awaitRefetchQueries
                    onCompleted={() => {
                      history.push('/redirect');
                      this.close();
                    }}
                  >
                    {postMutation => (
                      <button
                        className="btn mr-2 btn-success"
                        onClick={() => this.projectMutationHandler(postMutation)}
                      >
                        {action === 'ADD' ? 'Create' : 'Update'}
                      </button>
                    )}
                  </Mutation>
                  <button className="btn btn-info" onClick={() => close()}>
                    Cancel
                  </button>
                </div>
              </div>
            );
          }}
        </Popup>
      </div>);
  }
}

export default withRouter(ProjectPopup);
