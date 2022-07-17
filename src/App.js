import Navbar from "./components/Navbar";
import Artist from "./pages/Artist";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://rickandmortyapi.com/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({});

  return forward(operation);
});

const App = () => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
  });

  // const client = new ApolloClient({
  //   link: link,
  //   cache: new InMemoryCache(),
  // });

  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Artist />
    </ApolloProvider>
  );
};

export default App;
