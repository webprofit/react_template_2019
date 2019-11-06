import { BaseEntity } from 'COMMON/entities/BaseEntity';
import BaseComponent from 'COMMON/base-classes/BaseComponent';
import { IState, IProps } from 'COMMON/interfaces/main-interfaces';
import { IDetailsConfig } from 'COMMON/interfaces/IDetailsConfig';
import DataService from 'COMMON/data-service/DataService';
import { ISelectParams } from 'COMMON/interfaces/IUrlBuilder';
import NotificationService from 'UTILS/services/NotificationService';

export interface IDetailsState<T extends BaseEntity> extends IState {
    data: T | T[];
    //modelState?: IModelState;
}

export interface IDetailsProps extends IProps {
}

export default class DetailsBase<T extends BaseEntity, P extends IDetailsProps, S extends IDetailsState<T>> extends BaseComponent<P, S> //implements IValidator<T>
{
    protected svc: DataService<T>;
    protected id: number;
    protected urlSufix: string;
    protected confirm = confirm;
    protected activator: { new(): T; }
    protected includes: string;
    protected dateNow = new Date().toLocaleDateString();

    constructor(props: any, config?: IDetailsConfig<T>) {
        super(props, config)

        if (config) {
            this.svc = new DataService(config);
            this.urlSufix = config.urlSufix;
            this.id = config.id;
            this.activator = config.type;
            this.includes = this.includesBuilder(config.includes);
        }
    }

    includesBuilder = (includes: string[]): string => {
        let _includes: string = '';
        if (includes) {
            includes.map((param: string, index) => {
                _includes += `${param}${includes.length == index + 1 ? '' : ';'}`
            })
        }
        return _includes;
    }

 

    getInitialState(): S {
        return { data: {} } as S;
    }

    componentDidMount() {
        this.getData();
    }

    dataLoaded() {
    }

    getData = (): Promise<T | T[]> => {
        if (this.id > 0) {
            return new Promise((resolve: any) => {
                // this.showLoading(true);
                // if (this.appl) {
                //     this.svc.query(`applicationId=${this.appl}`)
                //         .then((res: T[]) => {
                //             if(Object.prototype.toString.call(this.state.data) !== "[object Array]" && Object.prototype.toString.call(res) === "[object Array]")
                //                 this.setState({ data: res[0] });
                //             else
                //                 this.setState({ data: res });
                //             this.showLoading(false);
                //             this.dataLoaded();
                //             return resolve(res)
                //         });
                // } else {
                    this.svc.select({id: this.id, urlSuffix: this.urlSufix, includes: this.includes} as ISelectParams)
                        .then((res: T) => {
                            this.setState({ data: res }, this.dataLoaded)
                            // this.showLoading(false);
                            return resolve(res)
                        })
                        .catch((err: any) => this.handleError(err));
                //}
            });
        } else {
            this.dataLoaded();
            return Promise.resolve(this.state.data);
        }
    }

    dataSaved() { }

    save = (item: T): Promise<T> => {
        if (this.validateModel(item)) {
            // this.showLoading(true);
            return new Promise((resolve, reject) => {
                // if (item.id) {
                //     this.svc.update(item)
                //         .then((res: T) => {
                //             this.setState({ data: res }, this.dataSaved);
                //             this.notificationSvc.notify(false, `Data was updated successfully`);
                //             this.showLoading(false);
                //             resolve(res);
                //         })
                //         .catch(err => {
                //             this.handleError(err);
                //             reject(err);
                //         });
                // } else {
                    this.svc.create(item)
                        .then((res: T) => {
                            this.setState({ data: res }, this.dataSaved);
                            this.notifyError('Saved successfully');
                            // this.showLoading(false);
                            resolve(res)
                        })
                        .catch(err => {
                            this.handleError(err);
                            reject(err);
                        });
                //}
            })
        } else {
            return Promise.resolve<T>(null);
        }
    }

    instantiate = (item: T): T => Object.assign(new this.activator(), item);

    validateModel = (x: T): boolean => {
        // const errors: IValidationError[] = this.instantiate(x).validate();
        // const _modelState: IModelState = { isValid: !errors || errors.length == 0, errors: errors };

        // if (!_modelState.isValid && _modelState.errors) {
        //     _modelState.errors.map(error => {
        //         this.notifyError(error.errorMessage);
        //     });
        // }

        // this.setState({ modelState: _modelState });
        // return _modelState.isValid;
        return true;
    }
    

    formatedDate = (inDate: Date): string | Date => {
        if (inDate) {
            inDate = new Date(inDate);
            return `${inDate.getMonth() + 1}/${inDate.getDate()}/${inDate.getFullYear()}`;
        } else {
            return new Date();
        }
    }
   
}