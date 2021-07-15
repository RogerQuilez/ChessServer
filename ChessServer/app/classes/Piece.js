import {PieceTypes} from '../types/PieceTypes.js';
import {Cell} from './Cell.js';

class Piece {
    /**
     * @type {string} color = Color de la pieza (light / black)
     */
    color;

    /**
     * @type {string} type = Tipo de pieza
     */
    type;

    /**
     * @type {Array.<string>} renderPiece = variable para pintar las pieza
     */
    renderPiece;

    /**
     * @type {boolean} moved = variable para saber si hemos movido ya la pieza
     */
    moved

    /**
     * 
     * @param {string} type 
     * @param {string} color 
     * @param {Array<PieceTypes>} renderPiece
     */
    constructor(color, renderPiece, type){
        this.color = color;
        this.renderPiece = renderPiece;
        this.type = type;
        this.moved = false;
    }

    /**
     * @function getCellFromCoords = función para que nos retorne con seguridad una celda existente a partir de sus coordenadas
     * @param {Array<Integer>} position 
     * @param {Array<Integer>} boardMatrix 
     * @returns {Cell} cell = retorna la celda con las coordenadas enviadas por parámetro
     */
    getCellFromCoords(position, boardMatrix){
        const [i, j] = position;
        const rank = boardMatrix[i] || [];
        const cell = rank[j];
        return cell;
    }

    /**
     * @function getKing = Devuelve las coordenadas donde se encuentra el rey
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
    getKing(boardMatrix){
        /* Conseguimos donde se encuentra el rey que está amenazado */
        for (let i = 0; i < 8; i++){
            for (let j = 0; j < 8; j++){
                const cell = boardMatrix[i][j];
                if (cell.piece){
                    if (cell.piece.type == PieceTypes.PIECES.king && cell.piece.color == this.color){
                        return [i, j];
                    }
                }
            }
        }
    }

    /**
     * @function checkDirection = se encarga de comprobar las casillas disponibles en la dirección que se mueve la pieza
     * @param {Array<Integer, Integer>} position array with con las coordenadas i, j del tablero
     * @param {Array<Integer, Integer>} direction array con la dirección (iDir, jDir) hacia la que se mueve la ficha
     * @param {Array<Integer, Integer>} boardMatrix tablero del juego
     */
    checkDirection(position, direction, boardMatrix){

        var canMove = false;
        const [i, j] = position;
        const [iDir, jDir] = direction;
        for (let k = 1; k <= boardMatrix.length; k++){

            /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
            const cell = this.getCellFromCoords([i + (k * iDir), j + (k * jDir)], boardMatrix);
            if (!cell) break;
            if (cell.piece && cell.piece.color == this.color) break;
            
            cell.setAvailableMovement(true);
            canMove = true;

            if (cell.piece) break;
        }

        return canMove;
    }

    /**
     * @function checkCanMoveDirection = se encarga de comprobar las casillas disponibles en caso de que la pieza esté clavada
     * @param {Array<Integer, Integer>} position array with con las coordenadas i, j del tablero
     * @param {Array<Integer, Integer>} direction array con la dirección (iDir, jDir) hacia la que se mueve la ficha
     * @param {Array<Integer, Integer>} boardMatrix tablero del juego
     */
    checkCanMoveDirection(position, direction, boardMatrix){

        /* Cogemos las coordenadas de la celda donde se encuentra el rey */
        const [iKing, jKing] = this.getKing(boardMatrix);
        const [iDir, jDir] = direction;

        /* Iteramos el tablero en la dirección que nos han pasado por parametro */
        for (let k = 1; k <= boardMatrix.length; k++){

            const cell = this.getCellFromCoords([iKing + (k * iDir), jKing + (k * jDir)], boardMatrix);
            if (!cell) break;

            /* En caso de que encontremos la pieza que estamos mirando, iteramos sus dos posibles direcciones que podrá moverse estando clavada */
            if (cell.piece && cell.piece == this){

                /* Iteramos la primera direccion, desde la pieza hasta la pieza que está clavando la pieza actual */
                for (let l = k + 1; l <= boardMatrix.length; l++){
                    const cell = this.getCellFromCoords([iKing + (l * iDir), jKing + (l * jDir)], boardMatrix);
                    if (!cell) break;
                    if (cell.piece && cell.piece.color == this.color) break;
                    cell.setAvailableMovement(true);
                    if (cell.piece) break;
                }

                /* Iteramos la segunda direccion, desde la pieza hasta el rey */
                for (let l = k - 1; k >= 0; l--){
                    const cell = this.getCellFromCoords([iKing + (l * iDir), jKing + (l * jDir)], boardMatrix);
                    if (!cell) break;
                    if (cell.piece && cell.piece.color == this.color) break;
                    cell.setAvailableMovement(true);
                }
            }
        }
    }

    /**
     * @function abstract availableMovements = Retorna los movimientos disponibles para esa pieza
     */
    availableMovements(position, boardMatrix){};

    /**
     * @function canStopCheck = En caso de que la pieza pueda aturar el jaque, se habilitará la celda que puede proteger del jaque del rey
     * @param {Array<integer, integer>} checkCellIJ = Array de las coordenadas que están haciendo jaque al rey
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
     pieceCanStopCheck(checkCellIJ, boardMatrix, direction){

        var canMove = false;

        const [iCheckCell, jCheckCell] = checkCellIJ;
        const checkCell = this.getCellFromCoords([iCheckCell, jCheckCell], boardMatrix);
        var iDir = 0;
        var jDir = 0;

        /* Cogemos las coordenadas de la celda donde se encuentra el rey */
        const [iKing, jKing] = this.getKing(boardMatrix);

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
                
                const [iPieceDir, jPieceDir] = direction;

                /* Por cada celda miramos si la pieza puede interponerse en ella para parar el jaque */
                for (let x = 1; x <= boardMatrix.length; x++){

                    const cellPiece = this.getCellFromCoords([iNextCell + (x * iPieceDir), jNextCell + (x * jPieceDir)], boardMatrix); 

                    if (!cellPiece) break;

                    if (cellPiece.piece && cellPiece.piece != this) break;

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPiece.piece && cellPiece.piece == this){
                        cell.setAvailableMovement(true);
                        canMove = true;
                    }
                            
                }

                if (cell.piece) break;
            }
        /* En caso de que sea una pieza que no sea ni alfil, ni torre ni reina (es decir, caballo o peon), miraremos solo si podemos caputar la pieza */
        } else {

            const [iPieceDir, jPieceDir] = direction;

            const cellCheck = this.getCellFromCoords([iCheckCell, jCheckCell], boardMatrix);

            for (let k = 1; k <= boardMatrix.length; k++){

                /* Miramos a ver si en las direcciones donde se encuentra la celda que hace jaque al rey, la pieza que hemos seleccionado puede capturarla */
                const cellPiece = this.getCellFromCoords([iCheckCell + (k * iPieceDir), jCheckCell + (k * jPieceDir)], boardMatrix);

                
                if (cellPiece){

                    /* En caso de que la celda que estamos revisando se encuentre el rey salimos de la función */
                    if (cellPiece.piece && cellPiece.piece.type == PieceTypes.PIECES.king) break;

                    /* En caso de que la pieza pueda parar el jaque, habilitamos la casilla que para el jaque para la pieza seleccionada */
                    if (cellPiece.piece && cellPiece.piece == this){
                        cellCheck.setAvailableMovement(true);
                        canMove = true;
                    }
                }
            }
        }

        return canMove;        
        
    }

    /**
     * @function canMovePiece = Retorna true o false dependiendo de si la pieza está clavada o no
     * @param {Array<integer, integer>} position = Array con las coordenadas de la posición de la celda
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
    canMovePiece(position, boardMatrix){

        const [iPiece, jPiece] = position;

        /* Cogemos las coordenadas de la celda donde se encuentra el rey */
        const [iKing, jKing] = this.getKing(boardMatrix);

        const directions = [
            [1, 1],
            [-1, 1],
            [1, -1], 
            [-1, -1], 
            [0, -1], 
            [1, 0],
            [0, 1],
            [-1, 0]
        ];

        for (let k = 0; k < directions.length; k++){

            const iDir = directions[k][0];
            const jDir = directions[k][1];

            for (let l = 1; l <= boardMatrix.length; l++){
                const cell = this.getCellFromCoords([iKing + (l * iDir), jKing + (l * jDir)], boardMatrix);

                if (cell){

                    if (cell.piece){

                       if (cell.piece.color == this.color && cell.piece != this) break;

                    }

                    if (cell.piece && cell.piece == this){

                        /* Recorremos el bucle mirando a ver si la pieza se encuentra clava entre el rey y una pieza que le pueda dar jaque */
                        for (let x = l + 1; x <= boardMatrix.length; x++){
                        
                            const cell = this.getCellFromCoords([iKing + (x * iDir), jKing + (x * jDir)], boardMatrix);

                            if (cell){
                                
                                if (cell.piece && cell.piece.color == this.color) break;
                                
                                if (cell.piece && cell.piece.color != this.color){
                                    
                                    /* En caso de que la pieza que encontremos pueda dar jaque al rey, le decimos que no se puede mover */
                                    if (k < 4){
                                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.bishop) return false;
                                    } else {
                                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.rook) return false;
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    /**
     * @function whoIsChecking = Retorna la celda que está amenazando al rey
     * @param {Array<integer, integer>} position = Array con las coordenadas de la posición de la celda
     * @param {Array<integer, integer>} boardMatrix = Tablero de ajedrez
     */
    whoIsChecking(position, boardMatrix){

        const [iPiece, jPiece] = position;

        /* Cogemos las coordenadas de la celda donde se encuentra el rey */
        const [iKing, jKing] = this.getKing(boardMatrix);

        const directions = [
            [1, 1],
            [-1, 1],
            [1, -1], 
            [-1, -1], 
            [0, -1], 
            [1, 0],
            [0, 1],
            [-1, 0]
        ];

        for (let k = 0; k < directions.length; k++){

            const iDir = directions[k][0];
            const jDir = directions[k][1];

            for (let l = 1; l <= boardMatrix.length; l++){
                const cell = this.getCellFromCoords([iKing + (l * iDir), jKing + (l * jDir)], boardMatrix);

                if (cell){

                    if (cell.piece){

                       if (cell.piece.color == this.color && cell.piece != this) break;

                    }

                    if (cell.piece && cell.piece == this){

                        /* Recorremos el bucle mirando a ver si la pieza se encuentra clava entre el rey y una pieza que le pueda dar jaque */
                        for (let x = l + 1; x <= boardMatrix.length; x++){
                        
                            const cell = this.getCellFromCoords([iKing + (x * iDir), jKing + (x * jDir)], boardMatrix);

                            if (cell){
                                
                                if (cell.piece && cell.piece.color == this.color) break;
                                
                                if (cell.piece && cell.piece.color != this.color){
                                    
                                    /* En caso de que la pieza que encontremos pueda dar jaque al rey devolvemos la celda */
                                    if (k < 4){
                                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.bishop) return cell;
                                    } else {
                                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.rook) return cell;
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    

}

export {Piece}