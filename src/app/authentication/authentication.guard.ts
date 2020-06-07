import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { QueryRef, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  private commentsQuery: QueryRef<any>;
  comments: Observable<any>;

  constructor(private apollo: Apollo) {
    this.commentsQuery = apollo.watchQuery({
      query: gql`
        query {
          addData {
            expired
          }
        }
      `,
      variables: {
        repoName: 'test',
      },
    });

    this.comments = this.commentsQuery.valueChanges; // async results
  }

  async canActivate(): Promise<boolean> {
    this.commentsQuery.subscribeToMore({
      document: gql`
        subscription subscriptionData($id: String!) {
          subscriptionData(token: { id: $id }) {
            expired
          }
        }
      `,
      variables: {
        id: window.localStorage.token,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const newFeedItem = subscriptionData.data.commentAdded;

        return {
          ...prev,
          entry: {
            comments: [newFeedItem, ...prev.entry.comments],
          },
        };
      },
    });

    return false;
  }
}
