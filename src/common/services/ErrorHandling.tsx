
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

export default class ErrorService {
    private static instance: ErrorService;

    static getInstance() {
        if (!ErrorService.instance) {
            ErrorService.instance = new ErrorService();
        }
        return ErrorService.instance;
    }

    handleError(err: Error | ErrorResponse): string {

        if (err instanceof ErrorResponse) {

            if ((err as ErrorResponse).details) {
                if ((err as ErrorResponse).details.status == 401) {
                    return `Unauthorized. Please sign in.`;
                }
                if ((err as ErrorResponse).details.status === 404) {
                    return `Data not found.`;
                }
                if ((err as ErrorResponse).details.status === 403) {
                    return `Forbidden.`;
                }
                (err as ErrorResponse).details.json()
                    .then((data: ErrorDetails | any) => {

                        if (data.detail) {
                            return `${data.detail}`
                        }
                        // else {
                        //     for (var property in data) {
                        //         if (property == '') {
                        //             this.notifyError('Bad request: invalid data has been submitted.');
                        //             continue;
                        //         }
                        //         if (data.hasOwnProperty(property)) {
                        //             this.notifyError(data[property].join(' '));
                        //         }
                        //     }
                        // }
                    })
                    .catch(err => {
                        return `Server error occured. Please contact system administrator.`;
                    });
            } else {
                return `Failed to process request. Please contact system administrator.`
            }
        } else {
            return `Failed to process request. Please contact system administrator.`
        }
    }
}

  // if (err instanceof ErrorResponse) {

        //     if ((err as ErrorResponse).details) {
        //         if ((err as ErrorResponse).details.status == 401) {                    
        //             this.notifyError(`Unauthorized. Please sign in.`);
        //             return;
        //         }
        //         if ((err as ErrorResponse).details.status === 404) {
        //             this.notifyError(`Data not found.`);
        //             return;
        //         }
        //         if ((err as ErrorResponse).details.status === 403) {
        //             this.notifyError(`Forbidden.`);
        //             return;
        //         }
        //         (err as ErrorResponse).details.json()
        //             .then((data: ErrorDetails | any) => {

        //                 if (this.onError(data)) {
        //                     return;
        //                 }

        //                 if(data.detail){
        //                     this.notifyError(data.detail);
        //                 }
        //                 // else {
        //                 //     for (var property in data) {
        //                 //         if (property == '') {
        //                 //             this.notifyError('Bad request: invalid data has been submitted.');
        //                 //             continue;
        //                 //         }
        //                 //         if (data.hasOwnProperty(property)) {
        //                 //             this.notifyError(data[property].join(' '));
        //                 //         }
        //                 //     }
        //                 // }
        //             })
        //             .catch(err => {
        //                 this.notifyError(`Server error occured. Please contact system administrator.`);
        //             });
        //     } else {
        //         this.notifyError(`Failed to process request. Please contact system administrator.`);
        //     }
        // }
        //  else {
        //     this.notifyError(`Failed to process request. Please contact system administrator.`);
        // }