import { clamp } from "../../utils/Helper";
import { L, t } from "../../utils/i18n";
import { Config } from "../Config";
import { getCooldownMultiplier } from "../logic/BattleLogic";
import { damageToHp, getNormalizedValue } from "../logic/BuildingLogic";
import { AbilityRange, AbilityTiming } from "./Ability";
import { BaseDefenseProps, BaseWeaponProps, BuildingFlag, DamageType, type IWeaponDefinition } from "./BuildingProps";
import { CodeNumber } from "./CodeNumber";

export const MS1: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS1),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 2, Rocket: 3 },
   output: { MS1: 1 },
   damagePct: 0.5,
   damageType: DamageType.Explosive,
   fireCooldown: 5,
   ability: {
      timing: AbilityTiming.OnHit,
      range: AbilityRange.Adjacent,
      effect: "TickEnergyDamage",
      value: (building, level) => {
         const def = Config.Buildings[building] as IWeaponDefinition;
         const damage = getNormalizedValue({ type: building, level }) * getCooldownMultiplier({ type: building });
         return (damage * (1 - def.damagePct)) / 5 / 3;
      },
      duration: (building, level) => 5,
   },
   element: "Na",
};
export const MS1H: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS1H),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 1, MS1: 2 },
   output: { MS1H: 1 },
   damagePct: 0.5,
   damageType: DamageType.Explosive,
   fireCooldown: 5,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Adjacent,
      effect: "RecoverHp",
      value: (building, level) => {
         const def = Config.Buildings[building] as IWeaponDefinition;
         const damage = getNormalizedValue({ type: building, level }) * getCooldownMultiplier({ type: building });
         return (damage * (1 - def.damagePct)) / 3;
      },
      duration: (building, level) => 1,
   },
   element: "S",
};
export const MS2: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS2),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 1, MS1: 2 },
   output: { MS2: 1 },
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "CriticalDamage2",
      value: (building, level) => 0.2,
      duration: (building, level) => 5,
   },
   element: "Ar",
};
export const MS2R: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS2R),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 1, MS2: 1, AC76R: 1 },
   output: { MS2R: 1 },
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "LifeSteal",
      value: (building, level) => 0.25,
      duration: (building, level) => 4,
   },
   element: "K",
};
export const MS2C: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS2C),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 1, MS2: 2 },
   output: { MS2C: 1 },
   damagePct: 0.8,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "DamageControl",
      value: (building, level) => 0.01,
      duration: (building, level) => 4,
   },
   element: "Fe",
};
export const MS1F: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS1F),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 2, MS1H: 2 },
   output: { MS1F: 1 },
   damagePct: 0.75,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Adjacent,
      effect: "IncreaseMaxHp",
      value: (building, level) => {
         const def = Config.Buildings[building] as IWeaponDefinition;
         const damage = getNormalizedValue({ type: building, level }) * getCooldownMultiplier({ type: building });
         return (damageToHp(damage, building) * (1 - def.damagePct)) / 3;
      },
      duration: (building, level) => 5,
   },
   element: "Ca",
};
export const MS2S: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS2S),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 2, MS2C: 1, MS1F: 1 },
   output: { MS2S: 1 },
   damagePct: 0.75,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnFire,
      range: AbilityRange.Single,
      effect: "ReflectDamage",
      value: (building, level) => {
         return clamp(0.05 + (level - 1) * 0.005, 0, 0.5);
      },
      duration: (building, level) => 5,
   },
   element: "Co",
};
export const MS3: IWeaponDefinition = {
   ...BaseDefenseProps,
   ...BaseWeaponProps,
   name: () => t(L.MS3),
   code: CodeNumber.MS,
   buildingFlag: BuildingFlag.CanTarget,
   input: { Power: 2, MS2R: 1, MS2C: 1 },
   output: { MS3: 1 },
   damagePct: 0.9,
   damageType: DamageType.Explosive,
   fireCooldown: 4,
   ability: {
      timing: AbilityTiming.OnHit,
      range: AbilityRange.RearTrio,
      effect: "ProductionDisruption",
      value: (building, level) => {
         return 0;
      },
      duration: (building, level) => 2,
   },
   element: "Sr",
};
