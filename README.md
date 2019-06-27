#React-TypeScript-Responsive-Component


[![NPM](https://nodei.co/npm/responsive-react.png)](https://nodei.co/npm/responsive-react/)


Device-type based rendering of react components (typescript), like render `<SideNav>` when desktop and `<BottomNav>` when mobile or tablet

- Conditional rendering
- No CSS

**Conditional rendering**

Can take either one DeviceType input ([**DEMO**](https://codesandbox.io/s/shy-wood-pgjwt?fontsize=14))

    import { IdResponsiveRenderOnlyIn, Responsive } from "responsive-react";
    ...
    <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>

        {'This is Desktop/Laptop'}

    </Responsive>

  

Or, Multiple DeviceType in Array<DeviceType>

    import { IdResponsiveRenderOnlyIn, Responsive } from "responsive-react";
    ...
    <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>

        {'This is either Mobile or Tablet'}>

    </Responsive>


<br/>

**Device information**

Use `getDeviceTypeInfo()`

Returns `IDeviceTypeInfo` *(object)* with following info

    {
        deviceType: IdDeviceType ('Mobile' | 'Tablet' | 'Laptop' | 'LargerThanLaptop'),
        deviceTypeVariant: IdDeviceTypeBreakdown (Long list),
        orientation?: IdDeviceOrientation ('Portrait' | 'Landscape'),
        width: number,
        height: number
    }



**Other helper functions**

    import {
        IDeviceTypeInfo, 
        IWindowDimensionMetrics
    } from "responsive-react/dist/types"; // Type imports
    
    import {
        getDeviceTypeInfo, 
        getWindowDimension, 
        isMobileDevice
     } from "responsive-react/dist/utilResponsive";
    
    +----------------------+-------------------------+
    | Function             | returnType              |
    +----------------------+-------------------------+
    | getDeviceTypeInfo()  | IDeviceTypeInfo         |
    +----------------------+-------------------------+
    | getWindowDimension() | IWindowDimensionMetrics |
    +----------------------+-------------------------+
    | isMobileDevice()     | boolean                 |
    +----------------------+-------------------------+
    | isTabletDevice()     | boolean                 |
    +----------------------+-------------------------+
    | isLaptopDevice()     | boolean                 |
    +----------------------+-------------------------+
    | isBiggerThanLaptop() | boolean                 |  
    +----------------------+-------------------------+


Report issue [HERE](https://github.com/SiddharthaChowdhury/responsive-react/issues)