import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [referencia, setReferencia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoPrenda, setTipoPrenda] = useState('');

  
  const [configuracionPrenda, setConfiguracionPrenda] = useState(['', '', '']); 

  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setCategoria(nuevaCategoria);
    setConfiguracionPrenda([nuevaCategoria, configuracionPrenda[1], configuracionPrenda[2]]);
  };

  const handleGeneroChange = (e) => {
    const nuevoGenero = e.target.value;
    setGenero(nuevoGenero);
    setConfiguracionPrenda([configuracionPrenda[0], nuevoGenero, configuracionPrenda[2]]);
  };

  const handleTipoPrendaChange = (e) => {
    const nuevoTipoPrenda = e.target.value;
    setTipoPrenda(nuevoTipoPrenda);
    setConfiguracionPrenda([configuracionPrenda[0], configuracionPrenda[1], nuevoTipoPrenda]);
  };

  const handleGuardar = () => {
    if (!referencia || !descripcion || configuracionPrenda.some(value => value === '')) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return;
    }
    console.log('Referencia:', referencia);
    console.log('Descripción:', descripcion);
    console.log('Configuración Prenda:', configuracionPrenda.join('-')); 
  };

  return (
    <div className="App">
      <header className="header">
        <img src="/imagenes/LogoEmpresa.png" alt="Logo Empresa" className="logo" />
      </header>

      <div className="container">
        <form className="form">
          
          {/*Referencia - Descripción */}
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
          </div>

          {/*Categoria, Genero y Tipo de Prenda */}
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="categoria" className="label">Categoría</label>
              <select
                id="categoria"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                <option value="">Seleccione la categoría</option>
                <option value="Categoria Info">Categoria Info</option>

              </select>
            </div>

            <div className="input-group">
              <label htmlFor="genero" className="label">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={handleGeneroChange}
              >
                <option value="">Seleccione el género</option>
                <option value="Genero Info">Genero Info</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="tipoPrenda" className="label">Tipo de Prenda</label>
              <select
                id="tipoPrenda"
                value={tipoPrenda}
                onChange={handleTipoPrendaChange}
              >
                <option value="">Seleccione el tipo de prenda</option>
                <option value="TipoPrenda Info">TipoPrenda Info</option>
              </select>
            </div>
          </div>

          {/*ConfiguracionPrenda */}
          {configuracionPrenda.every(value => value !== '') && (
            <div className="form-row">
              <p><strong>Configuración Prenda:</strong> {configuracionPrenda.join('-')}</p>
            </div>
          )}

          {/* botones */}
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
