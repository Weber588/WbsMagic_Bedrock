import { SpellInstance } from "../spells/SpellInstance";
import { WbsMagic } from "../WbsMagic";
import { SpellConfig } from "./SpellConfig";
import { SpellManager } from "./SpellManager";

export class SpellDefinition {

    public static registerAll(addon: WbsMagic, ...definitions: SpellDefinition[]) {
        definitions.forEach(def => {
            def.register(addon);
        });
    }

    public readonly id: string;
    public readonly name: string;
    private readonly builder: new (config: SpellConfig) => SpellInstance;

    constructor(builder: new (config: SpellConfig) => SpellInstance, id: string, name: string) {
        this.builder = builder;
        this.id = id;
        this.name = name;
    }

    public buildSpell(config: SpellConfig): SpellInstance {
        return new this.builder(config);
    };
    
    public register(addon?: WbsMagic) {
        var loaded: boolean = false;
        try {
            SpellManager.registerSpell(this);
            loaded = true;
        } catch (e) {
            addon?.log(`Failed to load spell ${this.name}: ${e}`);
        }

        if (loaded) {
            addon?.log(`Loaded spell ${this.name} (${this.id})!`);
        }
    }
}