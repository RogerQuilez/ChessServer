import {Piece} from '../Piece.js';
import {PieceTypes} from '../../types/PieceTypes.js';
import {Color} from '../../types/Color.js';

class King extends Piece {

    /**
     * @type {boolean} isCheck = nos indica si el rey se encuentra en jaque
     */
    isCheck;

    /**
     * @type {Array<integer, integer>} directions = indica las direcciones posibles a las que se puede mover el rey
     */
    directions = [
        [1, 1],
        [-1, 1],
        [1, -1], 
        [-1, -1], 
        [0, -1], 
        [1, 0],
        [0, 1],
        [-1, 0]
    ];

    /**
     * @class King @counstructor
     * @param {String} color
     */
    constructor(color){
        super(color, ['♚', '♔'], PieceTypes.PIECES.king);
        this.isCheck = false;
    }

    /**
     * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza King
     * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza King
     * @param {Array<Integer>} boardMatrix = Tablero del juego
     */
     availableMovements(position, boardMatrix){
        const [i, j] = position;

        var canMove = 0;

        /* Recorremos el array de posibles movimientos */
        for (let k = 0; k < this.directions.length; k++){
            const iDir = this.directions[k][0];
            const jDir = this.directions[k][1];
            
            /* Cogemos la celda de las diferentes direcciones que tiene el rey */
            const cell = this.getCellFromCoords([i + (1 * iDir), j + (1 * jDir)], boardMatrix);

            /* En caso de que haya celda y que la celda no contenga una pieza de nuestro color, indicamos que la celda es una celda válida */
            if (cell && !(cell.piece && cell.piece.color == this.color)){

                if (!this.isThreatCell([i + (1 * iDir), j + (1 * jDir)], boardMatrix)){
                    cell.setAvailableMovement(true);
                    canMove++;
                } 
            } 

        }

        if (this.moved) return canMove;

        /* Enroque blanco */

        /* Celda de enroque corto */
        const cellCastleKingShort = this.getCellFromCoords([i + 2, j], boardMatrix);

        /* Celda de alfil enroque corto */
        const cellCastleShortBishop = this.getCellFromCoords([i + 1, j], boardMatrix);

        /* Celda de torre enroque corto */
        const cellCastleShortRook = this.getCellFromCoords([i + 3, j], boardMatrix);

        /* En caso de que la celda donde debe encontrarse se haya movido no entramos en la condición */
        if (!cellCastleShortBishop.piece){
            if (cellCastleShortRook.piece && !cellCastleShortRook.piece.moved){
                if (cellCastleKingShort && !(cellCastleKingShort.piece && cellCastleKingShort.piece.color == this.color)){
                    /* Comprobamos que ninguna celda del enroque esté amenazada */
                    if (!(this.isThreatCell([i + 2, j], boardMatrix) || this.isThreatCell([i + 1, j], boardMatrix) || this.isThreatCell([i, j], boardMatrix))){
                        canMove++;
                        cellCastleKingShort.setAvailableMovement(true);
                    }
                        
                }
            }
        }        
        
        /* Enroque largo */

        /* Celda de enroque largo */
        const cellCastleKingLong = this.getCellFromCoords([i - 2, j], boardMatrix);

        /* Celda de alfil enroque largo */
        const cellCastleLongKnight = this.getCellFromCoords([i - 3, j], boardMatrix);

        /* Celda de reina enroque largo */
        const cellCastleLongQueen = this.getCellFromCoords([i - 1, j], boardMatrix);

        /* Celda de torre enroque largo */
        const cellCastleLongRook = this.getCellFromCoords([i - 4, j], boardMatrix);
        
        /* En caso de que la celda donde debe encontrarse se haya movido no entramos en la condición */
        if (!cellCastleLongKnight.piece && !cellCastleLongQueen.piece){
            if (cellCastleLongRook.piece && !cellCastleLongRook.piece.moved){
                if (cellCastleKingLong && !(cellCastleKingLong.piece && cellCastleKingLong.piece.color == this.color)){
                    /* Comprobamos que ninguna celda del enroque esté amenazada */
                    if (!(this.isThreatCell([i - 1, j], boardMatrix) || this.isThreatCell([i - 2, j], boardMatrix) || this.isThreatCell([i - 3, j], boardMatrix) || this.isThreatCell([i, j], boardMatrix))){
                        canMove++;
                        cellCastleKingLong.setAvailableMovement(true);
                    }
                        
                } 
                    
            } 
        }
        return canMove;
    }

    /**
     * @function isThreatCell = indica si la casilla a la que se puede desplazar el rey se encuentra amenazada
     * @param {Array<integer, integer>} position = posición de la celda a la que se puede desplazar el rey
     * @param {Array<integer, integer>} boardMatrix = tablero
     */
    isThreatCell(position, boardMatrix){

        const [i, j] = position;

        /* KNIGHT */
        const knightMoves = [
            [i - 1, j - 2], 
            [i + 1, j - 2], 
            [i + 2, j - 1],
            [i + 2, j + 1],
            [i - 2, j + 1],
            [i + 1, j + 2],
            [i - 1, j + 2],
            [i - 2, j - 1]
        ]
        
        for (let k = 0; k < knightMoves.length; k++){

            /* Cogemos la celda del movimiento del caballo para ver si se encuentra en ella y decir que la celda está amenazada */
            const cell = this.getCellFromCoords(knightMoves[k], boardMatrix);

            if (cell){
                
                if (cell.piece){

                    /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
                    if (cell.piece.color != this.color){
                        /* Si una de las casillas amenazadas por el caballo se encuentra el rey, cambiamos isCheck a true */
                        if (cell.piece.type == PieceTypes.PIECES.knight){
                            return true;
                        }
                    }
                }
            }
        }

        for (let l = 0; l < this.directions.length; l++){ 

            /* Definimos la dirección hacia la que tenemos que mirar si alguna pieza amenaza la casilla */
            const iDir = this.directions[l][0];
            const jDir = this.directions[l][1];

            for (let k = 1; k < boardMatrix.length; k++){

                /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
                const cell = this.getCellFromCoords([i + (k * iDir), j + (k * jDir)], boardMatrix);

                /* Si no es una celda salimos del bucle */
                if (!cell) break;

                /* KING */
                if (k == 1){
                    /* Si el iterador se encuentra en la posición uno y encontramos al rey enemigo, esa celda estará amenazada */
                    if (cell.piece && !(cell.piece && cell.piece.color == this.color)){
                        if (cell.piece.type == PieceTypes.PIECES.king)
                            return true;
                    }
                }

                /* PAWNS */

                /* Comprobamos el color del rey para saber la dirección en la que atacan los peones */
                if (this.color == Color.THEME.light){

                    /* En caso de que la k sea 1, es decir que encuentre la pieza en la primera iteración, buscamos si la pieza es un peón */
                    if (k == 1){

                        /* Miramos las diagonales atacadas por los peones */
                        if (l == 2 || l == 3){
                            if (cell.piece && !(cell.piece && cell.piece.color == this.color)){
                                    if (cell.piece.type == PieceTypes.PIECES.pawn)
                                        return true;
                            }
                        }
                    }

                } else {

                    /* En caso de que la k sea 1, es decir que encuentre la pieza en la primera iteración, buscamos si la pieza es un peón */
                    if (k == 1){

                        /* Miramos las diagonales atacadas por los peones */
                        if (l == 0 || l == 1){

                            if (cell.piece && !(cell.piece && cell.piece.color == this.color)){
                                if (cell.piece.type == PieceTypes.PIECES.pawn)
                                    return true;
                            }
                        }
                    }
                }
                
                /* BISHOP, ROOK AND QUEEN */

                /* Cuando l valga de 0 a 3 comprobará las diagonales */
                if (l == 0 || l == 1 || l == 2 || l == 3){

                    /* En caso de que la pieza que encontremos sea un alfil o una reina, esa casilla estará amenazada */
                    if(cell.piece){

                        /* En caso de que la pieza no sea el rey comprobamos si es del mismo color que el rey actual, si es así, salimos del bucle */
                        if (cell.piece != this){
                            if (cell.piece.color == this.color) break;
                        }

                        /* Si hay una reina o un alfil en la diagonal la celda está amenazada */
                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.bishop){

                            return true;

                        } else if (cell.piece != this) {

                            break;
                        }

                    }
                
                /* Cuando l valga de 4 a 7 comprobará las lineas verticales y horizontales */
                } else if (l == 4 || l == 5 || l == 6 || l == 7) {

                    /* En caso de que la pieza que encontremos sea una torre o una reina, esa casilla estará amenazada */
                    if(cell.piece){

                        /* En caso de que la pieza no sea el rey comprobamos si es del mismo color que el rey actual, si es así, salimos del bucle */
                        if (cell.piece.type != this.type){
                            if (cell.piece.color == this.color) break;
                        }

                        /* Si hay una torre o un alfil en la diagonal la celda está amenazada */
                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.rook){

                            return true;

                        } else if (cell.piece.type != this.type) {

                            break;
                        }

                    }
                }

            }
            
        }

        return false;

    }

}

export {King}