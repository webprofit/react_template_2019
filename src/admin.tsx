
import React from 'react';
import './app.css';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AppAdmin from "./pages/admin/admin-entry-point";


function APP() {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <AppAdmin />
        </MuiPickersUtilsProvider>
    );
}

ReactDOM.render(<APP />, document.getElementById('root'));