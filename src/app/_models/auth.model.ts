export interface LoginCredentialsModel{
    username:string,
    password:string
}

export interface SignupDataModel{
    name:string
    username:string
    mobile:string
    password:string
    retypepassword:string
}

export interface LoginAndSignupResponseModel{
    message:string,
    statusCode:number,
    token?:{token:string,expiresIn:number},
}