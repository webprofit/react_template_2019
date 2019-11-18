import * as React from 'react';
import { IProps } from 'COMMON/entities/basePropsState';
import ListBase, { IListState } from 'COMMON/base-classes/ListBase';
import { BaseEntity } from 'COMMON/entities/BaseEntity';
import { ConfigHelper } from 'UTILS/helpers/ConfigHelper';
import { IListConfig } from 'COMMON/interfaces/IListConfig';

class TestData extends BaseEntity {
    id: number;
    name: string;
}
interface ITechState extends IListState<TestData> {
    // data: TestData[];

}

export class IEnrollProps extends IProps {
    history: any;
    location: any;
}


export default class MainComponent extends ListBase<TestData, IEnrollProps, ITechState> {
   
    constructor(props: IEnrollProps) {
        super(props, ConfigHelper.getDefaultConfig('') as IListConfig)
    }

    getInitialState() {
        return {

        } as ITechState;
    }




    render() {

        return (
            <div>
                User page...
            </div>
        )
    }


}