import {Piece} from '../Piece.js';
import {PieceTypes} from '../../types/PieceTypes.js';

/**
 * @class Knight @constructor
 * @param {String} color
 */
class Knight extends Piece {
    
    constructor(color){
        super(color, ['♞', '♘'], PieceTypes.PIECES.knight);
    }

    /**
     * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Knight
     * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Knight
     * @param {Array<Integer>} boardMatrix = Tablero del juego
     */
    availableMovements(position, boardMatrix){

        /* Comprobamos que la pieza se pueda mover */
        if (!this.canMovePiece(position, boardMatrix)) return;

        var canMove = 0;

        const [i, j] = position;

        /* Posibles movimientos del caballo */
        const possibleMoves = [
            [i - 1, j - 2], 
            [i + 1, j - 2], 
            [i + 2, j - 1],
            [i + 2, j + 1],
            [i - 2, j + 1],
            [i + 1, j + 2],
            [i - 1, j + 2],
            [i - 2, j - 1]
        ];

        /* Recorremos el array para ver cuales son las casillas disponibles para el caballo */
        for (let i = 0; i < possibleMoves.length; i++){
            const cell = this.getCellFromCoords(possibleMoves[i], boardMatrix);
            if (cell &&  !(cell.piece && cell.piece.color == this.color)){
                canMove++;
                cell.setAvailableMovement(true);
            } 
        }

        return canMove;
    }

    /**
     * @function canStopCheck = En caso de que la pieza pueda aturar el jaque, se habilitará la celda que puede proteger del jaque del rey
     * @param {Array<integer, integer>} checkCellIJ = Array de las coordenadas que están haciendo jaque al rey
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
    canStopCheck(checkCellIJ, boardMatrix){

        var canMove = 0;

        const [iCheckCell, jCheckCell] = checkCellIJ;
        const checkCell = this.getCellFromCoords([iCheckCell, jCheckCell], boardMatrix);
        var iKing = 0;
        var jKing = 0;
        var cellKing = null;
        var iDir = 0;
        var jDir = 0;

        /* Conseguimos donde se encuentra el rey que está amenazado */
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                const cell = boardMatrix[i][j];
                if (cell.piece){
                    if (cell.piece.type == PieceTypes.PIECES.king && cell.piece.color == this.color){
                        iKing = i;
                        jKing = j;
                        cellKing = cell;
                    }
                }
            }
        }

        /* Definimos la direccion dependiendo de las coordenadas donde se encuentra el rey y de las coordenadas donde se encuentra la celda que amenaza el rey */
        if (iKing > iCheckCell && jKing < jCheckCell){
            iDir = -1;
            jDir = 1;
        } else if (iKing < iCheckCell && jKing < jCheckCell){
            iDir = 1;
            jDir = 1;
        } else if (iKing > iCheckCell && jKing > jCheckCell){
            iDir = -1;
            jDir = -1;
        }else if (iKing < iCheckCell && jKing > jCheckCell){
            iDir = 1;
            jDir = -1;
        }else if (iKing < iCheckCell && jKing == jCheckCell){
            iDir = 1;
            jDir = 0;
        } else if (iKing > iCheckCell && jKing == jCheckCell){
            iDir = -1;
            jDir = 0;
        } else if (iKing == iCheckCell && jKing < jCheckCell){
            iDir = 0;
            jDir = 1;
        } else {
            iDir = 0;
            jDir = -1;
        }

        if (checkCell.piece.type == PieceTypes.PIECES.queen || checkCell.piece.type == PieceTypes.PIECES.bishop || checkCell.piece.type == PieceTypes.PIECES.rook){
            /* Recorremos las casillas que están amenazadas por la pieza que da jaque al rey */
            for (let k = 1; k <= boardMatrix.length; k++){

                /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
                var cell = this.getCellFromCoords([iKing + (k * iDir), jKing + (k * jDir)], boardMatrix);
                var iNextCell = iKing + (k * iDir);
                var jNextCell = jKing + (k * jDir);
                if (!cell) break;
                if (cell.piece && cell.piece.color == this.color) break;
                
                /* Definimos los posibles saltos del caballo para aturar la celda amenazada */
                const knightMoves = [
                    [iNextCell - 1, jNextCell - 2], 
                    [iNextCell + 1, jNextCell - 2], 
                    [iNextCell + 2, jNextCell - 1],
                    [iNextCell + 2, jNextCell + 1],
                    [iNextCell - 2, jNextCell + 1],
                    [iNextCell + 1, jNextCell + 2],
                    [iNextCell - 1, jNextCell + 2],
                    [iNextCell - 2, jNextCell - 1]
                ];

                /* Por cada celda miramos si la pieza puede interponerse en ella para parar el jaque */
                for (let x = 0; x < knightMoves.length; x++){

                    const cellPiece = this.getCellFromCoords(knightMoves[x], boardMatrix); 

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPiece){
                        if (cellPiece.piece){
                            if (cellPiece.piece.color == cellKing.piece.color && cellPiece.piece == this){
                                canMove++;
                                cell.setAvailableMovement(true);
                            }
                                
                        } 
                    }
                    
                }

                if (cell.piece) break;
            }

        }  else {
            
            /* Definimos los posibles saltos del caballo para aturar la celda amenazada */
            const knightMoves = [
                [iCheckCell - 1, jCheckCell - 2], 
                [iCheckCell + 1, jCheckCell - 2], 
                [iCheckCell + 2, jCheckCell - 1],
                [iCheckCell + 2, jCheckCell + 1],
                [iCheckCell - 2, jCheckCell + 1],
                [iCheckCell + 1, jCheckCell + 2],
                [iCheckCell - 1, jCheckCell + 2],
                [iCheckCell - 2, jCheckCell - 1]
            ];

            /* En caso de que el caballo seleccionado esté a un salto del caballo que amenaza la celda, habilitamos el movimiento para poder comerlo */
            for (let m = 0; m < knightMoves.length; m++){
                const cell = this.getCellFromCoords(knightMoves[m], boardMatrix);
                if (cell) {
                    if (cell.piece && cell.piece == this) {
                        canMove++;
                        checkCell.setAvailableMovement(true);
                    }
                }
            }
        }

        return canMove;
        
    }
}

export {Knight}