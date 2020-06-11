export class signupInputDto {
    readonly tel: string;
    readonly password: string;
}

export class signupOutputDto {
    readonly code: number;
    readonly message: string;
    readonly token: string;
}