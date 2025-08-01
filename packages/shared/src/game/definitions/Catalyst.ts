import { numberToRoman } from "../../utils/Helper";
import { L, t } from "../../utils/i18n";
import { Config } from "../Config";
import type { Multipliers } from "../logic/IMultiplier";
import type { Building } from "./Buildings";
import { CodeNumber } from "./CodeNumber";

export interface ICatalystDefinition {
   trait: () => string;
   filter: (b: Building) => boolean;
   amount: number;
   multipliers: Multipliers;
}

export const Catalyst = {
   A1: {
      trait: () => t(L.AC),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.AC,
      amount: 3,
      multipliers: {
         damage: 1,
      },
   },
   A2: {
      trait: () => t(L.AC),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.AC,
      amount: 3,
      multipliers: {
         hp: 1,
      },
   },
   A3: {
      trait: () => t(L.MS),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.MS,
      amount: 3,
      multipliers: {
         damage: 1,
      },
   },
   A4: {
      trait: () => t(L.MS),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.MS,
      amount: 3,
      multipliers: {
         hp: 1,
      },
   },
   A5: {
      trait: () => t(L.XClassWeapon, t(L.TechSkiff)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Skiff",
      amount: 6,
      multipliers: {
         damage: 2,
      },
   },
   A6: {
      trait: () => t(L.XClassWeapon, t(L.TechSkiff)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Skiff",
      amount: 6,
      multipliers: {
         hp: 2,
      },
   },
   A7: {
      trait: () => t(L.XClassWeapon, t(L.TechSkiff)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Skiff",
      amount: 6,
      multipliers: {
         hp: 1,
         damage: 1,
      },
   },
   B1: {
      trait: () => t(L.XClassWeapon, t(L.TechScout)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Scout",
      amount: 6,
      multipliers: {
         hp: 1,
         damage: 1,
      },
   },
   B2: {
      trait: () => t(L.XClassWeapon, t(L.TechScout)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Scout",
      amount: 6,
      multipliers: {
         hp: 2,
      },
   },
   B3: {
      trait: () => t(L.XClassWeapon, t(L.TechScout)),
      filter: (b: Building) => Config.BuildingToShipClass[b] === "Scout",
      amount: 6,
      multipliers: {
         damage: 2,
      },
   },
   B4: {
      trait: () => t(L.MS),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.MS,
      amount: 6,
      multipliers: {
         damage: 2,
      },
   },
   B5: {
      trait: () => t(L.MS),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.MS,
      amount: 6,
      multipliers: {
         hp: 2,
      },
   },
   B6: {
      trait: () => t(L.MS),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.MS,
      amount: 6,
      multipliers: {
         damage: 1,
         hp: 1,
      },
   },
   B7: {
      trait: () => t(L.AC),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.AC,
      amount: 6,
      multipliers: {
         damage: 1,
         hp: 1,
      },
   },
   B8: {
      trait: () => t(L.AC),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.AC,
      amount: 6,
      multipliers: {
         damage: 2,
      },
   },
   B9: {
      trait: () => t(L.AC),
      filter: (b: Building) => Config.Buildings[b].code === CodeNumber.AC,
      amount: 6,
      multipliers: {
         hp: 2,
      },
   },
} as const satisfies Record<string, ICatalystDefinition>;

export type Catalyst = keyof typeof Catalyst;

export const CatalystCat = {
   C1: {
      name: () => t(L.CatalystCatX, numberToRoman(1)!),
      candidates: ["A1", "A2", "A3", "A4", "A5", "A6"],
   },
   C2: {
      name: () => t(L.CatalystCatX, numberToRoman(2)!),
      candidates: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
   },
   C3: {
      name: () => t(L.CatalystCatX, numberToRoman(3)!),
      candidates: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
   },
} as const satisfies Record<string, { name: () => string; candidates: Catalyst[] }>;

export type CatalystCat = keyof typeof CatalystCat;
