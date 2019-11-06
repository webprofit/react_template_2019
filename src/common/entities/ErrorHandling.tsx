
export class ErrorResponse extends Error {
    message: string;
    details: Response;
    constructor(message: string, details: Response) {
        super(message)
        this.message = message;
        this.details = details;
    }
}

export class ErrorDetails {
    ErrorCode: number;
    Fields: string[];
    Message: string;
    Type: string;
    Value: string;
}
