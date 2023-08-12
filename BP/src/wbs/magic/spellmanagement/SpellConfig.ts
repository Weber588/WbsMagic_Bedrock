import { SpellDefinition } from "./SpellDefinition";

export class SpellConfig {
    public readonly definition: SpellDefinition;

    public get name() {
        return this.definition.name;
    }

    constructor(definition: SpellDefinition) {
        this.definition = definition;
    }
}