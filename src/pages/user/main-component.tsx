import * as React from 'react';
import BaseComponent from '../../common/base-classes/BaseComponent';
import { IState, IProps } from '../../common/interfaces/main-interfaces';

import videoTruTech from '../../video.mp4';


interface ITechState extends IState {
    showVideo: boolean;
}



export class IEnrollProps extends IProps {
    history: any;
    location: any;
}


export default class MainComponent extends BaseComponent<IEnrollProps, ITechState> {

    constructor(props: IEnrollProps) {
        super(props)
    }
    video: any;

    getInitialState() {
        return {
            showVideo: false,
        } as ITechState;
    }

    componentDidMount() {
        this.getData();

        this.playVideo();
    }
    componentWillUnmount() {
        this.video.removeEventListener('canplay', () => {}, false);
        this.video.removeEventListener('ended', () => {}, false);
    }

    playVideo = () => {
        if (this.video) {
            this.video.addEventListener("canplay", () => {
                this.setState({ showVideo: true })
                this.video.play();
            });
            this.video.addEventListener("ended", () => {
                this.setState({ showVideo: false })
            });
        }
    }

    getData = () => {
        this.notifyInfo('hello');
        // setTimeout(() => { this.showLoading(true); }, 0);
        // setTimeout(() => { this.showLoading(false); }, 3000);
    }


    render() {
        return (
            <div>
                <div className={`video-element ${this.state.showVideo ? 'show-video' : ''}`}>
                    <video
                        width="100%"
                        height="100%"
                        ref={(refVideo: any) => this.video = refVideo}
                        src={videoTruTech}
                    />
                </div>
            </div>
        )
    }


}