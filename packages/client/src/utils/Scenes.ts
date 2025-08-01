import { BoosterScene } from "../scenes/BoosterScene";
import { CatalystScene } from "../scenes/CatalystScene";
import { ElementsScene } from "../scenes/ElementsScene";
import { ShipScene } from "../scenes/ShipScene";
import { TechTreeScene } from "../scenes/TechTreeScene";

export const Scenes = {
   ElementsScene: ElementsScene.name,
   ShipScene: ShipScene.name,
   TechTreeScene: TechTreeScene.name,
   CatalystScene: CatalystScene.name,
   BoosterScene: BoosterScene.name,
} as const;
