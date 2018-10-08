import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { createRepository, updateRepository } from '../../graphql/mutations';
import { listProjects } from '../../graphql/queries';

class RepositoryPopup extends Component {
  constructor(props) {
    super(props);

    const { action, repo } = this.props;

    if (action === 'UPDATE') {
      this.state = {
        name: repo.name,
        language: repo.language,
        alert: false
      };
    } else {
      this.state = {
        name: '',
        language: 'java',
        alert: false
      };
    }
  }

  repositoryMutationHandler = (mutation) => {
    const { name, language } = this.state;
    const { action, project } = this.props;
    if (name) {
      this.setState({ alert: false });
      const variables = {
        input: {
          name,
          language
        }
      };
      if (action === 'ADD') {
        variables.input.repositoryProjectId = project.id;
      } else {
        variables.input.id = project.repo.id;
      }
      mutation({ variables });
    } else {
      this.setState({ alert: false });
    }
  }

  close;

  render() {
    const { action, btnClassName, history, project } = this.props;
    const { name, language, alert } = this.state;
    return (
      <div>
        <Popup
          trigger={(
            <button className={btnClassName}>
              {action === 'ADD' ? 'Add Repository' : 'UPDATE'}
            </button>
          )}
          modal
        >
          {(close) => {
            this.close = close;
            return (
              <div className="popup-modal">
                <div className="header">{action === 'ADD' ? 'Create New Repository' : 'UPDATE Repository'}</div>
                <div className="content ml-3 col-9">
                  {alert ? (
                    <span>
                      <label className="h5">Name is required</label>
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
                  <label className="grey-text">Language</label>
                  <select
                    value={language}
                    className="form-control"
                    onChange={event => this.setState({ language: event.target.value })}
                  >
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="c#">C#</option>
                    <option value="c++">C++</option>
                    <option value="go">Go</option>
                    <option value="html/css">HTML/CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="objective-c">Objective-C</option>
                    <option value="perl">Perl</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    <option value="ruby">Ruby</option>
                    <option value="swift">Swift</option>
                  </select>
                  <br />
                  <label className="text-primary">Project: </label>
                  <label className="text-danger ml-sm-3">{project.name}</label>
                </div>
                <div className="actions">
                  <Mutation
                    mutation={action === 'ADD' ? createRepository : updateRepository}
                    refetchQueries={[{ query: listProjects }]}
                    awaitRefetchQueries
                    onCompleted={() => {
                      history.push('/projects');
                      this.close();
                    }}
                  >
                    {postMutation => (
                      <button
                        className="btn ml-2 btn-success"
                        onClick={() => this.repositoryMutationHandler(postMutation)}
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

export default withRouter(RepositoryPopup);
