import { clamp } from "../../utils/Helper";
import { L, t } from "../../utils/i18n";
import { Config } from "../Config";
import { getDamagePerFire } from "../logic/BuildingLogic";
import { AbilityFlag, AbilityRange, AbilityTiming } from "./Ability";
import {
   BuildingFlag,
   DamageType,
   type IBuildingDefinition,
   type IBuildingProp,
   ProjectileFlag,
} from "./BuildingProps";
import { CodeNumber } from "./CodeNumber";
import { DamageToHPMultiplier, DefaultCooldown } from "./Constant";

export const MissileBaseProps: IBuildingProp = {
   armor: [0, 1],
   shield: [0, 0.5],
   deflection: [0, 0.5],
   evasion: [0, 0],
   damagePct: 1,
   fireCooldown: DefaultCooldown,
   projectiles: 1,
   projectileSpeed: 300,
   damageType: DamageType.Kinetic,
   projectileFlag: ProjectileFlag.None,
} as const;

export const MS1: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS1),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.5,
   damageType: DamageType.Explosive,
   fireCooldown: 5,
   ability: {
      timing: AbilityTiming.OnHit,
      range: AbilityRange.Adjacent,
      effect: "TickEnergyDamage",
      flag: AbilityFlag.AffectedByDamageMultiplier,
      value: (building, level, multipliers) => {
         const def = Config.Buildings[building] as IBuildingDefinition;
         const damage = getDamagePerFire({ type: building, level }) * multipliers.damage;
         return (damage * (1 - def.damagePct)) / 5 / 3;
      },
      duration: (building, level) => 5,
   },
   element: "Na",
};
export const MS1A: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS1A),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.5,
   damageType: DamageType.Explosive,
   fireCooldown: 5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Adjacent,
      effect: "RecoverHp",
      flag: AbilityFlag.AffectedByDamageMultiplier,
      value: (building, level, multipliers) => {
         const def = Config.Buildings[building] as IBuildingDefinition;
         const damage = getDamagePerFire({ type: building, level }) * multipliers.damage;
         return (damage * (1 - def.damagePct)) / 3;
      },
      duration: (building, level) => 1,
   },
   element: "S",
};

export const MS1B: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS1B),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.75,
   damageType: DamageType.Explosive,
   fireCooldown: 5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Adjacent,
      effect: "IncreaseMaxHp",
      flag: AbilityFlag.AffectedByDamageMultiplier,
      value: (building, level, multipliers) => {
         const def = Config.Buildings[building] as IBuildingDefinition;
         const hp = getDamagePerFire({ type: building, level }) * multipliers.damage * DamageToHPMultiplier;
         return (hp * (1 - def.damagePct)) / 3;
      },
      duration: (building, level) => 5,
   },
   element: "Ca",
};
export const MS1C: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS1C),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "CriticalDamage2",
      flag: AbilityFlag.None,
      value: (building, level) => 0.2,
      duration: (building, level) => 5,
   },
   element: "Ar",
};
export const MS1D: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS1D),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "LifeSteal",
      flag: AbilityFlag.None,
      value: (building, level) => 0.25,
      duration: (building, level) => 4,
   },
   element: "K",
};
export const MS2: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS2),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.8,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "DamageControl",
      flag: AbilityFlag.None,
      value: (building, level) => 0.01,
      duration: (building, level) => 4,
   },
   element: "Fe",
};
export const MS2A: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS2A),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.75,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "ReflectDamage",
      flag: AbilityFlag.None,
      value: (building, level) => {
         return clamp(0.05 + (level - 1) * 0.005, 0, 0.5);
      },
      duration: (building, level) => 5,
   },
   element: "Co",
};
export const MS2B: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS2B),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.75,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Adjacent,
      effect: "DispelDebuff",
      flag: AbilityFlag.None,
      value: (building, level) => 0,
      duration: (building, level) => 0,
   },
   element: "Nb",
};
export const MS2C: IBuildingDefinition = {
   ...MissileBaseProps,
   name: () => t(L.MS2C),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4.5,
   ability: {
      timing: AbilityTiming.OnHit,
      range: AbilityRange.Single,
      effect: "Disarm",
      flag: AbilityFlag.None,
      value: (building, level) => {
         return 0;
      },
      duration: (building, level) => 2,
   },
   element: "Sr",
};
