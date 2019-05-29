import * as React from 'react'
import { Subject } from 'rxjs'
import { share } from 'rxjs/operators'
import { utilResponsive } from './utilResponsive'
import { IdDeviceOrientation, IdDeviceType, IdDeviceTypeBreakdown } from './IdDevice'
import { IdDeviceBreakpointsByWidth, IdMobileHeight } from './IdDeviceBreakpoints'

export interface IWindowDimensionMetrics {
    width: number;
    height: number;
}

const windowDimensionSubject: Subject<any> = new Subject();
export const windowDimensionSubs = windowDimensionSubject.pipe(
    share()
);

export class ResponsiveWatcher extends React.PureComponent<any> {
    public render = () => {
        return null;
    }

    private updateDimensions = () => {
        let windowDimensionMetrics: IWindowDimensionMetrics = utilResponsive.getWindowDimensions();
        this.setState(windowDimensionMetrics);
        windowDimensionSubject.next(windowDimensionMetrics);
    }

    public componentWillMount = () => {
        this.updateDimensions();
    }

    public componentDidMount = () => {
        window.addEventListener('resize', this.updateDimensions);
    }

    public componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimensions);
    }
}

export interface IDeviceWidthInfo {
    max: number;
    min: number;
}

export type TypeDeviceWidth = {[id in IdDeviceTypeBreakdown]: IDeviceWidthInfo};

export const DeviceWidthObject: TypeDeviceWidth = {
    [IdDeviceTypeBreakdown.MobileSmall] : { max: 320, min: 0 },
    [IdDeviceTypeBreakdown.MobileMedium] : { max: 375, min: 321 },
    [IdDeviceTypeBreakdown.MobileLarge] : { max: 767, min: 376 },
    [IdDeviceTypeBreakdown.Tablet] : { max: 991, min: 768 },
    [IdDeviceTypeBreakdown.LaptopSmall] : { max: 1024, min: 992 },
    [IdDeviceTypeBreakdown.LaptopLarge] : { max: 1440, min: 1025 },
    [IdDeviceTypeBreakdown.LargerThanLaptop] : { max: 2560, min: 1441 },
    [IdDeviceTypeBreakdown.LargeScreenMax] : { max: 999999, min: 2561 }
}

export interface IDeviceTypeInfo {
    deviceType: IdDeviceType,
    deviceTypeVariant: IdDeviceTypeBreakdown,
    orientation?: IdDeviceOrientation,
    width: number,
    height: number
}

export const getDeviceTypeInfo = (): IDeviceTypeInfo => {
    const { width, height }: IWindowDimensionMetrics = utilResponsive.getWindowDimensions();
    const buildDeviceDetails: IDeviceTypeInfo = {
        deviceType: '' as IdDeviceType,
        deviceTypeVariant: '' as IdDeviceTypeBreakdown,
        orientation: IdDeviceOrientation.Portrait,
        width,
        height
    };

    if (height < width) {
        // Orientation is landscape
        buildDeviceDetails.orientation = IdDeviceOrientation.Landscape;

        if (height <= IdMobileHeight.mobileLandscape_max) {
            // Mobile (landscape)
            buildDeviceDetails.deviceType = IdDeviceType.Mobile

            for (const devc in DeviceWidthObject) {
                if (height <= DeviceWidthObject[devc].max && height >= DeviceWidthObject[devc].min) {
                    buildDeviceDetails.deviceTypeVariant = devc as IdDeviceTypeBreakdown;
                    break;
                }
            }
        } else if (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min) {
            // Tablet (landscape)
            buildDeviceDetails.deviceType = IdDeviceType.Tablet;
            buildDeviceDetails.deviceTypeVariant = IdDeviceTypeBreakdown.Tablet;
        } else if (width <= IdDeviceBreakpointsByWidth.laptop_max && width >= IdDeviceBreakpointsByWidth.laptop_min) {
            // Laptop (landscape)
            buildDeviceDetails.deviceType = IdDeviceType.Laptop;

            for (const devc in DeviceWidthObject) {
                if (width <= DeviceWidthObject[devc].max && width >= DeviceWidthObject[devc].min) {
                    buildDeviceDetails.deviceTypeVariant = devc as IdDeviceTypeBreakdown;
                    break;
                }
            }
        } else {
            // Larger than Laptop (landscape)
            buildDeviceDetails.deviceType = IdDeviceType.LargerThanLaptop;

            for (const devc in DeviceWidthObject) {
                if (width <= DeviceWidthObject[devc].max && width >= DeviceWidthObject[devc].min) {
                    buildDeviceDetails.deviceTypeVariant = devc as IdDeviceTypeBreakdown;
                    break;
                }
            }
        }
    } else {
        // Orientation is portrait
        buildDeviceDetails.orientation = IdDeviceOrientation.Portrait;

        for (const devc in DeviceWidthObject) {
            if (width <= DeviceWidthObject[devc].max && width >= DeviceWidthObject[devc].min) {
                buildDeviceDetails.deviceTypeVariant = devc as IdDeviceTypeBreakdown;
                break;
            }
        }

        if (width <= IdDeviceBreakpointsByWidth.laptop_max && width >= IdDeviceBreakpointsByWidth.laptop_min) {
            buildDeviceDetails.deviceType = IdDeviceType.Laptop;
        }
        if (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min) {
            buildDeviceDetails.deviceType = IdDeviceType.Tablet;
        }
        if (width <= IdDeviceBreakpointsByWidth.mobile_max) {
            buildDeviceDetails.deviceType = IdDeviceType.Mobile;
        }
        if (width > IdDeviceBreakpointsByWidth.laptop_max) {
            buildDeviceDetails.deviceType = IdDeviceType.LargerThanLaptop;
        }
    }

    return buildDeviceDetails;
}

export const isMobileDevice = (): boolean => {
    const deviceInformation = getDeviceTypeInfo()

    return deviceInformation.deviceType === IdDeviceType.Mobile
}

export const isTabletDevice = (): boolean => {
    const deviceInformation = getDeviceTypeInfo()

    return deviceInformation.deviceType === IdDeviceType.Tablet
}

export const isLaptopDevice = (): boolean => {
    const deviceInformation = getDeviceTypeInfo()

    return deviceInformation.deviceType === IdDeviceType.Laptop
}

export const isBiggerThanLaptop = (): boolean => {
    const deviceInformation = getDeviceTypeInfo()

    return deviceInformation.deviceType === IdDeviceType.LargerThanLaptop
}