
export default interface ILoadIndicator {
    subscribe(f:(visible: boolean) => void): void
    notify(observer: any): any;
}