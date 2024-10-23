import React, { useState } from 'react';
import './App.css';

let App = () => {
  let [referencia, setReferencia] = useState('');
  let [descripcion, setDescripcion] = useState('');
  let [categoria, setCategoria] = useState('');
  let [genero, setGenero] = useState('');
  let [tipoPrenda, setTipoPrenda] = useState('');
  let [guardarPrenda, setGuardarPrenda] = useState(['', '', '']); 
  let [mostrarPrenda, setMostrarPrenda] = useState([]); 
  let [errores, setErrores] = useState({});  
  
  let botonGuardar = () => {
    let erroresTemp = {};

    
    if (!referencia) {
      erroresTemp.referencia = 'La referencia es obligatoria.';
    } else if (referencia.length < 4 || referencia.length > 6) {
      erroresTemp.referencia = 'La referencia debe tener entre 4 y 6 caracteres.';
    }

    
    if (!descripcion) {
      erroresTemp.descripcion = 'La descripción es obligatoria.';
    } else if (descripcion.length < 5 || descripcion.length > 100) {
      erroresTemp.descripcion = 'La descripción debe tener entre 5 y 100 caracteres.';
    }

    
    if (!categoria) erroresTemp.categoria = 'Seleccione una categoría.';
    if (!genero) erroresTemp.genero = 'Seleccione un género.';
    if (!tipoPrenda) erroresTemp.tipoPrenda = 'Seleccione un tipo de prenda.';

    
    if (Object.keys(erroresTemp).length > 0) {
      setErrores(erroresTemp);
      return;
    }

    
    let nuevaPrenda = {
      referencia,
      descripcion,
      categoria,
      genero,
      tipoPrenda,
    };

    setGuardarPrenda([nuevaPrenda.referencia, nuevaPrenda.descripcion, `${nuevaPrenda.categoria}, ${nuevaPrenda.genero}, ${nuevaPrenda.tipoPrenda}`]);

    setMostrarPrenda([`Categoria: ${nuevaPrenda.categoria},Genero:  ${nuevaPrenda.genero},Tipo de prenda ${nuevaPrenda.tipoPrenda}`]);

    
    setReferencia('');
    setDescripcion('');
    setCategoria('');
    setGenero('');
    setTipoPrenda('');
    setErrores({});  
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
                autoComplete='off'
                placeholder="Referencia"
                value={referencia}
                onChange={(e) => {
                  let value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setReferencia(value);
                  }
                }}
              />
              {errores.referencia && <p className="error-message">{errores.referencia}</p>} 
            </div>

            <div className="input-group">
              <label htmlFor="descripcion" className="label">Descripción</label>
              <input
                type="text"
                id="descripcion"
                autoComplete='off'
                placeholder="Descripción de la prenda"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errores.descripcion && <p className="error-message">{errores.descripcion}</p>} 
            </div>
          </div>

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
              {errores.categoria && <p className="error-message">{errores.categoria}</p>} 
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
              {errores.genero && <p className="error-message">{errores.genero}</p>} 
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
              {errores.tipoPrenda && <p className="error-message">{errores.tipoPrenda}</p>} 
            </div>
          </div>

          {mostrarPrenda.length > 0 && (
            <div className="form-row">
              <p><strong>Configuración Prenda:</strong></p>
              <ul>
                {mostrarPrenda.map((prenda, index) => (
                  <li key={index}>{prenda}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="buttons">
            <button type="button" className="btn cerrar" onClick={() => console.log("Cerrando...")}>
              Cerrar
            </button>
            <button type="button" className="btn guardar" onClick={botonGuardar}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
