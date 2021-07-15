import {Piece} from '../Piece.js';
import {PieceTypes} from '../../types/PieceTypes.js';

class Bishop extends Piece {
    /**
     * @class Bishop @counstructor
     * @param {String} color
    */
    constructor(color){
        super(color, ['♝', '♗'], PieceTypes.PIECES.bishop);
    }

    /**
     * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Bishop
     * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Bishop
     * @param {Array<Integer>} boardMatrix = Tablero del juego
     */
     availableMovements(position, boardMatrix){
        var contMoves = 0;

        /* Comprobamos que la pieza se pueda mover */
        if (this.canMovePiece(position, boardMatrix)){
            
            /* Diagonal abajo a la derecha */
            if (this.checkDirection(position, [1, 1], boardMatrix)) contMoves++;

            /* Diagonal abajo a la izquierda */
            if (this.checkDirection(position, [-1, 1], boardMatrix)) contMoves++;

            /* Diagonal arriba a la derecha */
            if (this.checkDirection(position, [1, -1], boardMatrix)) contMoves++;

            /* Diagonal arriba a la izquierda */
            if (this.checkDirection(position, [-1, -1], boardMatrix)) contMoves++;
            
        } else {

            /* Diagonal abajo a la derecha */
            if (this.checkCanMoveDirection(position, [1, 1], boardMatrix)) contMoves++;

            /* Diagonal abajo a la izquierda */
            if (this.checkCanMoveDirection(position, [-1, 1], boardMatrix)) contMoves++;

            /* Diagonal arriba a la derecha */
            if (this.checkCanMoveDirection(position, [1, -1], boardMatrix))contMoves++;

            /* Diagonal arriba a la izquierda */
            if (this.checkCanMoveDirection(position, [-1, -1], boardMatrix)) contMoves++;
        }

        return contMoves;

    }

    /**
     * @function canStopCheck = En caso de que la pieza pueda aturar el jaque, se habilitará la celda que puede proteger del jaque del rey
     * @param {Array<integer, integer>} checkCellIJ = Array de las coordenadas que están haciendo jaque al rey
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
     canStopCheck(checkCellIJ, boardMatrix){

        var contMoves = 0;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [1, 1])) contMoves++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [-1, 1])) contMoves++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [1, -1])) contMoves++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [-1, -1])) contMoves++;

        return contMoves;
        
    }

}

export {Bishop}