module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'Acompanhamento de Relatórios i9PDV',
      themeColor: '#1C77C3',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      /* manifestPath: '/manifest.json',
      manifestOptions: {
        name: 'Acompanhamento de Relatórios i9PDV',
        short_name: 'i9PDV',
        start_url: '.',
        display: 'standalone',
        theme_color: '#1C77C3'
      } */
   
      // configure the workbox plugin
      //workboxPluginMode: 'InjectManifest',
      //workboxOptions: {
        // swSrc is required in InjectManifest mode.
        //swSrc: 'dev/sw.js',
        // ...other Workbox options...
      //}
    }
  }