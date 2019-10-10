import * as React from 'react';
import BaseComponent from 'COMMON/base-classes/BaseComponent';
import { IState, IProps } from 'COMMON/interfaces/main-interfaces';

interface ITechState extends IState {
}

export class IEnrollProps extends IProps {
    history: any;
    location: any;
}


export default class MainComponent extends BaseComponent<IEnrollProps, ITechState> {

    constructor(props: IEnrollProps) {
        super(props)
    }

    getInitialState() {
        return {
            showVideo: false,
        } as ITechState;
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.notifyInfo('hello');
    }


    render() {
        return (
            <div>
             User page...
            </div>
        )
    }


}