import { Entity } from "@minecraft/server";

export class CastContext {
    public readonly caster: Entity;

    constructor(caster: Entity) {
        this.caster = caster;
    }
}