export default class NotificationService {
    observers: any[];

    private static instance: NotificationService;

    constructor() {
        this.observers = [];
    }

    static getInstance() {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    subscribe(f:(typeError: string, message: string, timeSec: number) => void): number {
        this.observers.push(f);
        return this.observers.length;
    }

    unsubscribe(key: number) {
        this.observers.splice(key-1,1);
    }

    notify(typeError: string, message: string, timeSec: number = 3000) {
        this.observers.forEach((observer: any) => observer(typeError, message, timeSec))
    }

}