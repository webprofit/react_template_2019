import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export const LoadIndicator = (show: boolean) => {
    return (
        <div>
            {show ? <div className="load-indicator-screen">
                <div className="load-indicator-body">
                    <LinearProgress variant="query" />
                </div>
            </div> : null}
        </div>
    )
}