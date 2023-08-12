import { ChatSendAfterEvent, Player, World } from "@minecraft/server";
import { Listener } from "./Listener";
import { CastContext } from "../casting/CastContext";
import { SpellConfig } from "../spellmanagement/SpellConfig";
import { SpellManager } from "../spellmanagement/SpellManager";

export class ListenerCommand extends Listener {
    private static readonly COMMAND_PREFIX = "mag cast";

    public register(world: World) {
        world.afterEvents.chatSend.subscribe(this.onChat);
    }

    private onChat(event: ChatSendAfterEvent) {
        var sender: Player = event.sender; 
        var message: string = event.message.trim();

        if (message.toLowerCase().startsWith(ListenerCommand.COMMAND_PREFIX)) {
            var spellArg = message.substring(ListenerCommand.COMMAND_PREFIX.length).trim();
            if (spellArg.length < 2) {
            } else {
                var spellDef = SpellManager.getSpell(spellArg);
                if (!spellDef) {
                    sender.sendMessage("Spell not found: " + spellArg);
                } else {
                    var config = new SpellConfig(spellDef);
                    var spellInstance = spellDef.buildSpell(config);
                    if (spellInstance) {
                        sender.sendMessage(`Casting ${spellInstance}!`);
                        spellInstance.cast(new CastContext(sender));
                    } else {
                        sender.sendMessage(`Spell instance failed to populate from ${config}!`);
                    }
                }
            }
        }
    }

}