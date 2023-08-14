import { Cancellable } from "./Cancellable";
import { TypeUtil } from "../../utils/TypeUtil";
import { EventSignal } from "./EventSignal";

export class CastEvent<T> {
    private readonly eventSignal: EventSignal<T>;
    public readonly id: string;

    constructor(id: string, eventSignal: EventSignal<T>) {
        this.id = id;
        this.eventSignal = eventSignal;
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
        this.eventSignal.subscribe((event: T) => {
            for (const subscription of this.subscriptions) {
                if (TypeUtil.is<Cancellable>(event, 'cancel') && event.cancel) {
                    break;
                }

                subscription(event);
            }
        });
    }
}