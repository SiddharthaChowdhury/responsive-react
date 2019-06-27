export enum IdDeviceType {
    Mobile = 'Mobile',
    Tablet = 'Tablet',
    Laptop = 'Laptop',
    LargerThanLaptop = 'LargerThanLaptop'
  }
  
  export enum IdDeviceOrientation {
    Landscape = 'Landscape',
    Portrait = 'Portrait'
  }
  
  export enum IdDeviceTypeBreakdown {
    LargeScreenMax = 'LargeScreenMax',
    LargerThanLaptop = 'LargerThanLaptop',
    LaptopLarge = 'LaptopLarge',
    LaptopSmall = 'LaptopSmall',
    Tablet = 'Tablet',
    MobileLarge = 'MobileLarge',
    MobileMedium = 'MobileMedium',
    MobileSmall = 'MobileSmall'
  }

  export enum IdDeviceBreakpointsByWidth {
    laptop_max = 1440,
    laptop_min = 992,
    tablet_min = 768,
    tablet_max = 991,
    mobile_max = 767,
    default_min = 768 // Unrecognized device
  }
  
  export enum IdMobileHeight {
    mobileLandscape_min = 320,
    mobileLandscape_max = 425
  }