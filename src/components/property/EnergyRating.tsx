import { getTranslations } from "next-intl/server";
import type { EnergyClass } from "@/data/types";
import { cn } from "@/lib/utils";

const classes: EnergyClass[] = ["A", "B", "C", "D", "E", "F", "G"];
const energyColors = ["#2f8f4e", "#59a447", "#a8c63c", "#f2d42e", "#f0a93a", "#e86b2f", "#d23b2a"];
const ghgColors = ["#e9dcf2", "#d6bfe6", "#c2a1d9", "#ab82c9", "#9262b6", "#7a46a0", "#5f2c85"];

function Scale({ label, value, unit, rating, colors }: { label: string; value: number; unit: string; rating: EnergyClass; colors: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      <ul className="space-y-1.5">
        {classes.map((c, i) => {
          const active = c === rating;
          return (
            <li key={c} className="flex items-center gap-3">
              <span
                className={cn("mono flex h-7 items-center px-2 text-xs font-medium text-white transition-all", active ? "shadow-[3px_3px_0_0_var(--color-ink)]" : "opacity-35")}
                style={{ width: `${32 + i * 9}%`, background: colors[i], color: i < 3 && colors === ghgColors ? "#161614" : undefined }}
              >
                {c}
              </span>
              {active && (
                <span className="mono text-sm">
                  {value} <span className="text-[0.66rem] text-mute">{unit}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function EnergyRating({ energy, ghg, energyValue, ghgValue }: { energy: EnergyClass; ghg: EnergyClass; energyValue: number; ghgValue: number }) {
  const t = await getTranslations("property");
  return (
    <div>
      <div className="grid gap-10 sm:grid-cols-2">
        <Scale label={t("energyLabel")} value={energyValue} unit={t("energyUnit")} rating={energy} colors={energyColors} />
        <Scale label={t("ghgLabel")} value={ghgValue} unit={t("ghgUnit")} rating={ghg} colors={ghgColors} />
      </div>
      <p className="mt-6 text-xs leading-relaxed text-mute">{t("energyNote")}</p>
    </div>
  );
}
