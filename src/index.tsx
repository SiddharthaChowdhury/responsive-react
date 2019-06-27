import * as React from 'react'
import {IdResponsiveRenderOnlyIn, IWindowDimensionMetrics} from "./util/types";
import {getWindowDimension} from "./util/utilResponsive";
import {IdDeviceBreakpointsByWidth, IdMobileHeight} from "./util/ids";

interface IResponsiveState extends IWindowDimensionMetrics {
  height: number;
  width: number;
}

interface IResponsiveProps {
  displayIn: IdResponsiveRenderOnlyIn | Array<IdResponsiveRenderOnlyIn>;
}

const { width, height }: IWindowDimensionMetrics = getWindowDimension();
const initialState: IResponsiveState = { width, height };

export class Responsive extends React.PureComponent<IResponsiveProps> {
  state: IResponsiveState = initialState;

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  private handleResize = () => {
    const dimension: IWindowDimensionMetrics = getWindowDimension();
    this.setState({...dimension})
  };

  public render = () => {
    const { children } = this.props;
    const { width, height } = this.state;

    const shouldRenderChildren = shouldRender(this.getDisplayInArray(), width, height);

    return (
        <React.Fragment>
          { shouldRenderChildren ? children : null }
        </React.Fragment>
    )
  };

  private getDisplayInArray = (): Array<IdResponsiveRenderOnlyIn> => {
    const { displayIn } = this.props;

    return Array.isArray(displayIn) ? displayIn : [displayIn];
  }
}

const shouldRender = (display: Array<IdResponsiveRenderOnlyIn>, width: number, height: number): boolean => {
  if (display.indexOf(IdResponsiveRenderOnlyIn.Laptop) !== -1 && width >= IdDeviceBreakpointsByWidth.laptop_min) {
    return true;
  }

  if (display.indexOf(IdResponsiveRenderOnlyIn.Tablet) !== -1 && (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min)) {
    return true;
  }

  // For mobile regardless of orientation
  if (display.indexOf(IdResponsiveRenderOnlyIn.Mobile) !== -1 && width <= IdDeviceBreakpointsByWidth.mobile_max) {
    return true;
  }

  if (display.indexOf(IdResponsiveRenderOnlyIn.MobilePortrait) !== -1 && (width <= IdDeviceBreakpointsByWidth.mobile_max && height >= IdMobileHeight.mobileLandscape_max)) {
    return true;
  }

  return !!(display.indexOf(IdResponsiveRenderOnlyIn.MobileLandScape) !== -1 && (width <= IdDeviceBreakpointsByWidth.mobile_max && height <= IdMobileHeight.mobileLandscape_min));
};