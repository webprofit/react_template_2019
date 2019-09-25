import * as React from 'react';
import BaseComponent from '../../common/base-classes/BaseComponent';
import { IProps } from '../../common/interfaces/main-interfaces';



interface IAdminState {

}

interface IAdminProps extends IProps {
  history: any;
  location: Location;
}



export default class AdminComponent extends BaseComponent<IAdminProps, IAdminState>{

  constructor(props: IAdminProps) {
    super(props);
 
    this.state = {
 
    } as IAdminState
  }

  componentDidMount(){
    this.showLoading(true)
  }



  render() {
    return (
      <div className="admin-container">
        admin page
      </div>
    )
  }
}