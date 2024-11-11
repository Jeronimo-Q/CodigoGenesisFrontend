import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [referencia, setReferencia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [genero, setGenero] = useState('');
  const [tipoPrenda, setTipoPrenda] = useState('');
  const [errores, setErrores] = useState({});
  const [generos, setGeneros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tiposPrenda, setTiposPrenda] = useState([]);
  const [prendaConfig, setPrendaConfig] = useState(null);

  // Cargar géneros, categorías y tipos de prendas al cargar la página
  useEffect(() => {
    axios.get('http://localhost:8080/munamuinventory/api/v1/genres')
      .then(response => setGeneros(response.data.data))
      .catch(error => console.error('Error fetching generos:', error));

    axios.get('http://localhost:8080/munamuinventory/api/v1/categories')
      .then(response => setCategorias(response.data.data))
      .catch(error => console.error('Error fetching categorias:', error));

    axios.get('http://localhost:8080/munamuinventory/api/v1/typegarments')
      .then(response => setTiposPrenda(response.data.data))
      .catch(error => console.error('Error fetching tipos de prenda:', error));
  }, []);

  // Obtener configuración de la prenda cuando se seleccionan los tres campos
  useEffect(() => {
    if (categoria && genero && tipoPrenda) {
      axios.get('http://localhost:8080/munamuinventory/api/v1/garmentsconfigurations', {
        params: {
          categoryId: categoria,
          genreId: genero,
          typeGarmentId: tipoPrenda
        }
      })
      .then(response => {
        // Actualizar la configuración de la prenda
        setPrendaConfig(response.data.data[0]); // Asumiendo que solo hay un resultado
      })
      .catch(error => {
        console.error('Error fetching prenda configuration:', error);
        setPrendaConfig(null); // Si hay error, limpiamos la configuración
      });
    }
  }, [categoria, genero, tipoPrenda]); // Este effect solo se ejecuta cuando uno de estos tres cambia

  // Función para manejar la validación y guardar la prenda
  const botonGuardar = () => {
    const erroresTemp = {};

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

    // Construir y enviar la solicitud POST
    const nuevaPrenda = {
      id: "00000000-0000-0000-0000-000000000000",
      reference: referencia,
      description: descripcion,
      garmentConfiguration: prendaConfig // Usar la configuración obtenida
    };

    axios.post('http://localhost:8080/munamuinventory/api/v1/garments', nuevaPrenda)
      .then(response => {
        console.log("Prenda creada exitosamente:", response.data);
        
        // Restablecer los valores del formulario a su estado inicial
        setReferencia('');
        setDescripcion('');
        setCategoria('');
        setGenero('');
        setTipoPrenda('');
        setErrores({});
        setPrendaConfig(null); // Limpiar la configuración de la prenda
      })
      .catch(error => console.error("Error al crear la prenda:", error));
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
                <option value="">Seleccione una categoria</option>
                {categorias.map((ca) => (
                  <option key={ca.id} value={ca.id}>{ca.name}</option>
                ))}
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
                <option value="">Seleccione un género</option>
                {generos.map((gen) => (
                  <option key={gen.id} value={gen.id}>{gen.name}</option>
                ))}
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
                {tiposPrenda.map((tp) => (
                  <option key={tp.id} value={tp.id}>{tp.name}</option>
                ))}
              </select>
              {errores.tipoPrenda && <p className="error-message">{errores.tipoPrenda}</p>} 
            </div>
          </div>

          {prendaConfig && (
            <div className="form-row">
              <p><strong>Configuración Prenda:</strong></p>
              <p><strong>Categoría:</strong> {prendaConfig.category.name}</p>
              <p><strong>Género:</strong> {prendaConfig.genre.name}</p>
              <p><strong>Tipo de Prenda:</strong> {prendaConfig.typeGarment.name}</p>
            </div>
          )}

          <div className="buttons">
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
