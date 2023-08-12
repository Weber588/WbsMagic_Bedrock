import { world } from "@minecraft/server";
import { LoggingLevel, WbsAddon } from "../utils/WbsAddon";
import { SpellDefinition } from "./spellmanagement/SpellDefinition";
import { SpellThrowBlock } from "./spells/SpellThrowBlock";
import { SpellEldritchBlast } from "./spells/SpellEldritchBlast";
import { ListenerCommand } from "./listeners/ListenerCommand";

export class WbsMagic extends WbsAddon {
    constructor() {super("WbsMagic");}

    public onStart() {
        this.loadSpells();
        this.loadListeners();

        this.log("WbsMagic loaded!", LoggingLevel.INFO, true);
    }

    loadSpells() {
        var throwBlockDef: SpellDefinition = new SpellDefinition(SpellThrowBlock, "throw_block", "Throw Block");
        var eldritchBlastDef: SpellDefinition = new SpellDefinition(SpellEldritchBlast, "eldritch_blast", "Eldritch Blast");

        SpellDefinition.registerAll(this, 
            throwBlockDef, 
            eldritchBlastDef
        );
    }
    
    loadListeners() {
        new ListenerCommand(this).register(world);
    }
}