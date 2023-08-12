import { CastContext } from "../casting/CastContext";
import { CastResult } from "../casting/CastResult";
import { SpellConfig } from "../spellmanagement/SpellConfig";
import { SpellDefinition } from "../spellmanagement/SpellDefinition";

export abstract class SpellInstance {
    public readonly definition: SpellDefinition;

    constructor(config: SpellConfig) {
        this.definition = config.definition;
    }

    public abstract cast(context: CastContext): CastResult;
}