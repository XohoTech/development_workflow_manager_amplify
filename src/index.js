import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// AppSync, Amplify and Apollo libraries
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import * as serviceWorker from './serviceWorker';
import App from './App';

Amplify.configure(awsmobile);

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
