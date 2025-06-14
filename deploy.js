const fs = require('fs');
const path = require('path');

// Copiar contenido del build a la carpeta public
const buildPath = path.join(__dirname, 'build');
const publicPath = path.join(__dirname, 'public');

// Limpiar la carpeta public
fs.readdirSync(publicPath).forEach(file => {
  if (file !== 'index.html') {
    fs.unlinkSync(path.join(publicPath, file));
  }
});

// Copiar archivos del build
fs.readdirSync(buildPath).forEach(file => {
  fs.copyFileSync(
    path.join(buildPath, file),
    path.join(publicPath, file)
  );
});

console.log('Archivos copiados exitosamente a public/');
