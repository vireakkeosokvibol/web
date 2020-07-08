import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/app.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token: string = window.localStorage.token;

  constructor(private apollo: Apollo, private store: Store<AppState>) {}

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

  ngOnInit() {
    this.store.dispatch(new AppStore({data: 'something'}));
    console.log(this.store)
  }
}
