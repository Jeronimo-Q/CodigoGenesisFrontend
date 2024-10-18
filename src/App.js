import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [referencia, setReferencia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [configuracion, setConfiguracion] = useState('');

  const handleGuardar = () => {
    console.log('Referencia:', referencia);
    console.log('Descripción:', descripcion);
    console.log('Configuración:', configuracion);
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/imagenes/LogoEmpresa.png" alt="Logo Empresa" className="logo" />
      </header>

      <div className="container">
        <form className="form">
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="referencia" className="label">N° Referencia</label>
              <input
                type="text"
                id="referencia"
                placeholder="Referencia"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="descripcion" className="label">Descripción</label>
              <input
                type="text"
                id="descripcion"
                placeholder="Descripción de la prenda"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="configuracion" className="label">Configuración Prenda</label>
              <select
                id="configuracion"
                value={configuracion}
                onChange={(e) => setConfiguracion(e.target.value)}
              >
                <option value="">Seleccione la configuración</option>
                <option value="config1">Base de datos</option>
              </select>
            </div>
          </div>

          <div className="buttons">
            <button type="button" className="btn cerrar" onClick={() => console.log("Cerrando...")}>
              Cerrar
            </button>
            <button type="button" className="btn guardar" onClick={handleGuardar}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
