import ApolloClient from 'apollo-boost';

console.log(process.env.REACT_APP_API);
const client = new ApolloClient({
  uri: process.env.REACT_APP_API,
});

export default client;
