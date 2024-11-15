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
  const [mensajeExito, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [combinaciones, setCombinaciones] = useState({});


  useEffect(() => {
    axios.get('http://localhost:8080/munamuinventory/api/v1/garmentsconfigurations')
      .then(response => {
        const garmentsData = response.data.data;

        const uniqueGeneros = Array.from(new Set(garmentsData.map(item => item.genre.id)))
          .map(id => garmentsData.find(item => item.genre.id === id).genre);
        const uniqueCategorias = Array.from(new Set(garmentsData.map(item => item.category.id)))
          .map(id => garmentsData.find(item => item.category.id === id).category);
        const uniqueTiposPrenda = Array.from(new Set(garmentsData.map(item => item.typeGarment.id)))
          .map(id => garmentsData.find(item => item.typeGarment.id === id).typeGarment);

        garmentsData.forEach(item => {
          if (!combinaciones[item.category.id]) {
            combinaciones[item.category.id] = [];
          }
          combinaciones[item.category.id].push({
            genre: item.genre,
            typeGarment: item.typeGarment,
          });
        });
        console.log(combinaciones)
        setCombinaciones(combinaciones);
        setCategorias(uniqueCategorias);
      })
      .catch(error => console.error('Error fetching garment configurations:', error));
  }, []);

  useEffect(() => {
    if (categoria && genero && tipoPrenda) {
      setLoading(true);

      console.log("Cargando configuración con parámetros:", { categoria, genero, tipoPrenda });

      axios.get('http://localhost:8080/munamuinventory/api/v1/garmentsconfigurations/byids', {
        params: {
          categoryId: categoria, 
          genreId: genero,       
          typeGarmentId: tipoPrenda, 
        },
      })
        .then(response => {
          setLoading(false);
          if (response.data.data.length > 0) {
            setPrendaConfig(response.data.data[0]);
            setErrores(prevErrores => ({ ...prevErrores, configuracion: null }));
          } else {
            setPrendaConfig(null);
            setErrores(prevErrores => ({
              ...prevErrores,
              configuracion: 'La combinación seleccionada no existe.',
            }));
            setTipoPrenda('');
            setCategoria('');
            setGenero('');
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching garment configuration:', error);
          setPrendaConfig(null);
        });
    }
  }, [categoria, genero, tipoPrenda]);

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
    if (!prendaConfig) erroresTemp.configuracion = 'Debe seleccionar una configuración válida.';

    if (Object.keys(erroresTemp).length > 0) {
      setErrores(erroresTemp);
      return;
    }

    const nuevaPrenda = {
      id: "00000000-0000-0000-0000-000000000000",
      reference: referencia,
      description: descripcion,
      garmentConfiguration: prendaConfig,
    };

    axios.post('http://localhost:8080/munamuinventory/api/v1/garments', nuevaPrenda)
      .then(response => {
        setMensaje(response.data.messages);
        setReferencia('');
        setDescripcion('');
        setCategoria('');
        setGenero('');
        setTipoPrenda('');
        setErrores({});
        setPrendaConfig(null);
        setTimeout(() => setMensaje(''), 5000);
      })
      .catch(error => console.error('Error al crear la prenda:', error));
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
                onChange={(e) =>{ setCategoria(e.target.value);
                  setGenero('');
                  setTipoPrenda('');
                }}
                disabled={loading}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((ca, index) => (
                  <option key={index} value={ca.id}>{ca.name}</option>
                ))}
              </select>
              {errores.categoria && <p className="error-message">{errores.categoria}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="genero" className="label">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) =>{ setGenero(e.target.value);
                  setTipoPrenda('');
                }}
                disabled={loading}
              >
                <option value="">Seleccione un género</option>
                {combinaciones[categoria]?.filter((comb, index, self) =>
                  index === self.findIndex((t) => t.genre.id === comb.genre.id) 
                ).map((comb, index) => (
                  <option key={index} value={comb.genre.id}>
                    {comb.genre.name}
                  </option>
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
                disabled={loading}
              ><option value="">Seleccione el tipo de prenda</option>
              {combinaciones[categoria]?.filter(comb => comb.genre.id === genero)
                .filter((value, index, self) =>
                  index === self.findIndex((t) => (
                    t.typeGarment.id === value.typeGarment.id
                  ))
                )
                .map((comb, index) => (
                  <option key={index} value={comb.typeGarment.id}>
                    {comb.typeGarment.name}
                  </option>              
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
          {errores.configuracion && <p className="error-message">{errores.configuracion}</p>}

          <div className="buttons">
            <button type="button" className="btn guardar" onClick={botonGuardar} disabled={loading}>
              Guardar
            </button>
          </div>

          {mensajeExito && <p className="exito-message">{mensajeExito}</p>}
        </form>
      </div>
    </div>
  );
};

export default App;
