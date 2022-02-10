import { required, compare, minLength } from "@rxweb/reactive-form-validators"

export class PasswordModel {

    @required()
    @minLength({ value: 6 })
    currentPassword: string;

    @required()
    @minLength({ value: 6 })
    newPassword: string;

    @required()
    @compare({ fieldName: 'newPassword' })
    confirmNewPassword: string;
}
