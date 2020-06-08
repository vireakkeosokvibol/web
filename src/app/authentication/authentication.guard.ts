import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { QueryRef, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  private commentsQuery: QueryRef<any>;

  constructor(private apollo: Apollo, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!window.localStorage.token || window.localStorage.token === '') {
      this.router.navigate(['/authentication/signup']);
      return false;
    }

    try {
      const {
        data,
      }: { data: { session: { expired: boolean } } } = await this.apollo
        .query<{ session: { expired: boolean } }>({
          query: gql`
            query session($id: String!) {
              session(token: { id: $id }) {
                expired
              }
            }
          `,
          variables: {
            id: window.localStorage.token,
          },
        })
        .toPromise();

      console.log(data.session.expired);
    } catch (error) {
      throw new Error(error);
    }

    // this.commentsQuery.subscribeToMore({
    //   document: gql`
    //     subscription subscriptionData($id: String!) {
    //       subscriptionData(token: { id: $id }) {
    //         expired
    //       }
    //     }
    //   `,
    //   variables: {
    //     id: window.localStorage.token,
    //   },
    //   updateQuery: (prev, { subscriptionData }) => {
    //     if (!subscriptionData) {
    //       return prev;
    //     }

    //     const newFeedItem = subscriptionData.data.subscriptionData;

    //     return {
    //       ...prev,
    //       entry: {
    //         comments: [newFeedItem, ...prev.entry.comments],
    //       },
    //     };
    //   },
    // });
  }
}
