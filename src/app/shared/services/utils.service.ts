import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  validationMessages: any;

  constructor() {
    this.validationMessages = {
      "internationalization": {
        "dateFormat": "dmy",
        "seperator": "/"
      },
      "validationMessage": {
        "alpha": "Only alphabelts are allowed.",
        "alphaNumeric": "Only alphabet and numbers are allowed.",
        "numeric": "Only numbers are allowed.",
        "compare": "inputs are not matched.",
        "contains": "value is not contains in the input",
        "creditcard": "creditcard number is not correct",
        "digit": "Only digit are allowed",
        "email": "email is not valid",
        "greaterThanEqualTo": "please enter greater than or equal to the joining age",
        "greaterThan": "please enter greater than to the joining age",
        "hexColor": "please enter hex code",
        "json": "please enter valid json",
        "lessThanEqualTo": "please enter less than or equal to the current experience",
        "lessThan": "please enter less than or equal to the current experience",
        "lowerCase": "Only lowercase is allowed",
        "minLength": 'Less than minimum length',
        "maxLength": "More than maximum length",
        "maxNumber": "enter value less than equal to 3",
        "minNumber": "enter value greater than equal to 1",
        "password": "please enter valid password",
        "pattern": "please enter valid zipcode",
        "range": "please enter age between 18 to 60",
        "required": "This field is required",
        "time": "Only time format is allowed",
        "upperCase": "Only uppercase is allowed",
        "url": "Only url format is allowed",
        "zipCode": "enter valid zip code",
      }
    }
  }

}
