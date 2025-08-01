import { Tooltip } from "@mantine/core";
import { Config } from "@spaceship-idle/shared/src/game/Config";
import type { Tech } from "@spaceship-idle/shared/src/game/definitions/TechDefinitions";
import { GameStateUpdated } from "@spaceship-idle/shared/src/game/GameState";
import { getAvailableQuantum } from "@spaceship-idle/shared/src/game/logic/ResourceLogic";
import { checkTechPrerequisites, getTechName } from "@spaceship-idle/shared/src/game/logic/TechLogic";
import { formatNumber, mapOf } from "@spaceship-idle/shared/src/utils/Helper";
import { L, t } from "@spaceship-idle/shared/src/utils/i18n";
import { TechTreeScene } from "../scenes/TechTreeScene";
import { G } from "../utils/Global";
import { refreshOnTypedEvent } from "../utils/Hook";
import { BuildingInfoComp } from "./components/BuildingInfoComp";
import { SidebarComp } from "./components/SidebarComp";
import { TextureComp } from "./components/TextureComp";
import { TitleComp } from "./components/TitleComp";
import { playUpgrade } from "./Sound";

export function TechPage({ tech }: { tech: Tech }): React.ReactNode {
   refreshOnTypedEvent(GameStateUpdated);
   const def = Config.Tech[tech];
   const canUnlock = checkTechPrerequisites(tech, G.save.current);
   return (
      <SidebarComp
         title={
            <div className="row">
               <div className="f1">{getTechName(tech)}</div>
            </div>
         }
      >
         <div className="h10" />
         {!G.save.current.unlockedTech.has(tech) && def.requires.length > 0 ? (
            <>
               <TitleComp>{t(L.Prerequisites)}</TitleComp>
               <div className="divider my10" />
               {def.requires.map((req) => {
                  return (
                     <div className="row mx10 my5" key={req}>
                        <div className="f1">{getTechName(req)}</div>
                        {G.save.current.unlockedTech.has(req) ? (
                           <div className="mi text-green">check_circle</div>
                        ) : (
                           <div className="mi text-red">cancel</div>
                        )}
                     </div>
                  );
               })}
               <div className="divider my10" />
               <div className="mx10">
                  <Tooltip disabled={getAvailableQuantum(G.save.current) > 0} label={t(L.NotEnoughQuantum)}>
                     <button
                        className="btn filled w100 row px10 py5"
                        onClick={() => {
                           if (
                              !checkTechPrerequisites(tech, G.save.current) ||
                              getAvailableQuantum(G.save.current) <= 0
                           ) {
                              return;
                           }
                           playUpgrade();
                           G.save.current.unlockedTech.add(tech);
                           GameStateUpdated.emit();
                           G.scene.enqueue(TechTreeScene, (t) => t.refresh());
                        }}
                        disabled={!canUnlock || getAvailableQuantum(G.save.current) <= 0}
                     >
                        <div>{t(L.Research)}</div>
                        <div className="f1" />
                        <div>-1</div>
                        <div className="mi">orbit</div>
                     </button>
                  </Tooltip>
               </div>
               <div className="divider mt10 mb10" />
            </>
         ) : null}
         {def.unlockBuildings ? (
            <>
               <TitleComp>{t(L.UnlockModules)}</TitleComp>
               <div className="divider my10" />
               {def.unlockBuildings?.map((b) => {
                  return (
                     <div key={b}>
                        <Tooltip
                           multiline
                           color="gray"
                           label={
                              <div style={{ width: 330 }}>
                                 <BuildingInfoComp building={b} />
                              </div>
                           }
                        >
                           <div className="row m10">
                              <TextureComp name={`Building/${b}`} />
                              <div className="f1">
                                 <div>{Config.Buildings[b].name()}</div>
                              </div>
                           </div>
                        </Tooltip>
                        <div className="divider my10" />
                     </div>
                  );
               })}
            </>
         ) : null}
         {def.multiplier ? (
            <>
               <TitleComp>{t(L.TechMultiplierBoost)}</TitleComp>
               <div className="divider my10" />
               {mapOf(def.multiplier, (b, multiplier) => {
                  return (
                     <div key={b} className="m10">
                        <div className="f1">{Config.Buildings[b].name()}</div>
                        <div className="row text-sm text-dimmed">
                           <div className="f1">{t(L.HPMultiplier)}</div>
                           <div>+{formatNumber(multiplier.hp)}</div>
                        </div>
                        <div className="row text-sm text-dimmed">
                           <div className="f1">{t(L.DamageMultiplier)}</div>
                           <div>+{formatNumber(multiplier.damage)}</div>
                        </div>
                     </div>
                  );
               })}
               <div className="divider my10" />
            </>
         ) : null}
         {def.unlockUpgrades ? (
            <>
               <TitleComp>{t(L.UnlockUpgrades)}</TitleComp>
               <div className="divider my10" />
               {def.unlockUpgrades?.map((u) => {
                  return (
                     <div key={u.name()}>
                        <div className="m10">
                           <div className="f1">{u.name()}</div>
                           <div className="text-dimmed text-xs">{u.desc()}</div>
                        </div>
                        <div className="divider my10" />
                     </div>
                  );
               })}
            </>
         ) : null}
      </SidebarComp>
   );
}
