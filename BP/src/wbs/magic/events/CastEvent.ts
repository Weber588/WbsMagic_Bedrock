import { Cancellable } from "./Cancellable";
import { TypeUtil } from "../../utils/TypeUtil";

export class CastEvent<T> {
    private readonly subscribeMethod: (event: (event: any) => void) => void;

    constructor(subscribeMethod: (event: (event: T) => void) => void) {
        this.subscribeMethod = subscribeMethod;
    }

    private subscriptions: ((event: T) => void)[] = [];

    public subscribe(consumer: (event: T) => void) {
        this.subscriptions.push(consumer);
    }

    public unsubscribe(consumer: (event: T) => void) {
        const index = this.subscriptions.indexOf(consumer);
        if (index > -1) {
            this.subscriptions.splice(index, 1);
        }
    }

    public register() {
        this.subscribeMethod(this.onEvent);
    }

    protected onEvent(event: T) {
        for (const subscription of this.subscriptions) {
            if (TypeUtil.is<Cancellable>(event, 'cancel') && event.cancel) {
                break;
            }

            subscription(event);
        }
    }
}