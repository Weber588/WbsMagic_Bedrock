import { ItemCompleteUseAfterEvent, ItemStartUseAfterEvent, ItemStopUseAfterEvent, world } from "@minecraft/server";
import { LoggingLevel, WbsAddon } from "../utils/WbsAddon";
import { SpellDefinition } from "./spellmanagement/SpellDefinition";
import { SpellThrowBlock } from "./spells/SpellThrowBlock";
import { SpellEldritchBlast } from "./spells/SpellEldritchBlast";
import { ListenerCommand } from "./listeners/ListenerCommand";
import { EventManager } from "./events/EventManager";

export class WbsMagic extends WbsAddon {
    constructor() {super("WbsMagic");}

    public onStart() {
        this.loadSpells();
        this.loadListeners();
        
        EventManager.registerDefaultEvents();

        EventManager.getEvent(EventManager.USE_CHARGE_START).subscribe((event: ItemStartUseAfterEvent) => {
            world.sendMessage("Charge start: " + event.useDuration);
        });
        EventManager.getEvent(EventManager.USE_CHARGE_STOP).subscribe((event: ItemStopUseAfterEvent) => {
            world.sendMessage("Charge stop: " + event.useDuration);
        });
        EventManager.getEvent(EventManager.USE_CHARGE_COMPLETE).subscribe((event: ItemCompleteUseAfterEvent) => {
            world.sendMessage("Charge complete: " + event.useDuration);
        });
        
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