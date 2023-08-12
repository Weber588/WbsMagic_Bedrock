import { Entity, Vector, Vector3 } from "@minecraft/server";
import { CastContext } from "../casting/CastContext";
import { CastResult } from "../casting/CastResult";
import { SpellInstance } from "./SpellInstance";
import { WbsMagic } from "../WbsMagic";
import { VectorUtil } from "../../utils/VectorUtil";

export class SpellEldritchBlast extends SpellInstance {

    public cast(context: CastContext): CastResult {
        var caster = context.caster;
        var facing: Vector3 = caster.getViewDirection();

        // TODO: Read speed and stuff from CastContext

        var success = false;
        try {
            var arrow: Entity = caster.dimension.spawnEntity(
                "minecraft:arrow", 
                Vector.add(
                    caster.getHeadLocation(), 
                    VectorUtil.withLength(facing, 0.3)
                )
            );

            if (arrow) {
                arrow.applyImpulse(VectorUtil.withLength(facing, 2));
            }
        } catch(e) {
            WbsMagic.log("Failed to summon entity: " + e + "; " + JSON.stringify(e));
        }
        
        return {success: success};
    }
}