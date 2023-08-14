import * as mc from "@minecraft/server";

export enum LoggingLevel {
    LOG,
    INFO,
    WARN,
    ERROR
}

export class InvalidAddonError extends Error {
    
}

export abstract class WbsAddon {
    private _startingTick: number;
    public get startingTick() : number {
        return this._startingTick;
    }

    public readonly name: string;

    public constructor(name: string) {
        if (name.length == 0) {
            throw new InvalidAddonError("Addon name cannot be empty.");
        }
        
        this.name = name;
    }

    public log(message: string, level: LoggingLevel = LoggingLevel.LOG, broadcast: boolean = false) {
        WbsAddon.log(message, level, broadcast);
    }
    
    public static log(message: string, level: LoggingLevel = LoggingLevel.LOG, broadcast: boolean = false) {
        switch (level) {
            case LoggingLevel.LOG:
                console.log(message);
                break;
            case LoggingLevel.INFO:
                console.info(message);
                break;
            case LoggingLevel.WARN:
                console.warn(message);
                break;
            case LoggingLevel.ERROR:
                console.error(message);
                break;
        }

        if (broadcast) {
            mc.world.broadcastClientMessage(this.name, message);
        }
    }

    public start() {
        if (this.startingTick !== undefined) {
            return;
        }

        mc.system.run(() => {
            this.onStart();

            this._startingTick = mc.system.currentTick;
            this.log(`${this.name} started on tick ${this.startingTick}!`, LoggingLevel.INFO);
            this.tick();
        });
    }

    protected tick() {
        this.onTick(mc.system.currentTick);

        try {
            mc.system.run(this.tick.bind(this));
        } catch (e) {
            WbsAddon.log(`Exception while trying to loop on tick ${mc.system.currentTick}: ${e}\n&&\n${JSON.stringify(e)}`, LoggingLevel.ERROR);
        }
    }

    protected abstract onStart();

    protected onTick(tick: number) {

    }
}