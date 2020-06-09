import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { QueryRef, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  private commentsQuery: QueryRef<any>;

  constructor(private apollo: Apollo, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!window.localStorage.token || window.localStorage.token === '') {
      this.router.navigateByUrl('/authentication/signin');
      window.localStorage.removeItem('token');
      return false;
    }

    try {
      const tokenValid: Promise<boolean> = new Promise((resolve, reject) => {
        this.apollo
          .query<{ usersSessions: { expired: boolean } }>({
            query: gql`
              query usersSessions($token: String!) {
                usersSessions(validate: { token: $token }) {
                  expired
                }
              }
            `,
            variables: {
              token: window.localStorage.token,
            },
          })
          .subscribe(
            ({ data }) => {
              if (data.usersSessions.expired === true) {
                console.log('yes');
                reject(false);
              } else {
                resolve(true);
              }
            },
            (error) => {
              reject(false);
            }
          );
      });

      if ((await tokenValid) === true) {
        return true;
      }

      return false;
    } catch (error) {
      this.router.navigateByUrl('/authentication/signin');
      window.localStorage.removeItem('token');
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

@Injectable({
  providedIn: 'root',
})
export class UnAuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (window.localStorage.token) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
