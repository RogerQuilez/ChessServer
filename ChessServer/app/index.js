import {socket} from './socket.js'
import {Board} from './classes/Board.js'
import {Pawn} from './classes/pieces/Pawn.js'
import {Rook} from './classes/pieces/Rook.js'
import {Knight} from './classes/pieces/Knight.js'
import {Bishop} from './classes/pieces/Bishop.js'
import {Queen} from './classes/pieces/Queen.js'
import {King} from './classes/pieces/King.js'
import {Color} from './types/Color.js';
import {PieceTypes} from './types/PieceTypes.js';

/*** VARIABLES CONSTANTES ***/

    /**
    * @type {integer} WIDTH_CANVAS = Anchura del canvas
    * @type {integer} HEIGHT_CANVAS = Altura del canvas
    */
    const WIDTH_CANVAS = 800;
    const HEIGHT_CANVAS = 700;

    /**
    * @type {integer} FILES = Filas del TABLERO
    * @type {integer} RANKS = Columnas del TABLERO
    */
    const FILES = 8;
    const RANKS = 8;

/*** --VARIABLES CONSTANTES-- ***/

/*** THEMES ***/

    /**
    * @type {Object} theme = Themes para nuestro tablero
    * @type {{light: string, dark: string}}
    */
    const theme = {
        light: '#eeeed2',
        dark: '#e09219'
    }

    /**
    * @type {Object} pieceTheme = Themes para piezas Ajedrez
    * @type {{light: string, dark: string}}
    */
    const pieceTheme = {
        light: '#FFFFFF',
        dark: '#000000'
    }

/*** --THEMES-- ***/

/*** Inicializacion de la clase Board ***/
const board = new Board(WIDTH_CANVAS, HEIGHT_CANVAS, FILES, RANKS, theme, pieceTheme);
/*** --Inicializacion de la clase Board ***/

/* Definimos que en el evento "init board" inicialice las piezas en el tablero con su posición correspondiente */
socket.on('init board', (serverPieces) => {
    serverPieces.forEach((rank, i) => {
        rank.forEach((p, j) => {

            /* Si no hay una pieza salimos del bucle */
            if (!p) return;

            /* Separamos el elemento del array en dos para conseguir el color de la pieza y el tipo */
            const [colorType, pieceType] = p.split('');
            
            /* Asignamos el color de la pieza */
            const color = colorType == 'b' ? Color.THEME.dark : Color.THEME.light;
    
            let piece;
            
            /* Construimos la pieza en la celda correspondiente */
            if (pieceType == PieceTypes.PIECES.pawn) piece = new Pawn(color);
            else if (pieceType == PieceTypes.PIECES.rook) piece = new Rook(color);
            else if (pieceType == PieceTypes.PIECES.knight) piece = new Knight(color);
            else if (pieceType == PieceTypes.PIECES.bishop) piece = new Bishop(color);
            else if (pieceType == PieceTypes.PIECES.queen) piece = new Queen(color);
            else if (pieceType == PieceTypes.PIECES.king) piece = new King(color);
    
            board.initPlacePiece(j, i, piece);
        })
    })  

    

    /* Renderizamos el tablero */
    board.renderBoard();
})

socket.on('match', function(data){
    alert(data);
})








