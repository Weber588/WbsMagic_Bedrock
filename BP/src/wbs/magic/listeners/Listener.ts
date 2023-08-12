import { World } from "@minecraft/server";
import { WbsMagic } from "../WbsMagic";

export abstract class Listener {
    public readonly addon: WbsMagic;

    constructor(addon: WbsMagic) {
        this.addon = addon;
    }

    public abstract register(world: World);
}