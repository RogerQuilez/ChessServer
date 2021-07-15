import {Cell} from './Cell.js';
import {Theme} from '../types/Theme.js';
import {PieceTypes} from '../types/PieceTypes.js';
import {Color} from '../types/Color.js';
import {socket} from '../socket.js';
import {Queen} from './pieces/Queen.js';

class Board{
    /**
    * @type {integer} width_board = Anchura del canvas
    * @type {integer} height_board = Altura del canvas
    */
    width_board;
    height_board;

    /**
    * @type {integer} files = Filas del TABLERO
    * @type {integer} ranks = Columnas del TABLERO
    */
    files;
    ranks;

    /**
     * @type {Array<integer, integer>} Array con las coordenadas de la celda que está haciendo jaque al rey
     */
    checkCellIJ;

    /**
    * @type {Theme} theme = Theme del tablero
    * @type {Theme} pieceTheme = Theme de las piezas
    */
    theme;
    pieceTheme;

    /**
    * @type {integer} cell_width = Tamaño de cada celda del tablero
    * @type {integer} cell_height = Altura de cada celda del tablero
    */
    cell_width;
    cell_height;

    /**
    * @type {integer}  piece_offset = Offset de la pieza en el tablero para centrarlas hacia abajo
    */
    piece_offset;

    /**
    * @type {Cell} previousCell = Coordenadas I J de la celda anterior seleccionada
    */
    previousCellIJ;

    /**
    * @type {Cell} previousCell = Celda anterior para poder eliminar la ficha una vez movida 
    */
    previousCell;

    /**
    * @type {Array.<Cell>} selectedCells = Array de Cells que guarda las casillas seleccionadas
    */
    selectedCells;

    /**
     * @type {Array.<Cell>} posibleMoves = Array de Cells para guardar las casillas con posibles movimientos para las piezas
     */
    posibleMoves;

    /**
    * @type {Cell} boardMatrix = Tablero 
    */
    boardMatrix;

    /**
    * @type {HTMLCanvasElement} $canvas = Canvas sobre el que dibujamos el juego
    * @type {CanvasRenderingContext2D} ctx = Contexto 2d del canvas 
    */
    $canvas;
    ctx;

    /**
     * @type {boolean} disabled = Indica el turno de los jugadores
     */
    disabled;

    /**
     * @type {boolean} isBlack = Indica si el tablero se tiene que girar o no dependiendo si el jugador tiene las piezas negras
     */
    isBlack;

    /**
     * @type {boolean} isDragging = Indica si la pieza se debe mover al seleccionarla o no
     */
    isDragging;

    /**
     * @type {boolean} isPrinted = Indica si el tablero ya ha sido pintado para no pintarlo cada vez que movamos el ratón
     */
    isPrinted;

    /**
     * @type {Integer} contPiecesChecking = Indica la cantidad de piezas que estánd dando jaque al rey
     */
    contPiecesChecking;

    /**
     * @type {Integer} isCheckMate = En caso de que sea 0, indicará que el rey no se puede mover y ninguna pieza puede salvar al rey
     */
    isCheckMateCont;

    /**
     * @type {Integer} canStopCheckMate = En caso de que sea 0, indicará que ninguna pieza puede intervenir en el jaque
     */
    canStopCheckMate;

    finishGame;

    /**
     * 
     * @param width_board 
     * @param height_board 
     * @param files 
     * @param ranks 
     * @param theme 
     */

    constructor(width_board, height_board, files, ranks, theme, pieceTheme){
        /* Inicializamos el tamaño y la altura del tablero */
        this.width_board = width_board;
        this.height_board = height_board;

        /* Inicializamos las filas y columnas del tablero */
        this.files = files;
        this.ranks = ranks;

        /* Inicializamos el tema del tablero y de las piezas */
        this.theme = theme;
        this.pieceTheme = pieceTheme;

        /* Inicializamos el tamaño y la altura de las celdas del tablero */
        this.cell_width = this.width_board / this.files;
        this.cell_height = this.height_board / this.ranks;

        /* Inicializamos el Offset que tenemos en cada celda de la pieza para poder centrarla */
        this.piece_offset = this.cell_height * 0.05;

        this.previousCellIJ = [];

        this.checkCell = [];
        this.checkCellIJ = [];

        /* Inicialzamos la celda a null para una vez seleccionada una pieza modificarla */
        this.previousCell = null;

        /* Inicializamos el array de celdas seleccionadas */
        this.selectedCells = [];

        /* Inicializamos el array de posibles movimientos */
        this.posibleMoves = [];

        /* Inicializamos el movimiento de tablero en true para pintarlo con las blancas abajo */
        this.isBlack = false;
        this.disabled = true;

        /* Inicializamos el draggin a false para que no afecte mientras no se ha seleccionado ninguna pieza */
        this.isDragging = false;

        /* Inicializamos isPrinted a false */
        this.isPrinted = false;

        /* Inicializamos contPiecesChecking a 0 */
        this.contPiecesChecking = 0;

        /* Inicializamos isCheckMateCont a 0 */
        this.isCheckMateCont = 0;

        /* Inicializamos canStopCheckMate a 0 */
        this.canStopCheckMate = 0;

        this.finishGame = false;

        /* Canvas */
        this.$canvas = document.createElement('canvas');
        this.ctx = this.$canvas.getContext('2d');

        this.$canvas.width = this.width_board;
        this.$canvas.height = this.height_board;

        /* Introducimos el canvas en el body del documento */
        document.body.appendChild(this.$canvas);

        this.$canvas.id = "canvas";

        /* Inicializar el tablero */
        this.boardMatrix = [];
        for (let i = 0; i < this.files; i++){
            this.boardMatrix[i] = [];
            for (let j = 0; j < this.ranks; j++){
                /* Inicializamos el tablero en Celdas de null para que no de problemas al rellenar el tablero con las piezas */
                this.boardMatrix[i][j] = new Cell(null);
            }
        }        

        /* Bind method -> Sirve para poder usar el this en el metodo */
        this.setMouseCell = this.setMouseCell.bind(this);
        this.setSelectedCell = this.setSelectedCell.bind(this);
        this.pickPiece = this.pickPiece.bind(this);
        this.dropPiece = this.dropPiece.bind(this);
        this.dragPiece = this.dragPiece.bind(this);
        this.onSocketMove = this.onSocketMove.bind(this);
        this.onSocketTurn = this.onSocketTurn.bind(this);
        this.onSocketBlackPlayer = this.onSocketBlackPlayer.bind(this);
        this.isCheck = this.isCheck.bind(this);
        this.isCheckMate = this.isCheckMate.bind(this);
        this.isStalemated = this.isStalemated.bind(this);

        /* Mosemove -> Hacemos el drag and drop de la pieza seleccionada */
        this.$canvas.addEventListener('mousemove', this.dragPiece);

        /* Mousedown -> Capturamos donde estamos cogiendo la pieza seleccionada del tablero */
        this.$canvas.addEventListener('mousedown', this.pickPiece);

        /* Mouseup -> Capturamos en que celda dejamos la pieza seleccionada del tablero */
        this.$canvas.addEventListener('mouseup', this.dropPiece);
        
        /** Socket events **/
        socket.on('move', this.onSocketMove);
        socket.on('turn', this.onSocketTurn);
        socket.on('black player', this.onSocketBlackPlayer);
    
    }   
    
    /**
    * @function pickPiece = Selecciona la pieza que ha clicado el usuario y vuelve a pintar el tablero para reflejar los cambios
    * @param {MouseEvent} e = MouseEvent al hacer click sobre la pieza
    */
    pickPiece(e){
        
        if (this.finishGame) return;

        /* Solo permitimos mostrar los moviemientos disponibles de la pieza seleccionada en caso de que coincidan su color y el color del turno del jugador */
        if (this.disabled) return;
        
        /* Limpiamos las celdas para que solo quede marcado el último movimiento */
        this.clearSelections();

        /* Comprobamos si hay una casilla seleccionada para asi no poder volver a seleccionar otra */
        if (this.previousCell) return;

        /* Capturamos el offSet X e Y de donde se ha producido el evento */
        const { offsetX, offsetY } = e;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
        const selectedCell = this.boardMatrix[file][rank];

        /* Comprobamos si hay una pieza en la celda seleccionada, sino, hacemos un return */
        if (!selectedCell.piece) return;

        /* En caso de que un jugador esté intentando mover la pieza del color contrario salimos de la función */
        if (this.isBlack && selectedCell.piece.color == Color.THEME.light) return;
        if (!this.isBlack && selectedCell.piece.color == Color.THEME.dark) return;

        /* Cogemos la casilla donde se ubica el rey del jugador que está moviendo */
        const cellKing = this.getKing(selectedCell);

        /* En caso de que el rey del jugador que mueve no esté en jaque, puede mover todas las piezas */
        if (!cellKing.piece.isCheck){

            /* Le pasamos la posicion y el tablero para que nos indique si es posible hacer un movimiento con la pieza de esa celda */
            this.isCheckMateCont = selectedCell.piece.availableMovements([file, rank], this.boardMatrix);

        /* En caso de que el rey del jugador que mueve esté en jaque, solo podrá mover el rey */
        } else {

            if (selectedCell.piece.type == PieceTypes.PIECES.king){

                /* Le pasamos la posicion y el tablero para que nos indique si es posible hacer un movimiento con la pieza de esa celda */
                this.isCheckMateCont = selectedCell.piece.availableMovements([file, rank], this.boardMatrix);

            } else {

                /* En caso de que más de una pieza esté dando jaque no se puede interceptar el jaque */
                if (this.contPiecesChecking == 1) this.canStopCheckMate = selectedCell.piece.canStopCheck(this.checkCellIJ, this.boardMatrix);
            }

        }

        /* Guardamos las coordenadas de la Previous Cell */
        this.previousCellIJ = [file, rank];

        /* Guardamos la previousCell como la casilla seleccionada */
        this.previousCell = selectedCell;

        /* Añadimos al array de las celdas seleccionadas la celda seleccionada */
        this.selectedCells.push(selectedCell);

        selectedCell.setSelected(true);

        /* Indicamos a true el movimiento de la pieza al mover el ratón */
        this.isDragging = true;

        /* Volvemos a dibujar el tablero para ver los cambios */
        this.renderBoard();
        
    }

    /**
    * @function dropPiece = Función para soltar la pieza en la casilla seleccionada
    * @param {MouseEvent} e = MouseEvent al soltar la pieza
    */
    dropPiece(e){

        this.isPrinted = false;

        /* Comprobamos si no hay una casilla seleccionada ya que no tendria sentido el metodo en ese caso */
        if (!this.previousCell) return;

        /* Capturamos el offSet X e Y de donde se ha producido el evento */
        const { offsetX, offsetY } = e;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
        const selectedCell = this.boardMatrix[file][rank];

        /* Comprobamos que si la celda que ha seleccionada es la misma que la celda anterior no haga nada */
        if (this.previousCell == selectedCell) {
            this.previousCell = null;
            this.clearSelections();
            this.clearPosibleMoves();
            this.renderBoard();
            return;
        }

        /* Comprobamos que donde se quiere dejar la pieza es una celda con movimiento válido */
        if (!selectedCell.availableMove) {
            this.previousCell = null;
            this.clearSelections();
            this.clearPosibleMoves();
            this.renderBoard();
            return;
        }
        
        /* Enviamos al socket la celda seleccionada anteriormente y la celda actual que se ha seleccionado */
        socket.emit('move', [this.previousCellIJ, [file, rank]]);

        this.isDragging = false;

    }

    /**
    * @function 
    * @param {MouseEvent} e = MouseEvent al hacer click
    */
    dragPiece(e){

        /* TODO DRAG PIECE */
        
        /*
        const { offsetX, offsetY } = e;
        const canMouseX = parseInt(offsetX);
        const canMouseY = parseInt(offsetY);

        if (!this.isDragging) return;

        if (!this.previousCell) return;

        const i = Math.floor(offsetX / this.cell_width);
        const j = Math.floor(offsetY / this.cell_height);

        let rectColor = this.theme.light;

        if (!this.isPrinted){

            if ((i + j) % 2){
                rectColor = this.theme.dark;
            } 

            this.ctx.fillStyle = rectColor;

            this.ctx.fillRect(i * this.cell_width, j * this.cell_height, this.cell_width, this.cell_height);
        }

        this.isPrinted = true;
        
        this.ctx.clearRect(0, 0, this.width_board, this.height_board);
        this.ctx.fillStyle = this.pieceTheme.dark;

        this.ctx.fillText(this.previousCell.piece.renderPiece[0], canMouseX, canMouseY);

        if (this.previousCell.piece.color == Color.THEME.light){
            this.ctx.fillStyle= this.pieceTheme.light;
            this.ctx.fillText(this.previousCell.piece.renderPiece[1], canMouseX, canMouseY);
        } 

        this.renderBoard();
        */
    }

    /**
     * 
     * @returns devuelve la celda donde se encuentra el rey del jugador que está moviendo en ese momento
     */
     getKing(selectedCell){

        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){
                const cell = this.boardMatrix[i][j];
                if (cell.piece){
                    if (cell.piece.type == PieceTypes.PIECES.king && cell.piece.color == selectedCell.piece.color) return cell;
                }
            }
        }
    }

    /**
     * 
     * @returns devuelve la celda donde se encuentra el rey del jugador que está moviendo en ese momento
     */
    getEnemyKing(selectedCell){

        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){
                const cell = this.boardMatrix[i][j];
                if (cell.piece){
                    if (cell.piece.type == PieceTypes.PIECES.king && cell.piece.color != selectedCell.piece.color) return cell;
                }
            }
        }
    }

    /**
     * @function shortCastle realiza el enroque corto
     * @param {int} file fila de la celda del tablero
     * @param {int} rank columna de la fila del tablero
     * @param {Cell} selectedCell celda seleccionada
     */
    shortCastle(previousCell, file, rank, selectedCell){

        if (!previousCell.piece.moved){

            const selectedCellRockShort = this.boardMatrix[file + 1][rank];
            
            /* En caso de que la pieza sea blanca cogemos la celda del enroque corto blanco */
            if (previousCell.piece.color == Color.THEME.light) {
                var selectedCastle = this.boardMatrix[6][7];
            /* En caso de que la pieza sea negra cogemos la celda del enorque corto negro */
            } else {
                var selectedCastle = this.boardMatrix[6][0];
            }

            /* En caso de que se haya seleccionado la celda de enroque largo movemos la torre a la posición que le corresponde */
            const selectedNewCellRock = this.boardMatrix[file - 1][rank];
            if (selectedCastle == selectedCell){
                if (!selectedCellRockShort.piece.moved){
                    selectedNewCellRock.setPiece(selectedCellRockShort.piece);
                    selectedCellRockShort.setPiece(null);
                }
            }
        }
    }

    /**
     * @function shortCastle realiza el enroque largo
     * @param {int} file fila de la celda del tablero
     * @param {int} rank columna de la fila del tablero
     * @param {Cell} selectedCell celda seleccionada
     */
    longCastle(previousCell, file, rank, selectedCell){

        if (!previousCell.piece.moved){

            const selectedCellRockLongWhite = this.boardMatrix[file - 2][rank];

            /* En caso de que la pieza sea blanca cogemos la celda del enroque corto blanco */
            if (previousCell.piece.color == Color.THEME.light){
                var selectedCastle = this.boardMatrix[2][7];
            /* En caso de que la pieza sea negra cogemos la celda del enorque corto negro */
            } else {
                var selectedCastle = this.boardMatrix[2][0];
            }
            
            /* En caso de que se haya seleccionado la celda de enroque largo movemos la torre a la posición que le corresponde */
            const selectedNewCellRock = this.boardMatrix[file + 1][rank];
            if (selectedCastle == selectedCell){
                if (!selectedCellRockLongWhite.piece.moved){
                    selectedNewCellRock.setPiece(selectedCellRockLongWhite.piece);
                    selectedCellRockLongWhite.setPiece(null);
                }
            }
        }
    }

    /**
     * @function onSocketMove Función que devuele el movimiento en ambos tableros de los jugadores
     * @param {Array<int, int>} prev = array con la I y la J de la posición de la celda previa seleccionada
     * @param {Array<int, int>} next = array con la I y la J de la posición de la celda actual seleccionada
     */
    onSocketMove([prev, next]){

        const [iPrev, jPrev] = prev;
        const [iNext, jNext] = next;

        const selectedCell = this.boardMatrix[iNext][jNext];

        const previousCell = this.boardMatrix[iPrev][jPrev];

        /* Colocamos la pieza seleccionada en la celda seleccionada  */
        selectedCell.setPiece(previousCell.piece);

        /* Añadimos la celda seleccionada al array de celdas seleccionadas para limpiarlo posteriormente */
        this.selectedCells.push(selectedCell);
        this.selectedCells.push(previousCell);

        /* Miramos si la pieza que hemos movido es el rey */
        if (previousCell.piece.type == PieceTypes.PIECES.king){

            /* Enroque corto */
            this.shortCastle(previousCell, iNext, jNext, selectedCell);

            /* Enroque largo */
            this.longCastle(previousCell, iNext, jNext, selectedCell);
            
        }      

        /* Eliminamos la pieza de la casilla en la que se encontraba anteriormente */
        previousCell.setPiece(null);

        /* Volvemos a null el valor de la celda anterior seleccionada */
        this.previousCell = null;
        selectedCell.setSelected(true);

        /* Cambiamos el valor de isBlack al contrario del actual para girar el tablero */
        //this.isBlack = !this.isBlack;

        /* Ponemos a true la booleana que dice si la pieza se ha movido */
        selectedCell.piece.moved = true;

        /* Miramos si en caso de que la selectedCell contenga un peón, el peón ha promovido a reina */
        this.promotePawn(selectedCell, jNext);

        /* Comprobamos si con el movimiento realizado hacemos jaque al rey enemigo */
        this.contPiecesChecking = this.isCheck(selectedCell);

        /* Si se ha podido mover pieza, reseteamos el valor de isCheck a false */
        const cellKing = this.getKing(selectedCell);

        const cellEnemyKing = this.getEnemyKing(selectedCell);

        if (cellEnemyKing.piece.isCheck){

            this.isCheckMate(selectedCell);

        }

        this.isStalemated(selectedCell);

        this.insuficientMaterial();

        cellKing.piece.isCheck = false;

        /* Volvemos a poner disabled en true para cambiar el turno */
        this.disabled = true;

        /* Limpiamos las celdas que tienen availableMoves a true para limpiar el tablero */
        this.clearPosibleMoves();

        /* Pintamos el tablero para volver a ver los cambios */
        this.renderBoard();
        
    }

    /**
     * @function isCheckMate = Indica si con el último movimiento se ha dado jaque mate 
     * @param {Cell} selectedCell = Indica la celda seleccionada
     */
    isCheckMate(selectedCell){

        /* Conseguimos las celdas del rey contrario del jugador que está moviendo actualmente */
        const cellKing = this.getEnemyKing(selectedCell);

        /* Si el rey no se encuentra amenazado salimos */
        if (!cellKing.piece.isCheck) return;

        /* Miramos a ver si el rey puede moverse a alguna casilla en caso de que sea jaque o si alguna pieza puede parar el jaque */
        for (let i = 0; i <= this.files; i++){
            for (let j = 0; j <= this.ranks; j++){
                var cell = this.getCellFromCoords([i, j], this.boardMatrix);
                if (cell){
                    if (cell.piece){

                        if (cell.piece.color != selectedCell.piece.color){
                            /* En caso de que la pieza sea el rey, miramos si puede efectuar algún movimiento para ver si es jaque mate */
                            if (cell.piece.type == PieceTypes.PIECES.king){
                                if (cell.piece.availableMovements([i, j], this.boardMatrix) > 0) return;
                                /* En caso de que la pieza no sea el rey, miramos si puede efectuar algún movimiento para evitar el jaque a su rey */
                            } else {
                                if (cell.piece.canStopCheck(this.checkCellIJ, this.boardMatrix) > 0) return;
                            }
                        }
                    }
                }                
            }
        }

        /* Borramos el AvailableMove de todas las celdas debido a que llamamos a los metodos (AvailableMovements y canStopCheck) */
        this.clearPosibleMoves();

        /* En caso de que el rey no pueda moverse y ninguna pieza pueda intervenir en el jaque, indicamos que es Jaque Mate */
        alert ("CHECK MATE");
        /* Emitimos al servidor que se ha producido un jaque mate */
        socket.emit('checkMate', cellKing);

    }

    /**
     * @function isStalemated = Función que indicará si se ha producdio tablas mediante "Rey Ahogado"
     * @param {Cell} selectedCell = Celda seleccionada
     */
    isStalemated(selectedCell){
        const cellEnemyKing = this.getEnemyKing(selectedCell);

        if (cellEnemyKing.piece.isCheck) return;

        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){
                var cell = this.getCellFromCoords([i, j], this.boardMatrix);
                if (cell){
                    if (cell.piece){

                        if (cell.piece.color == cellEnemyKing.piece.color){
                            /* En caso de que la pieza sea el rey, miramos si puede efectuar algún movimiento para ver si son tablas */
                            if (cell.piece.type == PieceTypes.PIECES.king){
                                if (cell.piece.availableMovements([i, j], this.boardMatrix) > 0) return;
                                /* En caso de que la pieza no sea el rey, miramos si puede efectuar algún movimiento para ver si son tablas */
                            } else {
                                if (cell.piece.availableMovements([i, j], this.boardMatrix) > 0) return;
                            }
                        }
                    }
                }
            }
        }

        alert("TABLAS - Por rey Ahogado");
        /* Emitimos al servidor que se ha producido tablas */
        socket.emit('tablas');

        this.finishGame = true;
        
    }

    /**
     * @function insuficientMaterial = Indica si la partida es tablas por "Material Insuficiente"
     */
    insuficientMaterial(){
        var contPiecesWhite = 0;
        var contPiecesBlack = 0;
        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){
                const cell = this.getCellFromCoords([i, j], this.boardMatrix);
                if (cell){ 
                    if (cell.piece){
                        if (cell.piece.type == PieceTypes.PIECES.queen || cell.piece.type == PieceTypes.PIECES.rook || cell.piece.type == PieceTypes.PIECES.pawn) return;
                        if (cell.piece.color == Color.THEME.light && cell.piece.type == PieceTypes.PIECES.knight || cell.piece.type == PieceTypes.PIECES.bishop) contPiecesWhite++;
                        if (cell.piece.color == Color.THEME.dark  && cell.piece.type == PieceTypes.PIECES.knight || cell.piece.type == PieceTypes.PIECES.bishop) contPiecesBlack++;
                    }
                }
            }
        }
        if (contPiecesWhite < 2 && contPiecesBlack < 2){
            alert("TABLAS - Por insuficiencia de material");
            socket.emit('tablas');
        }
        
    }

    /**
     * @function onSocketTurn = Indicará el turno de cada jugador
     */
    onSocketTurn(){

        /* Una vez movido, cambiará el turno */
        this.disabled = false;
    }

    /**
     * @function onSocketBlackPlayer = Indicará que en caso de que el jugador juegue con las piezas negras, se gire el tablero
     */
    onSocketBlackPlayer(){

        /* En caso de que el usuario sea negras se girará el tablero */
        this.isBlack = true;

        /* Volvemos a pintar el tablero para reflejar los cambios */
        this.renderBoard();
    }

    /**
     * @function promotePawn = Función para que en caso de que el peón llegue a la última fila promueba
     * @param {Cell} selectedCell = Celda seleccionada
     * @param {Integer} jNext = Índice J del tablero
     */
    promotePawn(selectedCell, jNext){

        if (selectedCell.piece.type != PieceTypes.PIECES.pawn) return;

        /* Si el peón ha llegado a la última fila, promueve a la pieza que seleccione */
        if (selectedCell.piece.color == Color.THEME.light && jNext == 0 || selectedCell.piece.color == Color.THEME.dark && jNext == 7){
            selectedCell.setPiece(new Queen(selectedCell.piece.color));
        } 

    }    

    /* TODO --> NO CONSIGO QUE FUNCIONE BIEN
    getPieceToPromote(selectedCell){
        const optionsPromote = document.getElementsByClassName("btn");
        for (let i = 0; i < optionsPromote.length; i++){
            optionsPromote[i].addEventListener("click", function(){
                var stringPiece = this.getAttribute("value");
                const pieceClass = eval(`new ${stringPiece}(selectedCell.piece.color)`);
                console.log(stringPiece + "STRING PIECE");
                console.log(pieceClass);
                selectedCell.setPiece(pieceClass);
                console.log(selectedCell);
                const divPromotePawn = document.getElementById("promote-pawn");
                divPromotePawn.style.display = "none";  
            })
        } 
        this.renderBoard();
    }*/

    /**
    * @function clearSelections = Borra las celdas seleccionadas del array para limpiarlo
    */
    clearSelections(){
        this.selectedCells.forEach((celda) => celda.setSelected(false));
        /* Limpiamos el array */
        this.selectedCells = [];
    }

    /**
     * @function clearPosibleMoves = Pone a false el AvailableMove de todas las celdas
     */
    clearPosibleMoves(){
        this.boardMatrix.forEach((file) => {
            file.forEach((cell) => {
              cell.setAvailableMovement(false);
            });
        });      
    }

    /**
     * 
     * @param {integer} i Coordenada i de la casilla del tablero
     * @param {integer} j Coordenada j de la casilla del tablero
     * @returns retorna las coordenadas de la celda que se ha seleccionado
     */
    mouseCoordinatesToCell(i, j){
        /* Con el valor de Offset dividido del tamaño de la celda podemos saber la celda que se esta seleccionando en ese momento */
        let file = Math.floor(i / this.cell_width);
        let rank = Math.floor(j / this.cell_height);

        /* Modificamos las coordenadas en caso de que el tablero esté girado para que nos devuelva las coordenadas correctas */
        if (this.isBlack){
            file = this.files - 1 - file;
            rank = this.ranks - 1 - rank
        }
        return [file, rank];
    }

    /**
     * @function setSelectCell = Cambia la propiedad selected a true de la celda que ha seleccionado el usuario
     * @param {MouseEvent} e = MouseEvent al hacer click
     */
    setSelectedCell(e){
        /* Capturamos el offSet X e Y de donde se ha producido el evento */
        const { offsetX, offsetY } = e;
        const [file, rank] = this.mouseCoordinatesToCell(offsetX, offsetY);
        const selectedCell = this.boardMatrix[file][rank];

        /* Cambiamos a true la casilla seleccionada */
        selectedCell.setSelected(true);

        /* Volvemos a dibujar el tablero para ver los cambios */
        this.renderBoard();
    }

    setMouseCell(e){
        /* Con el valor de Offset dividido del tamaño de la celda podemos saber la celda que se esta seleccionando en ese momento */
        const { offsetX, offsetY } = e;
        const i = Math.floor(offsetX / this.cell_width);
        const j = Math.floor(offsetY / this.cell_height);
    }

    /**
    * @function initPlacePiece = Función para colocar la pieza que se envia por parametro en la casilla correspondientes
    * @param {i: number} Posición de la fila que corresponde al tablero
    * @param {j: number} Posición de la columna que corresponde al tablero
    * @param {piece: Piece} Pieza que queremos introducir en la celda 
    */
    initPlacePiece(i, j, piece){
        const cell = this.boardMatrix[i][j];
        cell.setPiece(piece);
    }

    /**
     * @function isCheck = nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
     * @param {Cell} selectedCell = Celda seleccionada
     */
    isCheck(selectedCell) {

        if (!selectedCell) return;

        var contChecks = 0;

        /* Miramos todas las direcciones posibles */
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

        /* Conseguimos las coordenadas y la celda del rey enemigo */
        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){
                const cell = this.boardMatrix[i][j];
                if (cell.piece){
                    if (cell.piece.type == PieceTypes.PIECES.king && cell.piece.color != selectedCell.piece.color){
                        var iPos = i;
                        var jPos = j;
                        var cellKing = this.getCellFromCoords([i, j], this.boardMatrix);
                    }
                }
            }
        }

        /** PAWNS **/

        /* Cogemos las diagonal del rey pero solo desplazando una casilla hacia delante */
        if (selectedCell.piece.color == Color.THEME.dark){
            var cellDiagonalLeft = this.getCellFromCoords([iPos - 1, jPos - 1], this.boardMatrix);
            var cellDiagonalRight = this.getCellFromCoords([iPos + 1, jPos - 1], this.boardMatrix); 
        } else {
            var cellDiagonalLeft = this.getCellFromCoords([iPos + 1, jPos + 1], this.boardMatrix);
            var cellDiagonalRight = this.getCellFromCoords([iPos - 1, jPos + 1], this.boardMatrix);
        }

        if (cellDiagonalLeft){
            if (cellDiagonalLeft.piece && cellDiagonalLeft.piece.color != cellKing.piece.color){

                /* Si en la diagonal se encuentra un peon cambiamos a jaque el rey y enviamos la posición donde se encuentra */
                if (cellDiagonalLeft.piece.type == PieceTypes.PIECES.pawn){
                    cellKing.piece.isCheck = true;
                    contChecks++;
                    if (selectedCell.piece.color == Color.THEME.dark){
                        this.checkCellIJ = [iPos - 1, jPos - 1];
                    } else {
                        this.checkCellIJ = [iPos + 1, jPos + 1];
                    }
                }
            }
        }
        

        if (cellDiagonalRight){
            if (cellDiagonalRight.piece && cellDiagonalRight.piece.color != cellKing.piece.color){

                /* Si en la diagonal se encuentra un peon cambiamos a jaque el rey y enviamos la posición donde se encuentra */
                if (cellDiagonalRight.piece.type == PieceTypes.PIECES.pawn){
                    cellKing.piece.isCheck = true;
                    contChecks++;
                    if (selectedCell.piece.color == Color.THEME.dark){
                        this.checkCellIJ = [iPos + 1, jPos - 1];
                    } else {
                        this.checkCellIJ = [iPos - 1, jPos + 1];
                    }
                }
            }
        }
        

        /** KNIGHT **/
        /* Posibles movimientos del caballo */
        const possibleMoves = [
            [iPos - 1, jPos - 2], 
            [iPos + 1, jPos - 2], 
            [iPos + 2, jPos - 1],
            [iPos + 2, jPos + 1],
            [iPos - 2, jPos + 1],
            [iPos + 1, jPos + 2],
            [iPos - 1, jPos + 2],
            [iPos - 2, jPos - 1]
        ];

        /* Recorremos el array para encontrar al rey en una de las casillas amenzadas por el caballo */
        for (let i = 0; i < possibleMoves.length; i++){

            const cell = this.getCellFromCoords(possibleMoves[i], this.boardMatrix);
            
            if (cell){
                
                if (cell.piece){

                    /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
                    if (cell.piece.color != cellKing.piece.color){
                        /* Si a un salto de caballo de rey se encuentra un caballo, cambiamos isCheck a true */
                        if (cell.piece.type == PieceTypes.PIECES.knight){
                            cellKing.piece.isCheck = true;
                            contChecks++;
                            this.checkCellIJ = possibleMoves[i];
                            break;
                        }
                    }
                }
            }
            
        }

        /** QUEEN, ROOK AND BISHOP **/

        /* Recorremos todas las direcciones para encontrar una pieza que haga jaque al rey enemigo */
        for (let l = 0; l < directions.length; l++) {

            const iDir = directions[l][0];
            const jDir = directions[l][1];

            for (let k = 1; k <= this.boardMatrix.length; k++){

            /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
            const cell = this.getCellFromCoords([iPos + (k * iDir), jPos + (k * jDir)], this.boardMatrix);

                if (cell && cell.piece){

                    if (cell.piece.color == cellKing.piece.color) break;

                    /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
                    if (cell.piece.color != cellKing.piece.color){

                        /* En caso de que se esté comprobando las diagonales, miramos si la pieza encontrada es un alfil o una reina */
                        if (l < 4){
                            if (cell.piece.type == PieceTypes.PIECES.bishop || cell.piece.type == PieceTypes.PIECES.queen){
                                cellKing.piece.isCheck = true;
                                contChecks++;
                                this.checkCellIJ = [iPos + (k * iDir), jPos + (k * jDir)];
                            } else {
                                break;
                            }
                                
                        /* En caso de que se esté comprobando las rectas, miramos si la pieza encontrada es una torre o una reina */
                        } else {
                            if (cell.piece.type == PieceTypes.PIECES.rook || cell.piece.type == PieceTypes.PIECES.queen){
                                cellKing.piece.isCheck = true;
                                contChecks++;
                                this.checkCellIJ = [iPos + (k * iDir), jPos + (k * jDir)];
                            } else {
                                break;
                            }
                                
                        } 
                    }
                }
            }
        }
        return contChecks;
    }

    /**
     * @function getCellFromCoords = función para que nos retorne con seguridad una celda existente a partir de sus coordenadas
     * @param {Array<Integer>} position 
     * @param {Array<Integer>} boardMatrix 
     * @returns {Cell} cell = retorna la celda con las coordenadas enviadas por parámetro
     */
    getCellFromCoords(position){
        const [i, j] = position;
        const rank = this.boardMatrix[i] || [];
        const cell = rank[j];
        return cell;
    }

    /**
    * @function renderBoard = Función para renderizar el tablero 
    */
    renderBoard(){
        const arrayLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];
        var contLetters = 0;
        
        for (let i = 0; i < this.files; i++){
            for (let j = 0; j < this.ranks; j++){

                /* Obtenemos la fila y columna para pintarla al girar el tablero */
                let drawI = i;
                let drawJ = j;

                /* En caso de que isBlack sea true, invertimos las posiciones para pintarlas */
                if (this.isBlack){
                    drawI = this.ranks - 1 - drawI;
                    drawJ = this.files - 1 - drawJ;
                }

                let rectColor = this.theme.light;
                let textColor = this.theme.dark;

                /* Pintamos las casillas del color dependiendo de si la casilla es par o impar */
                if ((drawI + drawJ) % 2){
                    rectColor = this.theme.dark;
                    textColor = this.theme.light;
                } 

                /* Creamos los cuadrados de la anchura y la altura de la celda separados por la anchura y la altura de la celda */
                this.ctx.fillStyle = rectColor;
                this.ctx.fillRect(drawI * this.cell_width, drawJ * this.cell_height, this.cell_width, this.cell_height);

                /* Cambiamos el color del texto al contrario de la casilla para imprimir las coordenadas */
                this.ctx.fillStyle = textColor;

                /* Centramos el texto del canvas alineado al medio y al centro */
                this.ctx.textBaseline = 'top';
                this.ctx.textAlign = 'start';
                this.ctx.font = '14px Arial';

                /* Añadimos los números y letras del tablero dependiendo de si se está jugando con negras o blancas */
                if (!this.isBlack){
                    if (i == 0){
                        this.ctx.fillText(`${this.files - drawJ}`, 
                        drawI * this.cell_width + 10, 
                        drawJ * this.cell_height + 10);
                    }
    
                    if (j == 7){
                        this.ctx.fillText(`${arrayLetters[contLetters]}`, 
                        drawI * this.cell_width + 80, 
                        drawJ * this.cell_height + 10);
                        contLetters++;
                    }
                } else {
                    if (j == 0){
                        this.ctx.fillText(`${arrayLetters[contLetters]}`, 
                        drawI * this.cell_width + 80, 
                        drawJ * this.cell_height + 10);
                        contLetters++;
                    }
    
                    if (i == 7){
                        this.ctx.fillText(`${drawJ + 1}`, 
                        drawI * this.cell_width + 10, 
                        drawJ * this.cell_height + 10);
                    }
                }
                
                

                /* Comprobamos qual es la casilla seleccionada */
                const cell = this.boardMatrix[i][j];

                /* Comprobamos si la celda está seleccionada */
                if (cell.selected) {
                    /* Dibujamos un pequeño margen amarillo para guardar el movimiento de la pieza */
                    this.ctx.fillStyle = "#8180d1";
                    this.ctx.globalAlpha = 0.8;
                    this.ctx.fillRect(
                        drawI * this.cell_width, 
                        drawJ * this.cell_height, 
                        this.cell_width, 
                        this.cell_height
                    )
                    this.ctx.globalAlpha = 1;
                }

                /* Comprobamos si hay celdas disponibles para el movimiento de la pieza seleccionda */
                if (cell.availableMove) {
                    /* Dibujamos un circulo en las casillas disponibles para la pieza seleccionada */
                    this.ctx.fillStyle = "#000000";
                    this.ctx.globalAlpha = 0.3;
                    this.ctx.beginPath();
                    this.ctx.arc(
                        drawI * this.cell_width + this.cell_width / 2, 
                        drawJ * this.cell_height + + this.cell_height / 2, 
                        16,
                        0,
                        2 * Math.PI);
                    this.ctx.fill();
                    
                    /* Reseteamos el Alpha */
                    this.ctx.globalAlpha = 1;
                    
                    /* Incluimos las celdas con availableMove a true al array */
                    this.posibleMoves.push(cell);
                }

                /* Comprobamos si existe la pieza dentro de la celda y la PINTAMOS */
                const piece = cell?.piece;

                if (piece){

                    /* Comprobamos que al rey del jugador que lo toca mover no esté en jaque, si lo está, lo remarcamos con un borde rojo */
                    if (piece.type == PieceTypes.PIECES.king){
                        if (piece.isCheck){
                            this.ctx.fillStyle = "red";
                            this.ctx.globalAlpha = 0.8;
                            this.ctx.fillRect(
                                drawI * this.cell_width, 
                                drawJ * this.cell_height, 
                                this.cell_width, 
                                this.cell_height
                            )
                            this.ctx.globalAlpha = 1;
                        }
                    }

                    /* Asignamos el color del contexto el color del jugador que le toca mover */
                    this.ctx.fillStyle = this.pieceTheme[piece.color];
                    
                    /* Centramos el texto del canvas alineado al medio y al centro */
                    this.ctx.textBaseline = 'middle';
                    this.ctx.textAlign = 'center';

                    /* Modificamos el tamaño de la pieza */
                    this.ctx.font = '72px Arial';
                    /* Añadimos las fichas en el centro de la casilla */
                    this.ctx.fillStyle = piece.color;
                    this.ctx.fillText(piece.renderPiece[0], 
                        drawI * this.cell_width + this.cell_width / 2, 
                        drawJ * this.cell_height + this.cell_height / 2 + this.piece_offset);

                    this.ctx.fillStyle = this.pieceTheme.dark; //Conseguimos sobreponer las imagenes en caso de que sean piezas blancas y asi resaltar más la pieza
                    if (this.pieceTheme[piece.color] == '#FFFFFF') this.ctx.fillText(piece.renderPiece[1], 
                        drawI * this.cell_width + this.cell_width / 2, 
                        drawJ * this.cell_height + this.cell_height / 2 + this.piece_offset);
                    
                }
                
            }
        }
    }   
    
}

export {Board}
