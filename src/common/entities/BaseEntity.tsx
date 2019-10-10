import { IEntity } from "COMMON/interfaces/IEntity";
import { IValidationError, IValidationRule, ValidationType } from "COMMON/interfaces/IModelState";


export abstract class BaseEntity implements IEntity {
    id: number;
    name?: string;
    created: Date;
    modified: Date;
    rowVersion: string;

    getName = (): string => this.name ? this.name : 'Item';
    validate(): IValidationError[] {
        return [];
    }    

    validateField(fieldName: string, value: any, rules: IValidationRule[]): IValidationError[] {
        let errors: IValidationError[] = [];

        rules.forEach(rule => {
            switch (rule.validationType) {
                case ValidationType.required:
                    this.logError(errors, this.isEmpty(fieldName, value));
                    break;
                case ValidationType.requiredWithZero:
                    this.logError(errors, this.isNull(fieldName, value));
                    break;
                case ValidationType.email:
                    this.logError(errors, this.isEmail(fieldName, value));
                    break;
                case ValidationType.number:
                    this.logError(errors, this.isNumber(fieldName, value));
                    break;
                case ValidationType.maxLength:
                    this.logError(errors, this.maxLenght(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.minLenght:
                    this.logError(errors, this.minLenght(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.greaterThan:
                    this.logError(errors, this.greater(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.lessThan:
                    this.logError(errors, this.less(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.greaterOrEqual:
                    this.logError(errors, this.greaterOrEqual(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.lessOrEqual:
                    this.logError(errors, this.lessOrEqual(fieldName, value, rule.params[0]));
                    break;
                case ValidationType.inRange:
                    this.logError(errors, this.insideRange(fieldName, value, rule.params[0], rule.params[1]));
                    break;
                case ValidationType.inBetween:
                    this.logError(errors, this.inBetween(fieldName, value, rule.params[0], rule.params[1]));
                    break;
                case ValidationType.custom:
                    this.logError(errors, rule.customValidation(fieldName, value));
                    break;
                case ValidationType.positiveNumber:
                    this.logError(errors, this.isPositiveNumber(fieldName, value));
                    break;
                case ValidationType.noWhiteSpace:
                    this.logError(errors, this.hasWhiteSpace(fieldName, value));
                    break;
                case ValidationType.isInteger:
                    this.logError(errors, this.isInteger(fieldName, value));
                    break;
                case ValidationType.isZipCode:
                    this.logError(errors, this.isZipCode(fieldName, value));
                    break;
                default:
                    break;
            }
        });
        return errors;
    }

    protected logError = (existing: IValidationError[], newError: IValidationError): void => {
        if (newError) {
            existing.push(newError);
        }
    }

    protected logErrors = (existing: IValidationError[], newErrors: IValidationError[]): IValidationError[] => {
        if (newErrors && newErrors.length > 0) {
            return existing.concat(newErrors);
        }
        return existing;
    }

    protected isEmpty(field: string, value: string): IValidationError {
        if (!value) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} cannot be empty.`,
            } as IValidationError;
        }
        return null;
    }

    protected isNull(field: string, value: string): IValidationError {
        if (value == null) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} cannot be empty.`,
            } as IValidationError;
        }
        return null;
    }

    protected isEmail(field: string, value: string): IValidationError {
        if (value && !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            return {
                field: field,
                value: value,
                errorMessage: `${field}: ${value} is not a valid email address.`,
            } as IValidationError;
        }
        return null;
    }

    protected isNumber(field: string, value: string): IValidationError {
        if (!value || isNaN(+value)) {
            return {
                field: field,
                value: value,
                errorMessage: `${field}: '${value}' is not a number.`,
            } as IValidationError;
        }
        return null;
    }

    protected isInteger(field: string, value: string): IValidationError {
        if (!value || !Number.isInteger(+value)) {
            return {
                field: field,
                value: value,
                errorMessage: `${field}: '${value}' should be an integer.`,
            } as IValidationError;
        }
        return null;
    }

    protected hasValue(field: string, value: any): IValidationError {
        if (!value) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} value is missed.`,
            } as IValidationError;
        }
        return null;
    }

    protected minLenght(field: string, value: string, minLengh: number): IValidationError {
        if (!value || value.length < minLengh) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be at least ${minLengh} characters long.`,
            } as IValidationError;
        }
        return null;
    }

    protected maxLenght(field: string, value: string, maxLengh: number): IValidationError {
        if (value && value.length > maxLengh) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} exceeds maximun allowed length - ${maxLengh}.`,
            } as IValidationError;
        }
        return null;
    }

    protected greater(field: string, value: string, minValue: number): IValidationError {
        if (!value || isNaN(+value) || +value <= minValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be greater ${minValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected less(field: string, value: string, maxValue: number): IValidationError {
        if (!value || isNaN(+value) || +value >= maxValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be greater ${maxValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected greaterOrEqual(field: string, value: string, minValue: number): IValidationError {
        if (!value || isNaN(+value) || +value < minValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be greater ${minValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected lessOrEqual(field: string, value: string, maxValue: number): IValidationError {
        if (!value || isNaN(+value) || +value > maxValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be greater ${maxValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected insideRange(field: string, value: string, minValue: number, maxValue: number): IValidationError {
        if (!value || isNaN(+value) || +value > maxValue || +value < minValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be within ${minValue} and ${maxValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected inBetween(field: string, value: string, minValue: number, maxValue: number): IValidationError {
        if (!value || isNaN(+value) || +value >= maxValue || +value <= minValue) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} should be greater than ${minValue} and less than ${maxValue}.`,
            } as IValidationError;
        }
        return null;
    }

    protected isPositiveNumber(field: string, value: any): IValidationError {
        const pnReg = /^[0-9\b]+$/;
        if (!(pnReg.test(value) || value == '')) {
            return {
                field: field,
                value: value,
                errorMessage: `${field} value is incorrect.`,
            } as IValidationError;
        }
        return null;
    }

    protected hasWhiteSpace(field: string, value: any): IValidationError {
        const reg = /^\S*$/;
        if (reg.test(value) || value == '') {
            return {
                field: field,
                value: value,
                errorMessage: `${field} contains white spaces.`,
            } as IValidationError;
        }
        return null;
    }

    protected isZipCode(field: string, value: any): IValidationError {
        const reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/
        if (value && !reg.test(value)) {
            return {
                field: field,
                value: value,
                errorMessage: `${field}: ${value} is not a valid US Zip Code.`,
            } as IValidationError;
        }
        return null;
    }
}




export abstract class BaseEntityUnDeletable extends BaseEntity {
    isActive: boolean;

    constructor() {
        super();
        this.isActive = true;
    }
}

export abstract class BaseStringLookup extends BaseEntityUnDeletable {
    description: string;

    getName = (): string => this.description ? this.description : 'Item';

}

export abstract class BaseAddressUnDeletable extends BaseEntityUnDeletable {
    address: string;
    city: string;
    state: string;
    zip: number;
    phone?: number;
    companyId: string;
}
