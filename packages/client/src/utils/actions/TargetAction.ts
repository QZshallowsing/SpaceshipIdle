import type { IPoint, IPointData } from "pixi.js";
import { DisplayObject } from "pixi.js";
import { Action } from "./Action";
import type { EasingFunction } from "./Easing";
import { Easing } from "./Easing";

export class TargetAction<T extends Record<string, any>> extends Action {
   private readonly interpolation: EasingFunction;
   private readonly initialValue: Partial<T> = {};
   private readonly targetValue: Partial<T>;
   private time = 0;
   private readonly seconds: number;
   public readonly target: T;

   constructor(target: T, to: Partial<T>, seconds: number, interpolation: EasingFunction = Easing.Linear) {
      super();
      this.interpolation = interpolation;
      this.targetValue = to;
      this.seconds = seconds;
      this.target = target;
   }

   tick(delta: number): boolean {
      if (!this.target || (this.target instanceof DisplayObject && (this.target.destroyed || !this.target.parent))) {
         return true;
      }
      let key: keyof T;
      if (this.time === 0) {
         for (key in this.targetValue) {
            const value = this.target[key] as any;
            if (isPointLike(value)) {
               this.initialValue[key] = { x: value.x, y: value.y } as any;
            } else if (typeof value === "number") {
               this.initialValue[key] = value as any;
            } else {
               console.warn("Only number/ObservablePoint can be tweened!");
            }
         }
      }
      this.time += delta;
      const factor: number = this.interpolation(this.timeDistance);
      for (key in this.targetValue) {
         const value = this.targetValue[key] as any;
         if (isPointLike(value)) {
            const target = value as IPointData;
            const initial = this.initialValue[key] as IPointData;
            (this.target[key] as IPointData).x = initial.x + (target.x - initial.x) * factor;
            (this.target[key] as IPointData).y = initial.y + (target.y - initial.y) * factor;
         } else {
            this.target[key] = ((this.initialValue[key] as number) +
               ((value as number) - (this.initialValue[key] as number)) * factor) as any;
         }
      }
      return this.timeDistance >= 1;
   }

   get timeDistance(): number {
      return Math.min(1, this.time / this.seconds);
   }

   override reset() {
      super.reset();
      this.time = 0;
      return this;
   }
}

function isPointLike(value: any): value is IPoint {
   return typeof value === "object" && "x" in value && "y" in value;
}
