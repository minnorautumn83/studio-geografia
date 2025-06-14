import React, { useState } from 'react';
import './App.css';

// Puedes modificar este array para añadir/quitar capas fácilmente
const capasIniciales = [
  {
    nombre: 'morfologia',
    archivo: 'map-morfologia.png',
    color: '#000',
  },
  {
    nombre: 'politica',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica2',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica3',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica4',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica5',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica6',
    archivo: 'map-politica.png',
    color: '#111',
  },
  {
    nombre: 'politica7',
    archivo: 'map-politica.png',
    color: '#111',
  },
  // Añade más capas aquí si lo deseas
];

function App() {
  // Estado: un objeto con el nombre de la capa como clave y booleano como valor
  const [capasActivas, setCapasActivas] = useState(
    Object.fromEntries(capasIniciales.map(c => [c.nombre, false]))
  );

  // Estado para el menú desplegable
  const [menuVisible, setMenuVisible] = useState(false);

  // Manejar el cambio de cualquier checkbox
  const handleCheckbox = (nombre) => {
    setCapasActivas(prev => ({ ...prev, [nombre]: !prev[nombre] }));
  };

  // Manejar el clic en el botón del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Cerrar el menú al hacer clic fuera
  const handleClickOutside = (e) => {
    if (document.querySelector('.menu-capas')) {
      const menu = document.querySelector('.menu-capas');
      if (!menu.contains(e.target)) {
        setMenuVisible(false);
      }
    }
  };

  // Añadir el listener al montar el componente
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Saber si alguna capa está activa
  const algunaActiva = Object.values(capasActivas).some(Boolean);

  return (
    <div className="container">
      <h1 className="title">Studio Geografia</h1>
      <div className="menu-capas">
        <button className="btn-capas" onClick={toggleMenu}>
          Capas
          <span style={{ transform: menuVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
            ▼
          </span>
        </button>
        <div className={`menu-content ${menuVisible ? 'show' : 'hide'}`}>
          {capasIniciales.map(capa => (
            <label className="checkbox-label" key={capa.nombre} style={{ padding: '8px 16px', width: '100%' }}>
              <input
                type="checkbox"
                checked={capasActivas[capa.nombre]}
                onChange={() => handleCheckbox(capa.nombre)}
              />
              <span className="checkbox-text" style={{ color: capa.color }}>{capa.nombre}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="map-container" style={{position: 'relative', width: '100%', maxWidth: '600px', minHeight: '300px'}}>
        {/* Mapa base siempre en el fondo */}
        <img 
          src={process.env.PUBLIC_URL + '/map-svizzera.png'} 
          alt="Mappa base" 
          className="map-image" 
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%',
            zIndex: 0
          }}
        />
        {/* Capas activas superpuestas en orden */}
        {capasIniciales.map(
          (capa, idx) => capasActivas[capa.nombre] && (
            <img
              key={capa.nombre}
              src={process.env.PUBLIC_URL + '/' + capa.archivo}
              alt={capa.nombre}
              className="map-image"
              style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%',
                zIndex: 10 + idx
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
