


export default interface INotification {
    subscribe(f:(typeError: string, message: string, timeSec: number) => void): number
    unsubscribe(key: number): void;
    notify(typeError: string, message: string, timeSec?: number): void;
}