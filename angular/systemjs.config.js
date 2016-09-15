/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var packages = {
    app: {
      main: './appBootstrap.js',
      defaultExtension: 'js'      
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: './index.js',
      defaultExtension: 'js'
    }
  };

  var materialPackages = [
    '@angular2-material/core',
    '@angular2-material/button',
    '@angular2-material/toolbar',
    '@angular2-material/sidenav',
    '@angular2-material/icon'
  ];

  materialPackages.forEach(function (pkgName) {
    var pkg = pkgName.split('/');
    packages[pkgName] = {  main: pkg[1] + '.umd.js'};
  });

  System.config({
    transpiler: 'typescript',
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      '@angular2-material': 'npm:@angular2-material'
    },
    packages: packages
  });

})(this);
