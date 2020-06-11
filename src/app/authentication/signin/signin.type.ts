export class signinInputDto {
    readonly account: string;
    readonly password: string;
}

export class signinOutputDto {
    readonly code: number;
    readonly message: string;
    readonly token: string;
}