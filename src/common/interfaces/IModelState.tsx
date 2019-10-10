import { IEntity } from "COMMON/interfaces/IEntity";

export interface IModelState {
    isValid: boolean;
    errors: IValidationError[];
}

export interface IValidationError {
    field: string;
    value: any;
    errorMessage: string;
}

export interface IValidationRule {
    validationType: ValidationType;
    params: any[];
    customValidation: (field: string, value: any) => IValidationError;
}

export enum ValidationType {
    required,
    requiredWithZero,
    email,
    number,
    minLenght,
    maxLength,
    positiveNumber,
    noWhiteSpace,
    custom,
    greaterThan,
    lessThan,
    greaterOrEqual,
    lessOrEqual,
    inRange,
    inBetween,
    isInteger,
    isZipCode
}

export interface IValidatable<T extends IEntity> {
    validate(entity: T):IValidationError[];

    validateField(field: string, value: any, rules: IValidationRule[]):IValidationError[];    
}

export interface IValidator<T extends IEntity> {
    validateModel(x: T):boolean;
}