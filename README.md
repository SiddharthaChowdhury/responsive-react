 - Inject `<ResponsiveWatcher/>` in `<App/>` or whatever the root file is
 - use breakPoints as following: 
 
 ```
        <Responsive displayIn={IdResponsiveRenderOnlyIn.Laptop}>
          <SideNavigation/>
        </Responsive>
        <Responsive displayIn={[IdResponsiveRenderOnlyIn.Mobile, IdResponsiveRenderOnlyIn.Tablet]}>
          <BottomNavigation/>
        </Responsive>
 ```