
const gastos = [
  { descripcion: 'Pago de alquiler del apartamento', monto: 180, categoria: 'vivienda' },
  { descripcion: 'Compra de víveres en el mercado', monto: 62.75, categoria: 'alimentacion' },
  { descripcion: 'Recarga de tarjeta de bus', monto: 12.5, categoria: 'transporte' },
  { descripcion: 'Entradas al cine', monto: 18, categoria: 'entretenimiento' },
  { descripcion: 'Consulta médica general', monto: 100, categoria: 'salud' },
  { descripcion: 'Almuerzo en la pupusería', monto: 7.25, categoria: 'alimentacion' },
  { descripcion: 'Gasolina del mes', monto: 55.99, categoria: 'transporte' }
];


const esGastoAlto = (monto) => monto >= 100;
const redondear = (valor) => Math.round(valor * 100) / 100;


function calcularTotal(gastos) {
  let total = 0;
  for (let i = 0; i < gastos.length; i++) {
    if (typeof gastos[i].monto !== 'number') {
      throw new Error('El monto del gasto "' + gastos[i].descripcion + '" no es un número.');
    }
    total += gastos[i].monto;
  }
  return total;
}

function calcularPromedio(gastos) {
  if (gastos.length === 0) {
    throw new Error('No se puede calcular el promedio de una lista de gastos vacía.');
  }
  return calcularTotal(gastos) / gastos.length;
}

function filtrarPorCategoria(gastos, categoria) {
  const filtrados = [];
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].categoria === categoria) {
      filtrados[filtrados.length] = gastos[i];
    }
  }
  return filtrados;
}

function obtenerMayorGasto(gastos) {
  if (gastos.length === 0) {
    return null;
  }
  let mayor = gastos[0];
  for (let i = 1; i < gastos.length; i++) {
    if (gastos[i].monto > mayor.monto) {
      mayor = gastos[i];
    }
  }
  return mayor;
}

function clasificarGasto(monto) {
  if (esGastoAlto(monto)) {
    return 'Alto';
  } else if (monto >= 50) {
    return 'Medio';
  } else {
    return 'Bajo';
  }
}

function describirCategoria(categoria) {
  switch (categoria) {
    case 'alimentacion':
      return 'Gastos en comida y productos del hogar';
    case 'transporte':
      return 'Gastos de movilización y combustible';
    case 'vivienda':
      return 'Gastos de alquiler y servicios de la vivienda';
    case 'entretenimiento':
      return 'Gastos de ocio y diversión';
    case 'salud':
      return 'Gastos médicos y de bienestar';
    default:
      return 'Categoría sin descripción registrada';
  }
}

function crearContadorDeAltos() {
  let contador = 0;
  return function () {
    contador++;
    return contador;
  };
}

try {
  // 1. Gastos clasificados
  const gastosClasificados = [];
  for (let i = 0; i < gastos.length; i++) {
    gastosClasificados[gastosClasificados.length] = {
      descripcion: gastos[i].descripcion,
      monto: gastos[i].monto,
      categoria: gastos[i].categoria,
      nivel: clasificarGasto(gastos[i].monto),
      descripcionCategoria: describirCategoria(gastos[i].categoria)
    };
  }

  const contarAlto = crearContadorDeAltos();
  let cantidadAltos = 0;
  for (let i = 0; i < gastosClasificados.length; i++) {
    if (gastosClasificados[i].nivel === 'Alto') {
      cantidadAltos = contarAlto();
    }
  }


  console.log('--- Gastos clasificados ---');
  console.table(gastosClasificados);


  const total = calcularTotal(gastos);
  const promedio = calcularPromedio(gastos);
  console.log('Total gastado: $' + total.toFixed(2));
  console.log('Promedio por gasto: $' + promedio.toFixed(2));

  const mayorGasto = obtenerMayorGasto(gastos);
  console.log(
    'Gasto más alto: ' + mayorGasto.descripcion +
    ' por $' + mayorGasto.monto.toFixed(2) +
    ' (categoría: ' + mayorGasto.categoria + ')'
  );


  console.log('Cantidad de gastos de nivel Alto: ' + cantidadAltos);

  const categoriaElegida = 'alimentacion';
  const gastosFiltrados = filtrarPorCategoria(gastos, categoriaElegida);
  console.log('Gastos de la categoría "' + categoriaElegida + '" (' + gastosFiltrados.length + ' encontrados):');
  console.log(gastosFiltrados);

  const resumenPorCategoria = {};
  for (let i = 0; i < gastos.length; i++) {
    const categoria = gastos[i].categoria;
    if (resumenPorCategoria[categoria] === undefined) {
      resumenPorCategoria[categoria] = 0;
    }
    resumenPorCategoria[categoria] += gastos[i].monto;
  }
  for (const categoria in resumenPorCategoria) {
    resumenPorCategoria[categoria] = redondear(resumenPorCategoria[categoria]);
  }


  const informe = {
    total: redondear(total),
    promedio: redondear(promedio),
    cantidadAltos: cantidadAltos,
    mayorGasto: mayorGasto,
    resumenPorCategoria: resumenPorCategoria
  };
  console.log('--- Informe final ---');
  console.log(JSON.stringify(informe, null, 2));
} catch (error) {
  console.error('Ocurrió un error al procesar los gastos: ' + error.message);
}


try {
  calcularPromedio([]);
} catch (error) {
  console.error('Error controlado capturado: ' + error.message);
}
