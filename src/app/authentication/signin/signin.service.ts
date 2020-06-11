import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { signinOutputDto } from './signin.type';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private apollo: Apollo) { }

  async signin(usersInput: { account: string, password: string }): Promise<void> {

    this.apollo.mutate<{usersSignin: signinOutputDto}>({
      mutation: gql`
        mutation usersSignin($account: String!, $password: String!) {
          usersSignin(input: {
            account: $account,
            password: $password
          }) {
            code
          }
        }
      `,
      variables: {
        account: usersInput.account,
        password: usersInput.password,
      }
    }).subscribe(({data}) => {
      console.log(data.usersSignin.code)
    }, (error) => {
      console.log(error)
    })

  }

}
