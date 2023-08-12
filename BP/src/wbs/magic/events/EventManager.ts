import { ItemUseBeforeEvent, world } from "@minecraft/server";
import { CastEvent } from "./CastEvent";

export class DuplicateEventRegistrationError extends Error {}

export class EventManager {
    private constructor() {}

    private static readonly CAST_EVENTS = new Map<string, CastEvent<any>>();

    public static registerDefaultEvents() {
        this.registerEvent("use_instant", new CastEvent(world.beforeEvents.itemUse.subscribe));

        this.registerEvent("use_charge_start", new CastEvent(world.afterEvents.itemStartUse.subscribe));
        this.registerEvent("use_charge_stop", new CastEvent(world.afterEvents.itemStopUse.subscribe));
        this.registerEvent("use_charge_complete", new CastEvent(world.afterEvents.itemCompleteUse.subscribe));

        this.registerEvent("punch_entity", new CastEvent(world.afterEvents.entityHitEntity.subscribe));
        this.registerEvent("punch_block", new CastEvent(world.afterEvents.entityHitBlock.subscribe));
    }

    public static registerEvent(key: string, castEvent: CastEvent<any>) {
        key = key.toLowerCase();

        if (this.CAST_EVENTS.has(key)) {
            throw new DuplicateEventRegistrationError("CastEvent already registered: " + key);
        }

        this.CAST_EVENTS.set(key, castEvent);
        castEvent.register();
    }

    public static subscribe(key: string, consumer: (event: any) => void) {
        this.getEvent(key)?.subscribe(consumer);
    }

    public static getEvent(key: string): CastEvent<any> | undefined {
        return this.CAST_EVENTS.get(key);
    }

    public static getKeys(): string[] {
        return Array.from(this.CAST_EVENTS.keys());
    }
}