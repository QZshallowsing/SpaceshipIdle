import { Config } from "@spaceship-idle/shared/src/game/Config";
import { GameOption, GameOptionUpdated } from "@spaceship-idle/shared/src/game/GameOption";
import { GameState } from "@spaceship-idle/shared/src/game/GameState";
import { calcShipScore } from "@spaceship-idle/shared/src/game/logic/BattleLogic";
import { BattleStatus } from "@spaceship-idle/shared/src/game/logic/BattleStatus";
import { BattleType } from "@spaceship-idle/shared/src/game/logic/BattleType";
import { rollElementShards } from "@spaceship-idle/shared/src/game/logic/PrestigeLogic";
import { Runtime } from "@spaceship-idle/shared/src/game/logic/Runtime";
import { randomColor } from "@spaceship-idle/shared/src/thirdparty/RandomColor";
import { forEach } from "@spaceship-idle/shared/src/utils/Helper";
import { L, t } from "@spaceship-idle/shared/src/utils/i18n";
import { jsonEncode } from "@spaceship-idle/shared/src/utils/Serialization";
import { RPCClient } from "../rpc/RPCClient";
import { ShipScene } from "../scenes/ShipScene";
import { BattleResultVictoryModal } from "../ui/BattleResultVictoryModal";
import { ChooseElementModal } from "../ui/ChooseElementModal";
import { NewPlayerModal } from "../ui/NewPlayerModal";
import { OfflineTimeModal } from "../ui/OfflineTimeModal";
import { PracticeBattleResultModal } from "../ui/PracticeBattleResultModal";
import { PrestigeModal } from "../ui/PrestigeModal";
import { PrestigeReason } from "../ui/PrestigeReason";
import { QuantumProgressModal } from "../ui/QuantumProgressModal";
import { SecondChanceBattleResultModal } from "../ui/SecondChanceBattleResultModal";
import { hideSidebar } from "../ui/Sidebar";
import { ViewShipModal } from "../ui/ViewShipModal";
import { idbClear } from "../utils/BrowserStorage";
import { G } from "../utils/Global";
import { hideModal, showModal } from "../utils/ToggleModal";
import { loadGameStateFromFile, loadSaveGameFromFile, saveGame } from "./LoadSave";

export function addDebugFunctions(): void {
   if (!import.meta.env.DEV) return;
   // @ts-expect-error
   globalThis.G = G;
   // @ts-expect-error
   globalThis.Config = Config;
   // @ts-expect-error
   globalThis.randColor = () => {
      forEach(Config.Buildings, (b, def) => {
         G.save.options.buildingColors.set(b, randomColor());
      });
      GameOptionUpdated.emit();
   };
   // @ts-expect-error
   globalThis.reset = async () => {
      await idbClear();
      window.location.reload();
   };
   // @ts-expect-error
   globalThis.save = async () => {
      await saveGame(G.save);
      window.location.reload();
   };
   // @ts-expect-error
   globalThis.exportShip = async () => {
      const gs = new GameState();
      gs.tiles = G.save.current.tiles;
      gs.unlockedTech = G.save.current.unlockedTech;
      console.log(jsonEncode(gs));
   };
   // @ts-expect-error
   globalThis.chooseElement = () => {
      G.save.current.discoveredElements--;
   };
   // @ts-expect-error
   globalThis.choosePermanentElement = () => {
      rollElementShards(G.save, 1);
      showModal({
         children: <ChooseElementModal permanent={true} choice={G.save.options.elementChoices[0]} />,
         size: "xl",
      });
   };
   // @ts-expect-error
   globalThis.printFromFile = async () => {
      console.log(jsonEncode(await loadGameStateFromFile()));
   };
   // @ts-expect-error
   globalThis.loadGameState = async () => {
      G.save.current = await loadGameStateFromFile();
      await saveGame(G.save);
      window.location.reload();
   };
   // @ts-expect-error
   globalThis.loadSaveGame = async () => {
      G.save = await loadSaveGameFromFile();
      await saveGame(G.save);
      window.location.reload();
   };
   // @ts-expect-error
   globalThis.battle = async () => {
      const enemy = await loadGameStateFromFile();
      console.log(calcShipScore(G.save.current, enemy));
   };
   // @ts-expect-error
   globalThis.prestige = async () => {
      G.runtime.battleStatus = BattleStatus.RightWin;
      showModal({
         children: <PrestigeModal reason={PrestigeReason.Incompatible} />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.defeated = async () => {
      showModal({
         children: <PrestigeModal reason={PrestigeReason.Defeated} />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.victory = async () => {
      showModal({
         children: <BattleResultVictoryModal />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.secondChance = async () => {
      showModal({
         children: <SecondChanceBattleResultModal />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.practice = async () => {
      showModal({
         children: <PracticeBattleResultModal />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.offline = async () => {
      showModal({
         title: t(L.OfflineTime),
         children: <OfflineTimeModal offlineTime={G.save.current.offlineTime} />,
         size: "sm",
      });
   };
   // @ts-expect-error
   globalThis.progress = async () => {
      showModal({
         title: t(L.QuantumProgress),
         children: <QuantumProgressModal />,
         size: "lg",
         dismiss: true,
      });
   };
   // @ts-expect-error
   globalThis.reroll = async () => {
      G.save.current.discoveredElements = 0;
      G.save.current.elementChoices = [];
      G.save.current.elements.clear();
   };
   // @ts-expect-error
   globalThis.setLevel = (level: number) => {
      G.save.current.tiles.forEach((t) => {
         t.level = level;
      });
   };
   // @ts-expect-error
   globalThis.newPlayer = async () => {
      showModal({
         children: <NewPlayerModal />,
         size: "lg",
         title: t(L.WelcomeToSpaceshipIdle),
         dismiss: false,
      });
   };
   // @ts-expect-error
   globalThis.hideModal = hideModal;
   // @ts-expect-error
   globalThis.viewShip = (id: string) => {
      showModal({
         title: t(L.ViewShip),
         children: <ViewShipModal id={id} />,
         size: "md",
         dismiss: true,
      });
   };
   // @ts-expect-error
   globalThis.battle = async (left: string, right: string) => {
      G.runtime = new Runtime(
         { current: (await RPCClient.viewShip(left)).json, options: new GameOption() },
         (await RPCClient.viewShip(right)).json,
      );
      G.runtime.battleType = BattleType.Practice;
      G.scene.loadScene(ShipScene);
      hideSidebar();
   };
}
