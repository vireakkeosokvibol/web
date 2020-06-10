import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token: string = window.localStorage.token;

  constructor(private apollo: Apollo) {}

  signout(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation userSessionsSignout($token: String!) {
          userSessionsSignout(input: { token: $token }) {
            expired
          }
        }
      `,
      variables: {token: window.localStorage.token}
    }).subscribe();
  }

  ngOnInit() {}
}
