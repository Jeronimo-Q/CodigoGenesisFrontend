import React, { useState, useEffect } from 'react';
import './App.css';

let App = () => {
  let [referencia, setReferencia] = useState('');
  let [descripcion, setDescripcion] = useState('');
  let [categoria, setCategoria] = useState('');
  let [genero, setGenero] = useState('');
  let [tipoPrenda, setTipoPrenda] = useState('');
  let [configuracionPrenda, setConfiguracionPrenda] = useState('');

  
  useEffect(() => {

    if (categoria && genero && tipoPrenda) {
      setConfiguracionPrenda(`Categoria: ${categoria} Genero: ${genero} Tipo de prenda: ${tipoPrenda}`);
    } else {
      setConfiguracionPrenda('');
    }
  }, [categoria, genero, tipoPrenda]);

  let handleGuardar = () => {
    if (!referencia || !descripcion || [categoria, genero, tipoPrenda].some(value => value === '')) {
      alert('Por favor, complete todos los campos antes de guardar.');
      return;
    } 
    if (referencia.length < 6 || referencia.length > 4) {
      alert('La referencia debe tener entre 4 y 6 caracteres.');
      return;
    }
    if (descripcion.length < 100 || descripcion.length > 5) {
      alert('La descripción debe tener entre 5 y 100 caracteres.');
      return;
    }
    else {
      console.log('Referencia:', referencia);
      console.log('Descripción:', descripcion);
      console.log('Configuración Prenda:', configuracionPrenda);
    }

  };

  return (
    <div className="App">
      <header className="header">
        <img src="/imagenes/LogoEmpresa.png" alt="Logo Empresa" className="logo" />
      </header>

      <div className="container">
        <form className="form">
          
          {/* Referencia y Descripción */}
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

          {/* Categoria, Género, Tipo de Prenda */}
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="categoria" className="label">Categoría</label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Seleccione la categoría</option>
                <option value="Categoria1">Categoria1</option>
                <option value="Categoria2">Categoria2</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="genero" className="label">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Seleccione el género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="tipoPrenda" className="label">Tipo de Prenda</label>
              <select
                id="tipoPrenda"
                value={tipoPrenda}
                onChange={(e) => setTipoPrenda(e.target.value)}
              >
                <option value="">Seleccione el tipo de prenda</option>
                <option value="Camiseta">Camiseta</option>
                <option value="Pantalón">Pantalón</option>
              </select>
            </div>
          </div>

          {/* Mostrar Configuración Prenda automáticamente si hay una configuración válida */}
          {configuracionPrenda && (
            <div className="form-row">
              <p><strong>Configuración Prenda:</strong> {configuracionPrenda}</p>
            </div>
          )}

          {/* Botones */}
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
