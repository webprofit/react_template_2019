import * as React from 'react';
import BaseComponent from 'COMMON/base-classes/BaseComponent';
import { IProps } from 'COMMON/interfaces/main-interfaces';
import NotificationService from 'UTILS/services/NotificationService';



interface IAdminState {

}

interface IAdminProps extends IProps {
  history: any;
  location: Location;
}



export default class AdminComponent extends BaseComponent<IAdminProps, IAdminState>{

  constructor(props: IAdminProps) {
    super(props, { notification: NotificationService.getInstance() });

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