import * as React from 'react'
import { Subscription } from 'rxjs'
import { IWindowDimensionMetrics, windowDimensionSubs } from './ResponsiveWatcher'
import { utilResponsive } from './utilResponsive'
import { IdDeviceBreakpointsByWidth, IdMobileHeight } from './IdDeviceBreakpoints'

export enum IdResponsiveRenderOnlyIn {
  Mobile = 'Mobile',
  MobilePortrait = 'MobilePortrait',
  MobileLandScape = 'MobileLandScape',
  Tablet = 'Tablet',
  Laptop = 'Laptop'
}

interface IResponsiveState extends IWindowDimensionMetrics {}

interface IResponsiveProps {
  displayIn: IdResponsiveRenderOnlyIn | Array<IdResponsiveRenderOnlyIn>
}

const { width, height }: IWindowDimensionMetrics = utilResponsive.getWindowDimensions()
const initialState: IResponsiveState = { width, height }

export class Responsive extends React.PureComponent<IResponsiveProps> {

  state: IResponsiveState = initialState

  private windowDimensionSubscription$: Subscription

  constructor (props: any) {
      super(props)
      const self = this

    this.windowDimensionSubscription$ = windowDimensionSubs.subscribe((dimension: IWindowDimensionMetrics) => {
      self.setState({ ...dimension, shouldRender: shouldRender(this.getDisplayInArray(), dimension.width, dimension.height) })
    })
  }

  componentWillUnmount = (): void => {
    this.windowDimensionSubscription$.unsubscribe()
  }

  render = () => {
    const { children } = this.props
    const { width, height } = this.state

    const shouldRenderChildren = shouldRender(this.getDisplayInArray(), width, height)

    return (
      <React.Fragment>
        { shouldRenderChildren ? children : null }
      </React.Fragment>
    )
  }

  private getDisplayInArray = (): Array<IdResponsiveRenderOnlyIn> => {
    const { displayIn } = this.props

    return Array.isArray(displayIn) ? displayIn : [displayIn]
  }
}

const shouldRender = (display: Array<IdResponsiveRenderOnlyIn>, width: number, height: number): boolean => {
  if (display.indexOf(IdResponsiveRenderOnlyIn.Laptop) !== -1 && width >= IdDeviceBreakpointsByWidth.laptop_min) {
    return true
  }

  if (display.indexOf(IdResponsiveRenderOnlyIn.Tablet) !== -1 && (width <= IdDeviceBreakpointsByWidth.tablet_max && width >= IdDeviceBreakpointsByWidth.tablet_min)) {
    return true
  }

  // For mobile regardless of orientation
  if (display.indexOf(IdResponsiveRenderOnlyIn.Mobile) !== -1 && width <= IdDeviceBreakpointsByWidth.mobile_max) {
    return true
  }

  if (display.indexOf(IdResponsiveRenderOnlyIn.MobilePortrait) !== -1 && (width <= IdDeviceBreakpointsByWidth.mobile_max && height >= IdMobileHeight.mobileLandscape_max)) {
    return true
  }

  if (display.indexOf(IdResponsiveRenderOnlyIn.MobileLandScape) !== -1 && (width <= IdDeviceBreakpointsByWidth.mobile_max && height <= IdMobileHeight.mobileLandscape_min)) {
    return true
  }

  return false
}
