import { Entity, Vector3 } from "@minecraft/server";
import { CastContext } from "../casting/CastContext";
import { CastResult } from "../casting/CastResult";
import { SpellInstance } from "./SpellInstance";
import { WbsMagic } from "../WbsMagic";

export class SpellThrowBlock extends SpellInstance {

    public cast(context: CastContext): CastResult {
        var caster = context.caster;

        var facing: Vector3 = caster.getViewDirection();
        
        var success = false;
        try {
            var fallingBlock: Entity = caster.dimension.spawnEntity("minecraft:falling_block", caster.location)

            WbsMagic.log("falling block: " + fallingBlock);
            if (fallingBlock) {
                // do stuff
            }
        } catch(e) {
            WbsMagic.log("Failed to create falling block: " + e + "; " + JSON.stringify(e));
        }
        
        return {success: success};
    }
}