import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Import default App config
import { HTTP_URI, SOCKET_URI } from 'src/config.json';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

// Load balancing graphql endpoint with random array length of uri.
const httpUri: string = HTTP_URI[Math.floor(Math.random() * HTTP_URI.length)];
const socketUri: string = SOCKET_URI[Math.floor(Math.random() * SOCKET_URI.length)];

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: httpUri,
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: socketUri,
      options: {
        reconnect: true,
      },
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ws,
      http
    );

    this.apollo.create({
      link,
      cache: new InMemoryCache(),
    });
  }
}
