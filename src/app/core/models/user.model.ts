import { required, numeric, NumericValueType, minLength, maxLength, prop } from "@rxweb/reactive-form-validators"

export class AccountModel {

    @required()
    username: string;

    @prop({defaultValue: ''})
    @required()
    @minLength({ value: 6 })
    password: string;
}
