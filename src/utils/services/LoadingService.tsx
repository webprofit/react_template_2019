
export default class LoadIndicatorService {
    observers: any;

    private static instance: LoadIndicatorService;

    constructor() {
        this.observers = [];
    }

    static getInstance() {
        if (!LoadIndicatorService.instance) {
            LoadIndicatorService.instance = new LoadIndicatorService();
        }
        return LoadIndicatorService.instance;
    }

    subscribe(f:(visible: boolean) => void): void {
        this.observers.push(f)
    }

    notify(status: boolean) {
        this.observers.forEach((observer: any) => observer(status))
    }

}

