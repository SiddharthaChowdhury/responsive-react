#React-TypeScript-Responsive-Component


[![NPM](https://nodei.co/npm/responsive-react.png)](https://nodei.co/npm/responsive-react/)


Device-type based rendering of react components (typescript), like render `<SideNav>` when desktop and `<BottomNav>` when mobile or tablet

- Conditional rendering
- No CSS

<br/>

[Try the DEMO ](https://codesandbox.io/s/yq84n9x73x) (deprecated)


**Conditional rendering**

Can take either one DeviceType input


    <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>

        {'This is Desktop/Laptop'}

    </Responsive>

  

Or, Multiple DeviceType in Array<DeviceType>


    <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>

        {'This is either Mobile or Tablet'}>

    </Responsive>


<br/>

**Device information**

Use

`getDeviceTypeInfo()`

Returns `IDeviceTypeInfo` *(object)* of following info

    {
        deviceType: IdDeviceType ('Mobile' | 'Tablet' | 'Laptop' | 'LargerThanLaptop'),
        deviceTypeVariant: IdDeviceTypeBreakdown (Long list),
        orientation?: IdDeviceOrientation ('Portrait' | 'Landscape'),
        width: number,
        height: number
    }



**Brief & other helper functions**

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