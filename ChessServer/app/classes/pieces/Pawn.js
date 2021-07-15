import {Piece} from '../Piece.js';
import {PieceTypes} from '../../types/PieceTypes.js';
import {Color} from '../../types/Color.js';

class Pawn extends Piece {
    /**
     * @class Pawn @counstructor
     * @param {String} color
     */
    constructor(color){
        super(color, ['♟', '♙'], PieceTypes.PIECES.pawn);
    }

    /**
     * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Pawn
     * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Pawn
     * @param {Array<Integer>} boardMatrix = Tablero del juego
     */
    availableMovements(position, boardMatrix){

        var canMove = 0;

        /* Comprobamos que la pieza se pueda mover en caso de que esté clavada */
        if (!this.canMovePiece(position, boardMatrix)){

            const [iPos, jPos] = position;

            /* Conseguimos la celda que amenaza al rey */
            const cellChecking = this.whoIsChecking(position, boardMatrix);

            var iPieceDirDiagRight = 0;
            var jPieceDirDiagRight = 0;
            var iPieceDirDiagLeft = 0;
            var jPieceDirDiagLeft = 0;

            /* Definimos el movimiento del peon en caso de que sea de piezas blancas o negras */
            if (this.color == Color.THEME.dark){
                iPieceDirDiagRight = iPos - 1;
                jPieceDirDiagRight = jPos + 1;
                iPieceDirDiagLeft = iPos + 1;
                jPieceDirDiagLeft = jPos + 1;
            } else {
                iPieceDirDiagRight = iPos + 1;
                jPieceDirDiagRight = jPos - 1;
                iPieceDirDiagLeft = iPos - 1;
                jPieceDirDiagLeft = jPos - 1;
            }

            /* Conseguimos las celdas diagonales de el peon */
            const cellDiagRight = this.getCellFromCoords([iPieceDirDiagRight, jPieceDirDiagRight], boardMatrix);
            const cellDiagLeft = this.getCellFromCoords([iPieceDirDiagLeft, jPieceDirDiagLeft], boardMatrix);

            /* En caso de que la pieza que amenaza al rey este a una caputra de peón, habilitamos su movimiento */
            if (cellDiagRight && cellDiagRight == cellChecking){
                if (cellDiagRight.piece.color != this.color){
                    cellDiagRight.setAvailableMovement(true);
                    canMove++;
                    return;
                }
            }

            /* En caso de que la pieza que amenaza al rey este a una caputra de peón, habilitamos su movimiento */
            if (cellDiagLeft && cellDiagLeft == cellChecking){
                if (cellDiagLeft.piece.color != this.color){
                    cellDiagLeft.setAvailableMovement(true);
                    canMove++;
                    return;
                }
            }            

        } else {
            
            /* Coordenadas de la posición donde se encuentra la pieza */
            const [i, j] = position;

            /* Array con las diferentes celdas disponibles */
            const cellsPossiblesMoves = [];

            /* Conseguimos la posicion de las celdas disponibles en la que puede mover la pieza seleccionada */
            const cellPossibleMove = boardMatrix[i][this.color == Color.THEME.dark ? j + 1 : j - 1];
            cellsPossiblesMoves.push(cellPossibleMove);

            /* Conseguimos la posicion de las celdas disponibles en caso de que se pueda capturar con el peon en diagonal izquierda */
            if (i != 0 && this.color == Color.THEME.light){

                var cellPossibleMoveTakeLeft = boardMatrix[i - 1][j - 1];
                /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */
                if (cellPossibleMoveTakeLeft.piece && cellPossibleMoveTakeLeft.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeLeft);
            } else if (i != 7 && this.color == Color.THEME.dark){

                var cellPossibleMoveTakeLeft = boardMatrix[i + 1][j + 1];

                /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */
                if (cellPossibleMoveTakeLeft.piece && cellPossibleMoveTakeLeft.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeLeft);
            }

            /* Conseguimos la posicion de las celdas disponibles en caso de que se pueda capturar con el peon en diagonal derecha */
            if (i != 7 && this.color == Color.THEME.light){
                
                var cellPossibleMoveTakeRight = boardMatrix[i + 1 ][j - 1];
                /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */
                if (cellPossibleMoveTakeRight.piece && cellPossibleMoveTakeRight.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeRight);
            } else if (i != 0 && this.color == Color.THEME.dark){

                var cellPossibleMoveTakeRight = boardMatrix[i -1][j + 1];
                /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */
                if (cellPossibleMoveTakeRight.piece && cellPossibleMoveTakeRight.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeRight);
            }

            /* Miramos que en caso de que el peon se encuentre en la pirmera fila y no sea del color contrario del inicio puede mover dos posiciones*/
            if (j == 1 && this.color != Color.THEME.light || j == 6 && this.color != Color.THEME.dark){
                /* Comprobamos que no haya una pieza delante */
                if (!cellPossibleMove.piece){
                    const cellPossibleMoveStart = boardMatrix[i][this.color == Color.THEME.dark ? j + 2 : j - 2];
                    cellsPossiblesMoves.push(cellPossibleMoveStart);
                }
            }
            
            /* Comprobamos si no hay una pieza en la casilla donde se puede mover la pieza seleccionada */
            for (let i = 0; i < cellsPossiblesMoves.length; i++){
                if (!cellsPossiblesMoves[i].piece && cellsPossiblesMoves[i] != cellPossibleMoveTakeLeft && cellsPossiblesMoves[i] != cellPossibleMoveTakeRight) 
                    {
                        canMove++;
                        cellsPossiblesMoves[i].setAvailableMovement(true);
                    }

                /* Ponemos la celda en true en caso de que haya pieza que se pueda capturar en la diagonal izquierda */
                if (cellsPossiblesMoves[i] == cellPossibleMoveTakeLeft){
                    if (cellsPossiblesMoves[i].piece) {
                        canMove++;
                        cellsPossiblesMoves[i].setAvailableMovement(true);
                    }
                }

                /* Ponemos la celda en true en caso de que haya pieza que se pueda capturar en la diagonal derecha */
                if (cellsPossiblesMoves[i] == cellPossibleMoveTakeRight){
                    if (cellsPossiblesMoves[i].piece){
                        canMove++;
                        cellsPossiblesMoves[i].setAvailableMovement(true);
                    } 
                }
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

        if (checkCell.piece.type == PieceTypes.PIECES.knight) return;

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

        /* Recorremos las casillas que están amenazadas por la pieza que da jaque al rey */
        for (let k = 1; k <= boardMatrix.length; k++){

            /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
            var cell = this.getCellFromCoords([iKing + (k * iDir), jKing + (k * jDir)], boardMatrix);
            var iNextCell = iKing + (k * iDir);
            var jNextCell = jKing + (k * jDir);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            
            var iPieceDir = 0;
            var jPieceDir = 0;
            var iPieceDirDiagLeft = 0;
            var jPieceDirDiagLeft = 0;
            var iPieceDirDiagRight = 0;
            var jPieceDirDiagRight = 0;

            /* Definimos el movimiento del peon en caso de que sea de piezas blancas o negras */
            if (this.color == Color.THEME.dark){
                iPieceDir = 0
                jPieceDir = -1;
                iPieceDirDiagRight = -1;
                jPieceDirDiagRight = -1;
                iPieceDirDiagLeft = 1;
                jPieceDirDiagLeft = -1;
            } else {
                iPieceDir = 0
                jPieceDir = 1;
                iPieceDirDiagRight = 1;
                jPieceDirDiagRight = 1;
                iPieceDirDiagLeft = -1;
                jPieceDirDiagLeft = 1;
            }

            /* Por cada celda miramos si la pieza puede interponerse en ella para parar el jaque */
            for (let x = 1; x < 2; x++){

                /* En caso de que no estemos mirando la celda donde no se encuentra la pieza que amenaza el rey, miramos si podemos avanzar el peon para defender al rey */
                if (!cell.piece){
                    const cellPiece = this.getCellFromCoords([iNextCell + (x * iPieceDir), jNextCell + (x * jPieceDir)], boardMatrix); 

                    if (!cellPiece) break;

                    if (cellPiece.piece && cellPiece.piece != this) break;

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPiece.piece){
                        if (cellPiece.piece.color == cellKing.piece.color && cellPiece.piece == this){
                            canMove++;
                            cell.setAvailableMovement(true);
                        }
                            
                    } 

                /* En caso de que estemos mirando la celda donde se encuentra la pieza que amenaza el rey, miramos si podemos caputar la pieza */
                } else {
                    const cellPieceDiagRight = this.getCellFromCoords([iNextCell + (x * iPieceDirDiagRight), jNextCell + (x * jPieceDirDiagRight)], boardMatrix);
                
                    if (!cellPieceDiagRight) break;

                    if (cellPieceDiagRight.piece && cellPieceDiagRight.piece != this) break;

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPieceDiagRight.piece){
                        if (cellPieceDiagRight.piece.color == cellKing.piece.color && cellPieceDiagRight.piece == this){
                            canMove++;
                            cell.setAvailableMovement(true);
                        }
                            
                    } 

                    const cellPieceDiagLeft = this.getCellFromCoords([iNextCell + (x * iPieceDirDiagLeft), jNextCell + (x * jPieceDirDiagLeft)], boardMatrix);
                    
                    if (!cellPieceDiagLeft) break;

                    if (cellPieceDiagLeft.piece && cellPieceDiagLeft.piece != this) break;

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPieceDiagLeft.piece){
                        if (cellPieceDiagLeft.piece.color == cellKing.piece.color && cellPieceDiagLeft.piece == this){
                            canMove++;
                            cell.setAvailableMovement(true);
                        }
                            
                    } 
                }
                

            }

            if (cell.piece) break;
        }

        return canMove;
        
    }
}

export {Pawn}