#React-TypeScript-Responsive-Component 

Device-type based rendering of react components (typescript), like render <SideNav> when desktop and <BottomNav> when mobile or tablet
 
 - Inject `<ResponsiveWatcher/>` in `<App/>`, `index` or whatever the root file is
 - No CSS
  

Install: `npm i -S esponsive-react`


[Try the DEMO ](https://codesandbox.io/s/yq84n9x73x)
 

 ##Conditional rendering
 
 ```
        // Can take either one DeviceType input
        <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>
            {'This is Desktop/Laptop'}
        </Responsive>
        
        // Or, Multiple DeviceType in Array<DeviceType>
        <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>
            {'This is either Mobile or Tablet'}>
        </Responsive>
 ```
 
 ##Device information
 
 Use
 
 `const deviceInfo: IDeviceTypeInfo = getDeviceTypeInfo()`
 
 Result object
 
     interface IDeviceTypeInfo {
         deviceType: IdDeviceType ('Mobile' | 'Tablet' | 'Laptop' | 'LargerThanLaptop'),
         deviceTypeVariant: IdDeviceTypeBreakdown (Long list),
         orientation?: IdDeviceOrientation ('Portrait' | 'Landscape'),
         width: number,
         height: number
     }
     
 Report issue [HERE](https://github.com/SiddharthaChowdhury/responsive-react/issues)