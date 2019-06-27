import { IdDeviceTypeBreakdown, IdDeviceType, IdDeviceOrientation } from "./ids";

export interface IDeviceWidthInfo {
    max: number;
    min: number;
}

export type DeviceWidth = {[id in IdDeviceTypeBreakdown]: IDeviceWidthInfo};

export interface TypeDeviceWidth extends DeviceWidth {
    [key:string]: any;
}

export interface IWindowDimensionMetrics {
    width: number;
    height: number;
}

export interface IDeviceTypeInfo {
    deviceType: IdDeviceType,
    deviceTypeVariant: IdDeviceTypeBreakdown,
    orientation?: IdDeviceOrientation,
    width: number,
    height: number
}
