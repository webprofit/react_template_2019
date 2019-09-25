import { BaseEntity } from '../entities/BaseEntity';
//import { confirm, alert} from 'COMMON/components/Confirm-alert/Confirm-alert';
import BaseComponent from '../base-classes/BaseComponent';
import { IProps, IState } from '../interfaces/main-interfaces';
import { IListConfig, IEditableListConfig } from '../interfaces/IListConfig';
import DataService from '../data-service/DataService';
import { ConfigHelper } from '../helpers/ConfigHelper';
import { IQueryParams } from '../interfaces/IUrlBuilder';
import { IValidationError } from '../interfaces/IModelState';
import { User } from '../entities/User';

export interface IListState<T extends BaseEntity> extends IState {
    data: T[],
    openFilter: boolean
}

export interface IListProps extends IProps {
    currentUser: User;
    // title: string;

}

export default class ListBase<T extends BaseEntity, P extends IListProps, S extends IListState<T>> extends BaseComponent<P, S> {

    protected svc: DataService<T>;
    protected confirm = confirm;
    protected alert = alert;
    protected skip: number = 0;
    protected take: number = 20;
    protected order: string = 'id desc';
    protected loading: boolean;
    protected lengthData: number = 0;
    protected filterStr: string;
    protected stateItem: any = [];
    protected includes: string;
    protected oDataQuery: string;
    protected validationErrors: IValidationError[];
    //_filter: string;

    constructor(props: any, config: IListConfig) {
        super(props);
        this.svc = new DataService<T>(config);
        this.includes = this.includesBuilder(config.includes);
    }

    getInitialState(): S {

        return { data: [], openFilter: false } as S;
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        //this.getData();
    }

    // handleScroll = () => {
    //     let height_footer = 250;
    //     var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //     if (w < 768) { height_footer = 1000 }

    //     const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    //     const body = document.body,
    //         html = document.documentElement;
    //     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    //     const windowBottom = windowHeight + window.pageYOffset;

    //     if (windowBottom >= docHeight - height_footer && !this.loading && this.state.data) {
    //         if (!(this.lengthData < this.take)) {
    //             this.loadData();
    //         }
    //     }
    // }

    dataLoaded() {
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

    // loadData = () => {
    //     // this.showLoading(true);
    //     this.loading = true;
    //     this.skip += this.take;

    //     let filter: string;

    //     if (this.filterStr) filter = this.filterStr;
    //     if (this._filter) filter = this._filter;
    //     this.svc.query({ filter, skip: this.skip, take: this.take, ordeer: this.order, includes: this.includes } as IQueryParams)
    //         .then((res: T[]) => {
    //             if (res) {
    //                 const _data = this.state.data;
    //                 _data.push(...res);
    //                 this.setState({ data: _data })
    //                 this.loading = false;
    //                 this.lengthData = res.length;
    //                 // this.showLoading(false);
    //             }
    //         })
    //         .catch((err: any) => this.handleError(err));
    // }

    //ToDo: clean up after discussion about oData and material table approaches
    getData = () => new Promise((resolve, reject) => {
        this.svc.query({ filter: this.filterStr, skip: this.skip, take: this.take, order: this.order, includes: this.includes, count: true, oDataQuery: this.oDataQuery } as IQueryParams)
            .then((res: any) => {
                if (res) {
                    this.lengthData = res.length;
                    this.setState({ data: res.items });
                    resolve({
                        data: res.items,
                        page: this.skip / this.take,
                        totalCount: res.count
                    });
                }
                this.dataLoaded();
                // this.showLoading(false);
            })
            .catch((err: any) => { this.handleError(err); reject(err) });
    })

    search() {

    }

    keyDown(e: any, search: boolean = false): void {
        if (e.key == "Enter") {
            if (search) {
                this.search();
            }
            e.preventDefault();
        }
    }
}

export interface IEditableListState<T extends BaseEntity> extends IListState<T> {
    editItemIndex: number;
    newItem: T;
}

export class EditableListBase<T extends BaseEntity, P extends IListProps, S extends IEditableListState<T>> extends ListBase<T, P, S> //implements IValidator<T> 
{
    protected activator: { new(): T; }

    constructor(props: IProps, config: IEditableListConfig<T>) {
        super(props, config)

        this.svc = new DataService(ConfigHelper.getDefaultConfig(config.url));
        this.activator = config.type;
    }

    getInitialState() {
        return {
            data: [],
            editItemIndex: null,
            newItem: this.getDefaultItem(),
        } as S;
    }



    getDefaultItem(): T {
        return new this.activator();
    }

    instantiate = (item: T): T => Object.assign(new this.activator(), item);

    changeValue = (event: any, property: string, index: number, newItem: boolean = false) => {
        if (newItem) {
            const _newItem = this.state.newItem;
            if (property == 'isActive') {
                (_newItem as any)[property] = !(_newItem as any)[property];
            } else {
                (_newItem as any)[property] = event.target.value;
            }
            this.setState({ newItem: _newItem });
        } else {
            const _data: any = this.state.data;
            if (property == 'isActive') {
                _data[index][property] = !(this.state.data[index] as any)[property];
            } else {
                _data[index][property] = event.target.value;
            }
            this.setState({ data: _data });
        }
    }

    update = (item: T, putIdInUrl = true) => new Promise((resolve, reject) => {
        if (!this.validateModel(item)) {
            return;
        }

        let name = this.instantiate(item).getName();

        this.showLoading(true)
        this.svc.update(item, null, putIdInUrl)
            .then((res: any) => {
                const _data = this.state.data;
                const index = _data.findIndex((x: any) => x.id == res.id)
                if (index >= 0) _data[index] = res;
                this.setState({ data: _data, editItemIndex: null });
                this.stateItem = [];
                this.notifySuccess(`${name} updated.`);
                resolve();
                this.showLoading(false);
            })
            .catch(
                (err: any) => {
                    this.handleError(err);
                    reject(err);
                }
            );
    });

    trimAllStrings(obj: T): T {
        return JSON.parse(JSON.stringify(obj).replace(/"\s+|\s+"/g, '"'));
    }

    validateModel(x: T): boolean {
        const errors = this.instantiate(x).validate();

        if (errors && errors.length > 0) {
            this.notifyWarning(errors[0].errorMessage);
            // errors.map(error => {
            //     this.notifyWarning(error.errorMessage);
            // });
        }
        return errors.length == 0;
    }

    getValidationErrors(x: T): IValidationError[] {
        return this.instantiate(x).validate();
    }

    edit = (item: T, index: number) => {
        if (this.stateItem.length > 0) {
            this.cancelEdit(this.stateItem[0])
            this.stateItem = [];
        }
        const _item = Object.assign({}, item)
        this.stateItem.push(_item);
        this.setState({ editItemIndex: index })
    }

    cancelEdit = (item: T) => {
        const copyItem = this.stateItem.find((x: T) => x.id == item.id);
        if (copyItem) {
            const _data = this.state.data
            const index = this.state.data.findIndex((x: T) => x.id == item.id)
            if (index >= 0) {
                _data[index] = copyItem;
                this.stateItem = [];
                this.setState({ data: _data })
            }
        }
        this.setState({ editItemIndex: null })
    }

    create = (): Promise<T> => {
        const _newItem = this.state.newItem;

        if (!this.validateModel(_newItem)) {
            return Promise.resolve<T>(null);
        }

        // this.showLoading(true)
        return new Promise((ok, reject) => {
            this.svc.create(_newItem)
                .then((res: any) => {
                    const _data = this.state.data;
                    _data.unshift(res);
                    this.setState({ data: _data, newItem: this.getDefaultItem() })
                    // this.showLoading(false)
                    this.notifySuccess(`${this.instantiate(res).getName()} created.`);
                    ok();
                })
                .catch((err: any) => {
                    this.handleError(err);
                    return reject(err);
                })
        })
    }

    delete = (item: T, putIdInUrl = true) => new Promise((resolve, reject) => {
        this.svc.deleteItem(item)
            .then(() => {
                this.notifySuccess('Item has been deleted')
                const index = this.state.data.findIndex((x: any) => x.id == item.id);
                if (index >= 0) {
                    const _items = this.state.data;
                    _items.splice(index, 1)
                    this.setState({ data: _items })
                }
                resolve();
            })
            .catch((err: any) => {
                this.handleError(err);
                reject(err);
            });
        //     }
        // })
        // .catch(() => { return })
    });

    cleanCache() {
        this.svc.clearChache();
    }

}
