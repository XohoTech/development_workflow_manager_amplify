import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { deleteRepository } from '../../graphql/mutations';
import RepositoryPopup from './RepositoryPopup';
import { listProjects } from '../../graphql/queries';

const RepositoryList = props => props.project.repositories.items.map(repo => (
  <div key={repo.id} className="row my-2">
    <label htmlFor="defaultFormRegisterEmailEx" className="col-3 text-primary ">{repo.name}</label>
    {repo.language
      ? <label htmlFor="defaultFormRegisterEmailEx" className="col-3 text-primary ml-sm-3">{repo.language.charAt(0).toUpperCase().concat(repo.language.substring(1, repo.language.length))}</label>
      : null
    }
    <span className="col">
      <RepositoryPopup btnClassName="float-right btn-dark btn" action="UPDATE" repo={repo} project={props.project} />
      <Mutation
        mutation={deleteRepository}
        variables={{ input: { id: repo.id } }}
        refetchQueries={[{ query: listProjects }]}
        awaitRefetchQueries
        onCompleted={() => this.props.history.push('/projects')}
      >
        {deleteMuation => (
          <button
            className="btn btn-dark float-right mr-3"
            onClick={deleteMuation}
          >
            Delete
          </button>
        )}
      </Mutation>
    </span>
    <hr />
  </div>
));

export default withRouter(RepositoryList);
