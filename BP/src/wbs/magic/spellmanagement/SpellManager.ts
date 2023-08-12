import { SpellDefinition } from "./SpellDefinition";

export class DuplicateSpellNameError extends Error {

}

export class SpellManager {
    private constructor(){}

    private static readonly registeredSpells = new Map<string, SpellDefinition>();

    public static registerSpell(spellDefinition: SpellDefinition) {
        if (this.registeredSpells.has(spellDefinition.id)) {
            throw new DuplicateSpellNameError("Spell name already registered.");
        }

        this.registeredSpells.set(spellDefinition.id, spellDefinition);
    }

    public static getSpell(idOrName: string): SpellDefinition | null {
        idOrName = idOrName.trim();

        var def = this.registeredSpells.get(idOrName);

        if (!def) {
            for (const key in this.registeredSpells.keys()) {
                const check: SpellDefinition = this.registeredSpells.get(key);

                if (check.name.toLowerCase() === idOrName || check.id.toLowerCase() === idOrName) {
                    def = check;
                    break;
                }
            }
        }

        if (def) {
            return def;
        } else {
            return null;
        }
    }
}