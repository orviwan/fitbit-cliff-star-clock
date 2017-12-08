function mySettings(props) {
  return (
    <Page>
         <Select
            label="Theme"
            settingsKey="theme"
            options={[
               {
                 name: "mint",
                 value: {
                   foreground: "#00ffbe"
                 }
               },
               {
                 name: "green",
                 value: {
                   foreground: "#00ff00"
                 }
               },
               {
                 name: "blue",
                 value: {
                   foreground: "#00d1fb"
                 }
               },
               {
                 name: "cyan",
                 value: {
                   foreground: "#00d1fb"
                 }
               },
               {
                 name: "yellow",
                 value: {
                   foreground: "#fffa38"
                 }
               },
               {
                 name: "white",
                 value: {
                   foreground: "#FFFFFF"
                 }
               }]
            }
          />
    </Page>
  );
}

registerSettingsPage(mySettings);
