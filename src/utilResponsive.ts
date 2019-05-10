import {IWindowDimensionMetrics} from "./index";

export class UtilResponsive {
  public getWindowDimensions = (): IWindowDimensionMetrics => {
    let w = window;
    let d = document;
    let documentElement = d.documentElement;
    let body = d.getElementsByTagName('body')[0];
    let width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    let height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    return { width, height };
  }
}

export const utilResponsive = new UtilResponsive()
