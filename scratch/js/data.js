const TEACHER_CODE = '1234';
const directions = ['up', 'right', 'down', 'left'];
const directionSymbols = { up: '⬆️', right: '➡️', down: '⬇️', left: '⬅️' };

const progressCodes = {
 GIRO: {mission:2, message:'Código GIRO aceptado. Saltas a la Misión 3: giros.'},
 PLANIFICA: {mission:4, message:'Código PLANIFICA aceptado. Saltas a la Misión 5: obstáculos.'},
 BUCLE: {mission:7, message:'Código BUCLE aceptado. Saltas a la Misión 8: repetir y optimizar.'},
 DEPURA: {mission:10, message:'Código DEPURA aceptado. Saltas a la Misión 11: depuración.'},
 EXPERTO: {mission:14, message:'Código EXPERTO aceptado. Saltas a los retos finales.'}
};

const robotCheckpoints = {
 1: {code:'GIRO', text:'Has superado la base de secuencia y conteo. Anota el código GIRO para empezar otro día desde los giros.'},
 3: {code:'PLANIFICA', text:'Has superado giros y planificación. Anota el código PLANIFICA para empezar otro día desde obstáculos.'},
 7: {code:'BUCLE', text:'Has superado obstáculos y repetición. Anota el código BUCLE para continuar desde retos avanzados.'},
 10: {code:'DEPURA', text:'Has llegado a depuración. Anota el código DEPURA para continuar desde aquí.'},
 14: {code:'EXPERTO', text:'Has llegado a los retos expertos. Anota el código EXPERTO para continuar desde aquí.'},
 15: {code:'PROGRAMADOR', text:'Has completado el reto final. Código PROGRAMADOR conseguido.'}
};

const missions = [
 {title:'Misión 1',text:'Llega a la estrella avanzando en línea recta.',start:{x:0,y:3,dir:'right'},goal:{x:4,y:3},walls:[]},
 {title:'Misión 2',text:'Cuenta bien las casillas y llega exacto a la estrella.',start:{x:0,y:3,dir:'right'},goal:{x:5,y:3},walls:[]},
 {title:'Misión 3',text:'Necesitas girar una vez para llegar.',start:{x:0,y:3,dir:'right'},goal:{x:4,y:1},walls:[]},
 {title:'Misión 4',text:'Camino con dos giros.',start:{x:0,y:5,dir:'right'},goal:{x:5,y:2},walls:[]},
 {title:'Misión 5',text:'Rodea las rocas. Ya no vale ir en línea recta.',start:{x:0,y:3,dir:'right'},goal:{x:7,y:3},walls:[{x:3,y:2},{x:3,y:3},{x:3,y:4}]},
 {title:'Misión 6',text:'Sube, gira y busca un pasillo seguro.',start:{x:1,y:6,dir:'up'},goal:{x:6,y:1},walls:[{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3}]},
 {title:'Misión 7',text:'Rodea un muro largo sin salirte del tablero.',start:{x:0,y:6,dir:'right'},goal:{x:7,y:1},walls:[{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4},{x:5,y:3},{x:5,y:2}]},
 {title:'Misión 8',text:'Usa repetir para no escribir tantos bloques.',start:{x:0,y:7,dir:'right'},goal:{x:4,y:3},walls:[{x:2,y:6},{x:2,y:5},{x:2,y:4}]},
 {title:'Misión 9',text:'Laberinto corto: planifica antes de poner bloques.',start:{x:0,y:0,dir:'right'},goal:{x:7,y:7},walls:[{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4}]},
 {title:'Misión 10',text:'El camino correcto no es el más recto.',start:{x:7,y:7,dir:'left'},goal:{x:0,y:1},walls:[{x:4,y:7},{x:4,y:6},{x:4,y:5},{x:4,y:4},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}]},
 {title:'Misión 11: depuración',text:'Si chocas, no empieces de cero: localiza el primer bloque que falla.',start:{x:0,y:5,dir:'right'},goal:{x:7,y:2},walls:[{x:2,y:5},{x:2,y:4},{x:2,y:3},{x:5,y:3},{x:5,y:2},{x:5,y:1}]},
 {title:'Misión 12: depuración avanzada',text:'Observa la ejecución paso a paso y corrige solo lo necesario.',start:{x:6,y:7,dir:'up'},goal:{x:1,y:0},walls:[{x:6,y:4},{x:5,y:4},{x:4,y:4},{x:3,y:4},{x:3,y:3},{x:3,y:2}]},
 {title:'Misión 13: optimización',text:'Llega a la estrella intentando usar el menor número de bloques posible.',start:{x:0,y:7,dir:'right'},goal:{x:7,y:0},walls:[{x:2,y:7},{x:2,y:6},{x:2,y:5},{x:4,y:4},{x:5,y:4},{x:6,y:4},{x:6,y:3},{x:6,y:2}]},
 {title:'Misión 14: ruta precisa',text:'Hay varios caminos, pero solo uno te evita dar rodeos innecesarios.',start:{x:7,y:0,dir:'down'},goal:{x:0,y:7},walls:[{x:5,y:1},{x:5,y:2},{x:5,y:3},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:2,y:5}]},
 {title:'Misión 15: reto experto',text:'Planifica una ruta larga. Cuenta, gira y comprueba con calma.',start:{x:0,y:0,dir:'right'},goal:{x:7,y:6},walls:[{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:6,y:2},{x:6,y:3},{x:6,y:4},{x:3,y:5},{x:4,y:5},{x:5,y:5}]},
 {title:'Misión 16: reto final',text:'Última misión: demuestra que sabes planificar, programar y depurar.',start:{x:0,y:7,dir:'up'},goal:{x:7,y:0},walls:[{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:3,y:3},{x:3,y:2},{x:5,y:5},{x:5,y:4},{x:5,y:3},{x:5,y:2},{x:6,y:2}]}
];
