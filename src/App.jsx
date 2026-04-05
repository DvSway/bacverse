import { useState } from 'react'
import db from './db.json'
import './App.css'

// LA MEGA-LISTA DE PRUEBAS AGRUPADAS
const categoriasPruebas = {
  "Morfología y Pruebas Rápidas": [
    { id: 'gram', label: 'Tinción de Gram', opciones: ['+', '-'] },
    { id: 'forma', label: 'Morfología', opciones: ['Cocos', 'Bacilos', 'Bacilos curvados', 'Cocobacilos', 'Diplococos'] },
    { id: 'catalasa', label: 'Catalasa', opciones: ['+', '-'] },
    { id: 'oxidasa', label: 'Oxidasa', opciones: ['+', '-'] },
    { id: 'coagulasa', label: 'Coagulasa', opciones: ['+', '-'] },
    { id: 'superoxol', label: 'Superoxol', opciones: ['+', '-'] }
  ],
  "Metabolismo": [
    { id: 'tsi', label: 'TSI (Triple Sugar Iron)', opciones: ['A/A', 'K/A', 'K/K'] },
    { id: 'kia', label: 'KIA (Kligler)', opciones: ['A/A', 'K/A', 'K/K'] },
    { id: 'lia', label: 'LIA (Lysine Iron Agar)', opciones: ['K/K', 'K/A', 'R/A'] },
    { id: 'gas', label: 'Producción de Gas', opciones: ['+', '-'] },
    { id: 'h2s', label: 'Producción de H2S', opciones: ['+', '-'] },
    { id: 'citrato', label: 'Citrato de Simmons', opciones: ['+', '-'] },
    { id: 'ureasa', label: 'Urea (Christensen/Stuart)', opciones: ['+', '-'] },
    { id: 'movilidad', label: 'Movilidad (25°/37°)', opciones: ['+', '-'] },
    { id: 'indol', label: 'Producción de Indol', opciones: ['+', '-'] },
  ],
    "Utilización de Carbohidratos": [  
    { id: 'manitol', label: 'Manitol', opciones: ['+', '-'] },
    { id: 'purpura_xilosa', label: 'Púrpura Bromocresol: Xilosa', opciones: ['+', '-'] },
    { id: 'purpura_manosa', label: 'Púrpura Bromocresol: Manosa', opciones: ['+', '-'] },
    { id: 'purpura_sacarosa', label: 'Púrpura Bromocresol: Sacarosa', opciones: ['+', '-'] },
    { id: 'purpura_trealosa', label: 'Púrpura Bromocresol: Trealosa', opciones: ['+', '-'] },
    { id: 'cta_glucosa', label: 'CTA Glucosa', opciones: ['+', '-'] },
    { id: 'cta_maltosa', label: 'CTA Maltosa', opciones: ['+', '-'] },
    { id: 'cta_lactosa', label: 'CTA Lactosa', opciones: ['+', '-'] },
    { id: 'cta_sacarosa', label: 'CTA Sacarosa', opciones: ['+', '-'] }
  ],
  "Vías Metabólicas y Enzimas Específicas": [
    { id: 'rm', label: 'Rojo de Metilo (RM)', opciones: ['+', '-'] },
    { id: 'vp', label: 'Voges-Proskauer (VP)', opciones: ['+', '-'] },
    { id: 'fenilalanina', label: 'Fenilalanina / PDA', opciones: ['+', '-'] },
    { id: 'nitratos', label: 'Reducción Nitratos', opciones: ['+', '-'] },
    { id: 'gelatinasa', label: 'Licuefacción Gelatina', opciones: ['+', '-'] },
    { id: 'adh', label: 'Arginina (ADH)', opciones: ['+', '-'] },
    { id: 'odc', label: 'Ornitina (ODC)', opciones: ['+', '-'] },
    { id: 'ldc', label: 'Lisina (LDC)', opciones: ['+', '-'] },
    { id: 'arabinosa', label: 'Utilización de Arabinosa', opciones: ['+', '-'] },
    { id: 'hipurato', label: 'Hidrólisis de Hipurato', opciones: ['+', '-'] },
  ],
  "O/F y Exigentes": [
    { id: 'of_glucosa', label: 'O/F Hugh-Leifson Glucosa', opciones: ['Oxidador', 'Fermentador', 'Asacarolitico'] },
    { id: 'of_ss_xilosa', label: 'O/F Xilosa (Sin sello)', opciones: ['+', '-'] },
    { id: 'of_ss_lactosa', label: 'O/F Lactosa (Sin sello)', opciones: ['+', '-'] },
    { id: 'of_ss_manitol', label: 'O/F Manitol (Sin sello)', opciones: ['+', '-'] },
    { id: 'leche_tornasolada', label: 'Leche Tornasolada', opciones: ['Ácida', 'Peptonización', 'Coagulación'] },
    { id: 'proteolisis_leche_fierro', label: 'Proteólisis en Leche Fierro', opciones: ['+', '-'] },
    { id: 'factor_x', label: 'Factor X', opciones: ['Requiere', 'No requiere'] },
    { id: 'factor_v', label: 'Factor V', opciones: ['Requiere', 'No requiere'] },
    { id: 'porfirina_ala', label: 'Prueba ALA (Porfirina)', opciones: ['+', '-'] }
  ],
  "Pruebas y Taxos": [
    { id: 'novobiocina', label: 'Taxo Novobiocina', opciones: ['Sensible', 'Resistente'] },
    { id: 'bacitracina', label: 'Taxo Bacitracina', opciones: ['Sensible', 'Resistente'] },
    { id: 'optoquina', label: 'Optoquina', opciones: ['Sensible', 'Resistente'] },
    { id: 'polimixina_b', label: 'Taxo Polimixina B', opciones: ['Sensible', 'Resistente'] },
    { id: 'o129', label: 'Vibriostático O/129', opciones: ['Sensible', 'Resistente'] },
    { id: 'camp', label: 'Prueba de CAMP', opciones: ['+', '-'] },
    { id: 'bilis_esculina', label: 'Bilis Esculina', opciones: ['+', '-'] },
    { id: 'telurito', label: 'Tolerancia a Telurito', opciones: ['+', '-'] },
    { id: 'lipasa', label: 'Lipasa (Yema de Huevo)', opciones: ['+', '-'] },
    { id: 'lecitinasa', label: 'Lecitinasa (Yema de Huevo)', opciones: ['+', '-'] },
    { id: 'fucsina_20ug', label: 'Fucsina Básica 20 µg', opciones: ['+', '-'] },
    { id: 'tionina_20ug', label: 'Tionina 20 µg', opciones: ['+', '-'] },
    { id: 'tionina_40ug', label: 'Tionina 40 µg', opciones: ['+', '-'] },
    { id: 'nacl_0', label: 'Desarrollo NaCl 0%', opciones: ['+', '-'] },
    { id: 'nacl_6', label: 'Desarrollo NaCl 6%', opciones: ['+', '-'] },
    { id: 'nacl_8', label: 'Desarrollo NaCl 8%', opciones: ['+', '-'] }
  ]
};

function App() {
  const [vistaActiva, setVistaActiva] = useState('catalogo');
  const [categoriaActiva, setCategoriaActiva] = useState('medios');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroEspecial, setFiltroEspecial] = useState('Todos');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const [modoIdentificador, setModoIdentificador] = useState('por_pruebas');
  const [bacteriaBuscada, setBacteriaBuscada] = useState('');
  // Inicializamos el filtro vacío, así soporta cualquier cantidad de pruebas dinámicas
  const [perfilFiltro, setPerfilFiltro] = useState({}); 

  // Lógica del Catálogo
  let listaFiltrada = categoriaActiva === 'medios' ? db.medios_de_cultivo : db.pruebas_bioquimicas;
  if (filtroEspecial !== 'Todos') {
    const categoriaInfo = db.filtros.find(f => f.nombre === filtroEspecial);
    if (categoriaInfo) {
      listaFiltrada = listaFiltrada.filter(item => 
        categoriaInfo.claves.some(clave => item.nombre.toLowerCase().includes(clave.toLowerCase()))
      );
    }
  }
  if (terminoBusqueda) {
    listaFiltrada = listaFiltrada.filter(item => item.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()));
  }

  // Lógica del Identificador: Por Pruebas
  const bacteriasFiltradasPorPruebas = (db.perfiles_bacterianos || []).filter(bac => {
    return Object.keys(perfilFiltro).every(key => {
      if (!perfilFiltro[key] || perfilFiltro[key] === 'Cualquiera') return true;
      return bac[key] === perfilFiltro[key];
    });
  });

  // Lógica del Identificador: Por Nombre (Oculta resultados si la barra está vacía)
  const bacteriasFiltradasPorNombre = bacteriaBuscada.trim() === '' 
    ? [] 
    : (db.perfiles_bacterianos || []).filter(bac => 
        bac.nombre.toLowerCase().includes(bacteriaBuscada.toLowerCase())
      );

  const handleFiltroChange = (pruebaId, valor) => {
    setPerfilFiltro({ ...perfilFiltro, [pruebaId]: valor });
  };

  const limpiarFiltros = () => setPerfilFiltro({});

  return (
    <div className="laboratorio-app">
      <header>
        <h1>Bacteriología Virtual 🔬</h1>
        <p>Cátalogo de Medios, Pruebas Bioquímicas e Identificación de Bacterias</p>
      </header>

      <nav className="menu-principal">
        <button className={vistaActiva === 'catalogo' && categoriaActiva === 'medios' ? 'btn-activo' : ''} 
          onClick={() => { setVistaActiva('catalogo'); setCategoriaActiva('medios'); }}>🧫 Medios de Cultivo</button>
        <button className={vistaActiva === 'catalogo' && categoriaActiva === 'pruebas' ? 'btn-activo' : ''} 
          onClick={() => { setVistaActiva('catalogo'); setCategoriaActiva('pruebas'); }}>🧪 Pruebas Bioquímicas</button>
        <button className={vistaActiva === 'identificador' ? 'btn-activo' : ''} 
          onClick={() => setVistaActiva('identificador')}>🦠 Identificador Presuntivo</button>
      </nav>

      {/* VISTA 1: CATÁLOGO (Igual que siempre) */}
      {vistaActiva === 'catalogo' && (
        <>
          <div className="controles-busqueda">
            <input type="text" placeholder={`Buscar en ${categoriaActiva === 'medios' ? 'medios' : 'pruebas'}...`}
              value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)} className="barra-busqueda" />
            
            <div className="contenedor-hamburguesa">
              <button className="btn-hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)} title="Filtros">☰</button>
              {menuAbierto && (
                <div className="menu-flotante">
                  <button className={filtroEspecial === 'Todos' ? 'filtro-activo' : ''} onClick={() => { setFiltroEspecial('Todos'); setMenuAbierto(false); }}>Ver todos</button>
                  {db.filtros.map((filtro, index) => (
                    <button 
                      key={index} 
                      className={filtroEspecial === filtro.nombre ? 'filtro-activo' : ''} 
                      onClick={() => { setFiltroEspecial(filtro.nombre); setMenuAbierto(false); }}
                      dangerouslySetInnerHTML={{ __html: filtro.nombre }} /* MAGIA EN EL MENÚ */
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <main className="grid-tarjetas">
            {listaFiltrada.length > 0 ? (
              listaFiltrada.map((item, index) => (
                <div key={index} className="tarjeta">
                  <div className="tarjeta-imagen-placeholder">
                    {item.imagenes ? <img src={Object.values(item.imagenes)[0]} alt={item.nombre} className="img-miniatura" /> : <span>📷 Foto aquí</span>}
                  </div>
                  <div className="tarjeta-contenido">
                    <h2 style={{ color: '#a086d2', marginBottom: '10px' }}>{item.nombre}</h2>
                    
                    {/* MAGIA EN EL RESUMEN CON CSS LINE-CLAMP */}
                    <div style={{ 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden',
                      marginBottom: '15px',
                      fontSize: '0.9rem',
                      color:'#94a3b8'
                    }}>
                      <strong>Fundamento:</strong> <span dangerouslySetInnerHTML={{ __html: item.fundamento }} />
                    </div>

                    <button className="btn-detalles" onClick={() => setItemSeleccionado(item)}>Ver detalles</button>
                  </div>
                </div>
              ))
            ) : <p className="mensaje-vacio">No se encontraron elementos.</p>}
          </main>
        </>
      )}

      {/* VISTA 2: IDENTIFICADOR PRESUNTIVO */}
      {vistaActiva === 'identificador' && (
        <div className="identificador-container">
          <div className="tabs-identificador">
            <button className={modoIdentificador === 'por_pruebas' ? 'tab-activa' : ''} onClick={() => setModoIdentificador('por_pruebas')}>
              Encontrar Bacteria
            </button>
            <button className={modoIdentificador === 'por_bacteria' ? 'tab-activa' : ''} onClick={() => setModoIdentificador('por_bacteria')}>
              Encontrar Perfil Bioquímico
            </button>
          </div>

          {/* MODO 1: METES PRUEBAS */}
          {modoIdentificador === 'por_pruebas' && (
            <div className="panel-identificador">
              
              <div className="formulario-pruebas">
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                   <h3>Ingresa los Resultados</h3>
                   <button onClick={limpiarFiltros} className="btn-limpiar">Resetear</button>
                </div>
                
                {/* ACORDEONES POR CATEGORÍA */}
                {Object.entries(categoriasPruebas).map(([nombreCategoria, pruebas]) => (
                  <details key={nombreCategoria} className="acordeon-categoria">
                    <summary>{nombreCategoria}</summary>
                    <div className="contenido-acordeon">
                      {pruebas.map(prueba => (
                        <div key={prueba.id} className="grupo-input">
                          <label>{prueba.label}</label>
                          <select 
                            value={perfilFiltro[prueba.id] || 'Cualquiera'} 
                            onChange={(e) => handleFiltroChange(prueba.id, e.target.value)}
                          >
                            <option value="Cualquiera">Cualquiera / Variable</option>
                            {prueba.opciones.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>

              {/* RESULTADOS DE LAS BACTERIAS */}
              <div className="resultados-bacterias">
                <h3>Posibles Bacterias ({bacteriasFiltradasPorPruebas.length})</h3>
                {bacteriasFiltradasPorPruebas.length > 0 ? (
                  bacteriasFiltradasPorPruebas.map((bac, i) => (
                    <div key={i} className="tarjeta-bacteria">
                      <h3>{bac.nombre}</h3>
                      <div className="grid-perfil">
                        {Object.entries(bac).map(([clave, valor]) => {
                          if (clave === 'nombre') return null;
                          const claseColor = valor.includes('+') || valor === 'Sensible' || valor === 'A/A' ? 'badge-positivo' : valor.includes('-') || valor === 'Resistente' || valor === 'K/K' ? 'badge-negativo' : '';
                          return <div key={clave} className="badge-prueba"><strong>{clave.replace(/_/g, ' ').toUpperCase().replace('NACL','NaCl')}:</strong> <span className={claseColor}>{valor}</span></div>
                        })}
                      </div>
                    </div>
                  ))
                ) : <p>Ningún perfil coincide con esta combinación exacta.</p>}
              </div>
            </div>
          )}

          {/* MODO 2: METES BACTERIA */}
          {modoIdentificador === 'por_bacteria' && (
            <div className="panel-identificador" style={{ gridTemplateColumns: '1fr' }}>
              <input type="text" placeholder="Escribe el nombre de la bacteria (ej. Streptococcus)..."
                value={bacteriaBuscada} onChange={(e) => setBacteriaBuscada(e.target.value)} className="barra-busqueda" style={{ marginBottom: '2rem' }} />
              
              <div className="resultados-bacterias" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {bacteriasFiltradasPorNombre.map((bac, i) => (
                  <div key={i} className="tarjeta-bacteria">
                    <h3>{bac.nombre}</h3>
                    <div className="grid-perfil">
                      {/* AQUÍ OCURRE LA MAGIA: Solo muestra las pruebas que están en el JSON */}
                      {Object.entries(bac).map(([clave, valor]) => {
                        if (clave === 'nombre') return null;
                        const claseColor = valor.includes('+') || valor === 'Sensible' || valor === 'A/A' ? 'badge-positivo' : valor.includes('-') || valor === 'Resistente' || valor === 'K/K' ? 'badge-negativo' : '';
                        return <div key={clave} className="badge-prueba"><strong>{clave.replace(/_/g, ' ').toUpperCase().replace('NACL','NaCl')}:</strong> <span className={claseColor}>{valor}</span></div>
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
     {/* MODAL DEL CATÁLOGO */}
      {itemSeleccionado && vistaActiva === 'catalogo' && (
        <div className="modal-fondo" onClick={() => setItemSeleccionado(null)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar" onClick={() => setItemSeleccionado(null)}>✖</button>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-primario)' }}>{itemSeleccionado.nombre}</h2>
            
           {/* 1. PRIMERO LA TEORÍA (Fundamento e Interpretación) */}
            <div className="modal-info" style={{ marginTop: '1rem' }}>
              {itemSeleccionado.composicion && <p style={{ marginBottom: '0.8rem' }}><strong>Composición:</strong> <span dangerouslySetInnerHTML={{ __html: itemSeleccionado.composicion }} /></p>}
              
              <p style={{ marginBottom: '0.8rem' }}><strong>Fundamento:</strong> <span dangerouslySetInnerHTML={{ __html: itemSeleccionado.fundamento }} /></p>
              
              {itemSeleccionado.interpretacion && (
                <>
                  <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--color-acento)' }}>Interpretación:</h3>
                  <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {itemSeleccionado.interpretacion.map((linea, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: linea }}></li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* 2. LUEGO LA PRÁCTICA (Imágenes abajo, centradas y con divisor) */}
            {itemSeleccionado.imagenes && (
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                marginTop: '1.5rem', 
                paddingTop: '1.5rem', 
                borderTop: '1px solid var(--borde)' 
              }}>
                {Object.entries(itemSeleccionado.imagenes).map(([tituloImagen, url], idx) => (
                  <div key={idx} style={{ flex: '1 1 200px', maxWidth: '250px', textAlign: 'center' }}>
                    <img src={url} alt={tituloImagen} style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--borde)', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }} />
                    <p style={{ 
                      marginTop: '0.8rem', 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold', 
                      color: '#a086d2', 
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {tituloImagen.replace(/_/g, ' ')}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default App