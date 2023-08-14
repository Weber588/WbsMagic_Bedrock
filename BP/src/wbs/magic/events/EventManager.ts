import { EntitySpawnAfterEvent, ItemUseBeforeEvent, world } from "@minecraft/server";
import { CastEvent } from "./CastEvent";

export class DuplicateEventRegistrationError extends Error {}

export class EventManager {

    public static readonly USE_INSTANT = "use_instant";

    public static readonly USE_CHARGE_START = "use_charge_start";
    public static readonly USE_CHARGE_STOP = "use_charge_stop";
    public static readonly USE_CHARGE_COMPLETE = "use_charge_complete";

    public static readonly PUNCH_ENTITY = "punch_entity";
    public static readonly PUNCH_BLOCK = "punch_block";

    private constructor() {}

    private static readonly CAST_EVENTS = new Map<string, CastEvent<any>>();

    public static registerDefaultEvents() {
        this.registerEvent(new CastEvent(EventManager.USE_INSTANT, world.beforeEvents.itemUse));
        world.afterEvents.entitySpawn.subscribe((event: EntitySpawnAfterEvent) => {
            if (event.entity.typeId !== "") {
                
            }
        });

        this.registerEvent(new CastEvent(EventManager.USE_CHARGE_START, world.afterEvents.itemStartUse));
        this.registerEvent(new CastEvent(EventManager.USE_CHARGE_STOP, world.afterEvents.itemStopUse));
        this.registerEvent(new CastEvent(EventManager.USE_CHARGE_COMPLETE, world.afterEvents.itemCompleteUse));

        this.registerEvent(new CastEvent(EventManager.PUNCH_ENTITY, world.afterEvents.entityHitEntity));
        this.registerEvent(new CastEvent(EventManager.PUNCH_BLOCK, world.afterEvents.entityHitBlock));
    }

    public static registerEvent(castEvent: CastEvent<any>, key: string = castEvent.id) {
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