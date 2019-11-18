import * as React from 'react';
import BaseComponent from 'COMMON/base-classes/BaseComponent';
import { IProps } from 'COMMON/entities/basePropsState';
import { ConfigHelper } from 'UTILS/helpers/ConfigHelper';
import { IListConfig } from 'COMMON/interfaces/IListConfig';



interface IAdminState {

}

interface IAdminProps extends IProps {
  history: any;
  location: Location;
}



export default class AdminComponent extends BaseComponent<IAdminProps, IAdminState>{

  constructor(props: IAdminProps) {
    super(props, ConfigHelper.getDefaultConfig('') as IListConfig);

    this.state = {

    } as IAdminState
  }


  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.notifyInfo('hello, this is admin page');
  }


  render() {
    return (
      <div className="admin-container">
        admin page
      </div>
    )
  }
}