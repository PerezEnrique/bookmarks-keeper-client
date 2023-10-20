import UserCredentialsModel from "../domain/api-models/user-credentials-model";

export type userCredentialsDto = UserCredentialsModel & {
    passwordConfirm?: string
}