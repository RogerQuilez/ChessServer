import {Piece} from '../Piece.js';
import {PieceTypes} from '../../types/PieceTypes.js';

class Rook extends Piece {
    /**
     * @class Rook @counstructor
     * @param {String} color
     */
    constructor(color){
        super(color, ['♜', '♖'], PieceTypes.PIECES.rook);
    }

    
    /**
     * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Rook
     * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Rook
     * @param {Array<Integer>} boardMatrix = Tablero del juego
     */
    availableMovements(position, boardMatrix){

        var contMove = 0;

        /* Comprobamos que la pieza se pueda mover */
        if (this.canMovePiece(position, boardMatrix)){
            
            /* Vertical haci arriba */
            if (this.checkDirection(position, [0, -1], boardMatrix)) contMove++;

            /* Vertical hacia abajo */
            if (this.checkDirection(position, [1, 0], boardMatrix)) contMove++;

            /* Horizontal a la derecha */
            if (this.checkDirection(position, [0, 1], boardMatrix)) contMove++;

            /* Horizontal a la izquierda */
            if (this.checkDirection(position, [-1, 0], boardMatrix)) contMove++;

        } else {
            /* Vertical hacia arriba */
            if (this.checkCanMoveDirection(position, [0, -1], boardMatrix)) contMove++;

            /* Vertical hacia abajo */
            if (this.checkCanMoveDirection(position, [1, 0], boardMatrix)) contMove++;

            /* Horizontal a la derecha */
            if (this.checkCanMoveDirection(position, [0, 1], boardMatrix)) contMove++;

            /* Horizontal a la izquierda */
            if (this.checkCanMoveDirection(position, [-1, 0], boardMatrix)) contMove++;
        }

        return contMove;

    }

    /**
     * @function canStopCheck = En caso de que la pieza pueda aturar el jaque, se habilitará la celda que puede proteger del jaque del rey
     * @param {Array<integer, integer>} checkCellIJ = Array de las coordenadas que están haciendo jaque al rey
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
     canStopCheck(checkCellIJ, boardMatrix){

        var contMove = 0;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [0, -1])) contMove++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [1, 0])) contMove++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [0, 1])) contMove++;

        if (this.pieceCanStopCheck(checkCellIJ, boardMatrix, [-1, 0])) contMove++;       

        return contMove;
        
    }

}

export {Rook}