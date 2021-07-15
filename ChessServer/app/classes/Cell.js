class Cell {
    /**
     * @type {Piece} piece = Pieza que es encuentra en esa celda
     */
    piece;

    /**
     * @type {boolean} selected = Indica la pieza seleccionada (proporcionada por el tablero)
     */
    selected;

    /**
     * @type {boolean} availableMove = Inica si es posible realizar un movimiento o no
     */
    availableMove;

    /**
     * 
     * @param {Piece} piece Pieza del tablero
     */
    constructor(piece){
        this.piece = piece;
        this.selected = false;
        this.availableMove = false;
    }

    /**
     * 
     * @param {boolean} selected Pieza seleccionada
     */
    setSelected(selected){
        this.selected = selected;
    }

    /**
     * 
     * @param {Piece} piece Pieza que queremos introducir en la celda
     */
    setPiece(piece){
        this.piece = piece;
    }

    /**
     * 
     * @param {boolean} availableMove 
     */
     setAvailableMovement(availableMove){
        this.availableMove = availableMove;
    }
}

export {Cell}