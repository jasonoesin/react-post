import Navbar from "./components/Navbar";
import Character from "./pages/Character";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { FavContext } from "./localStorage/useFav";
import { Routes, Route } from "react-router-dom";
import FavoritePage from "./pages/FavoritePage";
import Detail from "./pages/Detail";

const httpLink = new HttpLink({ uri: "https://rickandmortyapi.com/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({});

  return forward(operation);
});

const App = () => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <FavContext>
        <div className="flex justify-center">
          <div className="max-w-[393px] w-full">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Character />} />
              <Route path="/favorite" element={<FavoritePage />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Routes>
          </div>
        </div>
      </FavContext>
    </ApolloProvider>
  );
};

export default App;
