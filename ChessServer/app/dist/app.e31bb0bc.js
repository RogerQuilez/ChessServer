// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"socket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = void 0;

/*** SOCKET ***/
var socket = io.connect('http://localhost');
exports.socket = socket;
socket.on('connected', function (data) {
  console.log({
    data: data
  });
});
},{}],"classes/Cell.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cell = /*#__PURE__*/function () {
  /**
   * @type {Piece} piece = Pieza que es encuentra en esa celda
   */

  /**
   * @type {boolean} selected = Indica la pieza seleccionada (proporcionada por el tablero)
   */

  /**
   * @type {boolean} availableMove = Inica si es posible realizar un movimiento o no
   */

  /**
   * 
   * @param {Piece} piece Pieza del tablero
   */
  function Cell(piece) {
    _classCallCheck(this, Cell);

    _defineProperty(this, "piece", void 0);

    _defineProperty(this, "selected", void 0);

    _defineProperty(this, "availableMove", void 0);

    this.piece = piece;
    this.selected = false;
    this.availableMove = false;
  }
  /**
   * 
   * @param {boolean} selected Pieza seleccionada
   */


  _createClass(Cell, [{
    key: "setSelected",
    value: function setSelected(selected) {
      this.selected = selected;
    }
    /**
     * 
     * @param {Piece} piece Pieza que queremos introducir en la celda
     */

  }, {
    key: "setPiece",
    value: function setPiece(piece) {
      this.piece = piece;
    }
    /**
     * 
     * @param {boolean} availableMove 
     */

  }, {
    key: "setAvailableMovement",
    value: function setAvailableMovement(availableMove) {
      this.availableMove = availableMove;
    }
  }]);

  return Cell;
}();

exports.Cell = Cell;
},{}],"types/Theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Theme = function Theme() {
  _classCallCheck(this, Theme);

  _defineProperty(this, "dark", void 0);

  _defineProperty(this, "light", void 0);
};

exports.Theme = Theme;
},{}],"types/PieceTypes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieceTypes = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PieceTypes = function PieceTypes() {
  _classCallCheck(this, PieceTypes);
};

exports.PieceTypes = PieceTypes;

_defineProperty(PieceTypes, "PIECES", {
  king: 'k',
  queen: 'q',
  rook: 'r',
  bishop: 'b',
  knight: 'n',
  pawn: 'p'
});
},{}],"types/Color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Color = function Color() {
  _classCallCheck(this, Color);
};

exports.Color = Color;

_defineProperty(Color, "THEME", {
  light: 'light',
  dark: 'dark'
});
},{}],"classes/Board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var _Cell = require("./Cell.js");

var _Theme = require("../types/Theme.js");

var _PieceTypes = require("../types/PieceTypes.js");

var _Color = require("../types/Color.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Board = /*#__PURE__*/function () {
  /**
  * @type {integer} width_board = Anchura del canvas
  * @type {integer} height_board = Altura del canvas
  */

  /**
  * @type {integer} files = Filas del TABLERO
  * @type {integer} ranks = Columnas del TABLERO
  */

  /**
  * @type {Theme} theme = Theme del tablero
  * @type {Theme} pieceTheme = Theme de las piezas
  */

  /**
  * @type {integer} cell_width = Tamaño de cada celda del tablero
  * @type {integer} cell_height = Altura de cada celda del tablero
  */

  /**
  * @type {integer}  piece_offset = Offset de la pieza en el tablero para centrarlas hacia abajo
  */

  /**
  * @type {Cell} previousCell = Celda anterior para poder eliminar la ficha una vez movida 
  */

  /**
  * @type {Array.<Cell>} selectedCells = Array de Cells que guarda las casillas seleccionadas
  */

  /**
   * @type {Array.<Cell>} posibleMoves = Array de Cells para guardar las casillas con posibles movimientos para las piezas
   */

  /**
  * @type {Cell} boardMatrix = Tablero 
  */

  /**
   * @type {string} currentPlayer = Indica el color del actual jugador
   * @type {string} previousPlayer = Indica el color del anterior jugador
   */

  /**
  * @type {HTMLCanvasElement} $canvas = Canvas sobre el que dibujamos el juego
  * @type {CanvasRenderingContext2D} ctx = Contexto 2d del canvas 
  */

  /**
   * @type {boolean} boardMove = Indica si el tablero se tiene que girar o no
   */

  /**
   * 
   * @param width_board 
   * @param height_board 
   * @param files 
   * @param ranks 
   * @param theme 
   */
  function Board(width_board, height_board, files, ranks, theme, pieceTheme) {
    _classCallCheck(this, Board);

    _defineProperty(this, "width_board", void 0);

    _defineProperty(this, "height_board", void 0);

    _defineProperty(this, "files", void 0);

    _defineProperty(this, "ranks", void 0);

    _defineProperty(this, "theme", void 0);

    _defineProperty(this, "pieceTheme", void 0);

    _defineProperty(this, "cell_width", void 0);

    _defineProperty(this, "cell_height", void 0);

    _defineProperty(this, "piece_offset", void 0);

    _defineProperty(this, "previousCell", void 0);

    _defineProperty(this, "selectedCells", void 0);

    _defineProperty(this, "posibleMoves", void 0);

    _defineProperty(this, "boardMatrix", void 0);

    _defineProperty(this, "currentPlayer", void 0);

    _defineProperty(this, "previousPlayer", void 0);

    _defineProperty(this, "$canvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "boardMove", void 0);

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
    /* Inicialzamos la celda a null para una vez seleccionada una pieza modificarla */

    this.previousCell = null;
    /* Inicializamos el array de celdas seleccionadas */

    this.selectedCells = [];
    /* Inicializamos el array de posibles movimientos */

    this.posibleMoves = [];
    /* Inicializamos el actual jugador y el previo para poder alternarlos */

    this.currentPlayer = _Color.Color.THEME.light;
    this.previousPlayer = _Color.Color.THEME.dark;
    /* Inicializamos el movimiento de tablero en true para pintarlo con las blancas abajo */

    this.boardMove = false;
    /* Canvas */

    this.$canvas = document.createElement('canvas');
    this.ctx = this.$canvas.getContext('2d');
    this.$canvas.width = this.width_board;
    this.$canvas.height = this.height_board;
    /* Introducimos el canvas en el body del documento */

    document.body.appendChild(this.$canvas);
    /* Inicializar el tablero */

    this.boardMatrix = [];

    for (var i = 0; i < this.files; i++) {
      this.boardMatrix[i] = [];

      for (var j = 0; j < this.ranks; j++) {
        /* Inicializamos el tablero en Celdas de null para que no de problemas al rellenar el tablero con las piezas */
        this.boardMatrix[i][j] = new _Cell.Cell(null);
      }
    }
    /* Bind method -> Sirve para poder usar el this en el metodo */


    this.setMouseCell = this.setMouseCell.bind(this);
    this.setSelectedCell = this.setSelectedCell.bind(this);
    this.pickPiece = this.pickPiece.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
    this.dragPiece = this.dragPiece.bind(this);
    this.$canvas.addEventListener('mousemove', this.dragPiece);
    /* Mousedown -> Capturamos donde estamos cogiendo la pieza seleccionada del tablero */

    this.$canvas.addEventListener('mousedown', this.pickPiece);
    /* Mouseup -> Capturamos en que celda dejamos la pieza seleccionada del tablero */

    this.$canvas.addEventListener('mouseup', this.dropPiece);
  }
  /**
  * @function pickPiece = Selecciona la pieza que ha clicado el usuario y vuelve a pintar el tablero para reflejar los cambios
  * @param {MouseEvent} e = MouseEvent al hacer click sobre la pieza
  */


  _createClass(Board, [{
    key: "pickPiece",
    value: function pickPiece(e) {
      /* Limpiamos las celdas para que solo quede marcado el último movimiento */
      this.clearSelections();
      /* Comprobamos si hay una casilla seleccionada para asi no poder volver a seleccionar otra */

      if (this.previousCell) return;
      /* Capturamos el offSet X e Y de donde se ha producido el evento */

      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      var _this$mouseCoordinate = this.mouseCoordinatesToCell(offsetX, offsetY),
          _this$mouseCoordinate2 = _slicedToArray(_this$mouseCoordinate, 2),
          file = _this$mouseCoordinate2[0],
          rank = _this$mouseCoordinate2[1];

      var selectedCell = this.boardMatrix[file][rank];
      /* Comprobamos si hay una pieza en la celda seleccionada, sino, hacemos un return */

      if (!selectedCell.piece) return;
      /* Solo permitimos mostrar los moviemientos disponibles de la pieza seleccionada en caso de que coincidan su color y el color del turno del jugador */

      if (this.currentPlayer == selectedCell.piece.color) {
        /* Cogemos la casilla donde se ubica el rey del jugador que está moviendo */
        var cellKing = this.getKing();
        /* En caso de que el rey del jugador que mueve no esté en jaque, puede mover todas las piezas */

        if (!cellKing.piece.isCheck) {
          /* Le pasamos la posicion y el tablero para que nos indique si es posible hacer un movimiento con la pieza de esa celda */
          selectedCell.piece.availableMovements([file, rank], this.boardMatrix);
          /* En caso de que el rey del jugador que mueve esté en jaque, solo podrá mover el rey */
        } else {
          if (selectedCell.piece.type != _PieceTypes.PieceTypes.PIECES.king) return;
          /* Le pasamos la posicion y el tablero para que nos indique si es posible hacer un movimiento con la pieza de esa celda */

          selectedCell.piece.availableMovements([file, rank], this.boardMatrix);
        }
        /* Guardamos la previousCell como la casilla seleccionada */


        this.previousCell = selectedCell;
        this.selectedCells.push(selectedCell);
        selectedCell.setSelected(true);
        /* Volvemos a dibujar el tablero para ver los cambios */

        this.renderBoard();
      }
    }
    /**
    * @function dropPiece = Función para soltar la pieza en la casilla seleccionada
    * @param {MouseEvent} e = MouseEvent al soltar la pieza
    */

  }, {
    key: "dropPiece",
    value: function dropPiece(e) {
      /* Comprobamos si no hay una casilla seleccionada ya que no tendria sentido el metodo en ese caso */
      if (!this.previousCell) return;
      /* Capturamos el offSet X e Y de donde se ha producido el evento */

      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      var _this$mouseCoordinate3 = this.mouseCoordinatesToCell(offsetX, offsetY),
          _this$mouseCoordinate4 = _slicedToArray(_this$mouseCoordinate3, 2),
          file = _this$mouseCoordinate4[0],
          rank = _this$mouseCoordinate4[1];

      var selectedCell = this.boardMatrix[file][rank];
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
      /* Colocamos la pieza seleccionada en la celda seleccionada  */


      selectedCell.setPiece(this.previousCell.piece);
      /* Añadimos la celda seleccionada al array de celdas seleccionadas para limpiarlo posteriormente */

      this.selectedCells.push(selectedCell);
      /* Miramos si la pieza que hemos movido es el rey */

      if (this.previousCell.piece.type == _PieceTypes.PieceTypes.PIECES.king) {
        /* Enroque corto */
        this.shortCastle(file, rank, selectedCell);
        /* Enroque largo */

        this.longCastle(file, rank, selectedCell);
      }
      /* En caso de que la pieza desplazada no sea el rey, miramos si donde se situa la pieza seleccionada hace jaque al rey enemigo */


      if (selectedCell.piece.type != _PieceTypes.PieceTypes.PIECES.pawn) {
        if (selectedCell.piece.type != _PieceTypes.PieceTypes.PIECES.king) {
          selectedCell.piece.isCheck([file, rank], this.boardMatrix);
        }
      }
      /* Eliminamos la pieza de la casilla en la que se encontraba anteriormente */


      this.previousCell.setPiece(null);
      /* Volvemos a null el valor de la celda anterior seleccionada */

      this.previousCell = null;
      selectedCell.setSelected(true);
      /* Cambiamos el valor de boardMove al contrario del actual para girar el tablero */
      //this.boardMove = !this.boardMove;

      /* Ponemos a true la booleana que dice si la pieza se ha movido */

      selectedCell.piece.moved = true;
      /* Cambiamos el actual jugador al previo y el previo al actual */

      var auxCurrentPlayer = this.currentPlayer;
      this.currentPlayer = this.previousPlayer;
      this.previousPlayer = auxCurrentPlayer;
      /* En caso de que la pieza que se ha movido sea el rey, reseteamos el valor de isCheck a false */

      if (selectedCell.piece.type == _PieceTypes.PieceTypes.PIECES.king && selectedCell.piece.isCheck) selectedCell.piece.isCheck = false;
      /* Limpiamos las celdas que tienen availableMoves a true para limpiar el tablero */

      this.clearPosibleMoves();
      /* Pintamos el tablero para volver a ver los cambios */

      this.renderBoard();
    }
    /**
     * 
     * @returns devuelve la celda donde se encuentra el rey del jugador que está moviendo en ese momento
     */

  }, {
    key: "getKing",
    value: function getKing() {
      for (var i = 0; i < this.files; i++) {
        for (var j = 0; j < this.ranks; j++) {
          var cell = this.boardMatrix[i][j];

          if (cell.piece) {
            if (cell.piece.type == _PieceTypes.PieceTypes.PIECES.king && cell.piece.color == this.currentPlayer) return cell;
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

  }, {
    key: "shortCastle",
    value: function shortCastle(file, rank, selectedCell) {
      if (!this.previousCell.piece.moved) {
        var selectedCellRockShortWhite = this.boardMatrix[file + 1][rank];
        /* En caso de que la pieza sea blanca cogemos la celda del enroque corto blanco */

        if (this.previousCell.piece.color == _Color.Color.THEME.light) {
          var selectedCastle = this.boardMatrix[6][7];
          /* En caso de que la pieza sea negra cogemos la celda del enorque corto negro */
        } else {
          var selectedCastle = this.boardMatrix[6][0];
        }
        /* En caso de que se haya seleccionado la celda de enroque largo movemos la torre a la posición que le corresponde */


        var selectedNewCellRock = this.boardMatrix[file - 1][rank];

        if (selectedCastle == selectedCell) {
          if (!selectedCellRockShortWhite.piece.moved) {
            selectedNewCellRock.setPiece(selectedCellRockShortWhite.piece);
            selectedCellRockShortWhite.setPiece(null);
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

  }, {
    key: "longCastle",
    value: function longCastle(file, rank, selectedCell) {
      if (!this.previousCell.piece.moved) {
        var selectedCellRockLongWhite = this.boardMatrix[file - 2][rank];
        /* En caso de que la pieza sea blanca cogemos la celda del enroque corto blanco */

        if (this.previousCell.piece.color == _Color.Color.THEME.light) {
          var selectedCastle = this.boardMatrix[2][7];
          /* En caso de que la pieza sea negra cogemos la celda del enorque corto negro */
        } else {
          var selectedCastle = this.boardMatrix[2][0];
        }
        /* En caso de que se haya seleccionado la celda de enroque largo movemos la torre a la posición que le corresponde */


        var selectedNewCellRock = this.boardMatrix[file + 1][rank];

        if (selectedCastle == selectedCell) {
          if (!selectedCellRockLongWhite.piece.moved) {
            selectedNewCellRock.setPiece(selectedCellRockLongWhite.piece);
            selectedCellRockLongWhite.setPiece(null);
          }
        }
      }
    }
    /**
    * @function 
    * @param {MouseEvent} e = MouseEvent al hacer click
    */

  }, {
    key: "dragPiece",
    value: function dragPiece(e) {}
    /**
    * @function clearSelections = Borra las celdas seleccionadas del array para limpiarlo
    */

  }, {
    key: "clearSelections",
    value: function clearSelections() {
      this.selectedCells.forEach(function (celda) {
        return celda.setSelected(false);
      });
      /* Limpiamos el array */

      this.selectedCells = [];
    }
    /**
     * @function clearPosibleMoves = Pone a false las celdas que tengan AvailableMove a true
     */

  }, {
    key: "clearPosibleMoves",
    value: function clearPosibleMoves() {
      this.posibleMoves.forEach(function (celda) {
        return celda.setAvailableMovement(false);
      });
      /* Limpiamos el array */

      this.posibleMoves = [];
    }
    /**
     * 
     * @param {integer} i Coordenada i de la casilla del tablero
     * @param {integer} j Coordenada j de la casilla del tablero
     * @returns retorna las coordenadas de la celda que se ha seleccionado
     */

  }, {
    key: "mouseCoordinatesToCell",
    value: function mouseCoordinatesToCell(i, j) {
      /* Con el valor de Offset dividido del tamaño de la celda podemos saber la celda que se esta seleccionando en ese momento */
      var file = Math.floor(i / this.cell_width);
      var rank = Math.floor(j / this.cell_height);
      /* Modificamos las coordenadas en caso de que el tablero esté girado para que nos devuelva las coordenadas correctas */

      if (this.boardMove) {
        file = this.files - 1 - file;
        rank = this.ranks - 1 - rank;
      }

      return [file, rank];
    }
    /**
     * @function setSelectCell = Cambia la propiedad selected a true de la celda que ha seleccionado el usuario
     * @param {MouseEvent} e = MouseEvent al hacer click
     */

  }, {
    key: "setSelectedCell",
    value: function setSelectedCell(e) {
      /* Capturamos el offSet X e Y de donde se ha producido el evento */
      var offsetX = e.offsetX,
          offsetY = e.offsetY;

      var _this$mouseCoordinate5 = this.mouseCoordinatesToCell(offsetX, offsetY),
          _this$mouseCoordinate6 = _slicedToArray(_this$mouseCoordinate5, 2),
          file = _this$mouseCoordinate6[0],
          rank = _this$mouseCoordinate6[1];

      var selectedCell = this.boardMatrix[file][rank];
      /* Cambiamos a true la casilla seleccionada */

      selectedCell.setSelected(true);
      /* Volvemos a dibujar el tablero para ver los cambios */

      this.renderBoard();
    }
  }, {
    key: "setMouseCell",
    value: function setMouseCell(e) {
      /* Con el valor de Offset dividido del tamaño de la celda podemos saber la celda que se esta seleccionando en ese momento */
      var offsetX = e.offsetX,
          offsetY = e.offsetY;
      var i = Math.floor(offsetX / this.cell_width);
      var j = Math.floor(offsetY / this.cell_height);
    }
    /**
    * @function initPlacePiece = Función para colocar la pieza que se envia por parametro en la casilla correspondientes
    * @param {i: number} Posición de la fila que corresponde al tablero
    * @param {j: number} Posición de la columna que corresponde al tablero
    * @param {piece: Piece} Pieza que queremos introducir en la celda 
    */

  }, {
    key: "initPlacePiece",
    value: function initPlacePiece(i, j, piece) {
      var cell = this.boardMatrix[i][j];
      cell.setPiece(piece);
    }
    /**
    * @function renderBoard = Función para renderizar el tablero 
    */

  }, {
    key: "renderBoard",
    value: function renderBoard() {
      for (var i = 0; i < this.files; i++) {
        for (var j = 0; j < this.ranks; j++) {
          /* Obtenemos la fila y columna para pintarla al girar el tablero */
          var drawI = i;
          var drawJ = j;
          /* En caso de que boardMove sea true, invertimos las posiciones para pintarlas */

          if (this.boardMove) {
            drawI = this.ranks - 1 - drawI;
            drawJ = this.files - 1 - drawJ;
          }

          var rectColor = this.theme.light;
          var textColor = this.theme.dark;
          /* Pintamos las casillas del color dependiendo de si la casilla es par o impar */

          if ((drawI + drawJ) % 2) {
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
          this.ctx.font = '8px Arial';
          /* Añadimos las coordenadas en la izquierda arriba de la casilla */

          this.ctx.fillText("[".concat(i, " ").concat(j, "]"), drawI * this.cell_width + 10, drawJ * this.cell_height + 10);
          /* Comprobamos qual es la casilla seleccionada */

          var cell = this.boardMatrix[i][j];
          /* Comprobamos si la celda está seleccionada */

          if (cell.selected) {
            /* Dibujamos un pequeño margen amarillo para guardar el movimiento de la pieza */
            this.ctx.strokeStyle = "#FFFF00";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(drawI * this.cell_width, drawJ * this.cell_height, this.cell_width, this.cell_height);
          }
          /* Comprobamos si hay celdas disponibles para el movimiento de la pieza seleccionda */


          if (cell.availableMove) {
            /* Dibujamos un circulo en las casillas disponibles para la pieza seleccionada */
            this.ctx.fillStyle = "#000000";
            this.ctx.globalAlpha = 0.3;
            this.ctx.beginPath();
            this.ctx.arc(drawI * this.cell_width + this.cell_width / 2, drawJ * this.cell_height + +this.cell_height / 2, 16, 0, 2 * Math.PI);
            this.ctx.fill();
            /* Reseteamos el Alpha */

            this.ctx.globalAlpha = 1;
            /* Incluimos las celdas con availableMove a true al array */

            this.posibleMoves.push(cell);
          }
          /* Comprobamos si existe la pieza dentro de la celda y la PINTAMOS */


          var piece = cell === null || cell === void 0 ? void 0 : cell.piece;

          if (piece) {
            /* Comprobamos que al rey del jugador que lo toca mover no esté en jaque, si lo está, lo remarcamos con un borde rojo */
            if (piece.type == _PieceTypes.PieceTypes.PIECES.king) {
              if (piece.isCheck) {
                this.ctx.strokeStyle = "red";
                this.ctx.lineWidth = 3;
                this.ctx.strokeRect(drawI * this.cell_width, drawJ * this.cell_height, this.cell_width, this.cell_height);
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
            this.ctx.fillText(piece.renderPiece[0], drawI * this.cell_width + this.cell_width / 2, drawJ * this.cell_height + this.cell_height / 2 + this.piece_offset);
            this.ctx.fillStyle = this.pieceTheme.dark; //Conseguimos sobreponer las imagenes en caso de que sean piezas blancas y asi resaltar más la pieza

            if (this.pieceTheme[piece.color] == '#FFFFFF') this.ctx.fillText(piece.renderPiece[1], drawI * this.cell_width + this.cell_width / 2, drawJ * this.cell_height + this.cell_height / 2 + this.piece_offset);
          }
        }
      }
    }
  }]);

  return Board;
}();

exports.Board = Board;
},{"./Cell.js":"classes/Cell.js","../types/Theme.js":"types/Theme.js","../types/PieceTypes.js":"types/PieceTypes.js","../types/Color.js":"types/Color.js"}],"classes/Piece.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Piece = void 0;

var _PieceTypes = require("../types/PieceTypes.js");

var _Color = require("../types/Color.js");

var _Cell = require("./Cell.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Piece = /*#__PURE__*/function () {
  /**
   * @type {string} color = Color de la pieza (light / black)
   */

  /**
   * @type {string} type = Tipo de pieza
   */

  /**
   * @type {Array.<string>} renderPiece = variable para pintar las pieza
   */

  /**
   * @type {boolean} moved = variable para saber si hemos movido ya la pieza
   */

  /**
   * 
   * @param {string} type 
   * @param {string} color 
   * @param {Array<PieceTypes>} renderPiece
   */
  function Piece(color, renderPiece, type) {
    _classCallCheck(this, Piece);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "renderPiece", void 0);

    _defineProperty(this, "moved", void 0);

    this.color = color;
    this.renderPiece = renderPiece;
    this.type = type;
    this.moved = false;
  }
  /**
   * @function getCellFromCoords = función para que nos retorne con seguridad una celda existente
   * @param {Array<Integer>} position 
   * @param {Array<Integer>} boardMatrix 
   * @returns {Cell} cell = retorna la celda con las coordenadas enviadas por parámetro
   */


  _createClass(Piece, [{
    key: "getCellFromCoords",
    value: function getCellFromCoords(position, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];

      var rank = boardMatrix[i] || [];
      var cell = rank[j];
      return cell;
    }
    /**
     * @function checkDirection = se encarga de comprobar las casillas disponibles en la dirección que se mueve la pieza
     * @param {Array<Integer, Integer>} position array with con las coordenadas i, j del tablero
     * @param {Array<Integer, Integer>} direction array con la dirección (iDir, jDir) hacia la que se mueve la ficha
     * @param {Array<Integer, Integer>} boardMatrix tablero del juego
     */

  }, {
    key: "checkDirection",
    value: function checkDirection(position, direction, boardMatrix) {
      var _position2 = _slicedToArray(position, 2),
          i = _position2[0],
          j = _position2[1];

      var _direction = _slicedToArray(direction, 2),
          iDir = _direction[0],
          jDir = _direction[1];

      for (var k = 1; i <= boardMatrix.length; k++) {
        /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
        var cell = this.getCellFromCoords([i + k * iDir, j + k * jDir], boardMatrix);
        if (!cell) break;
        if (cell.piece && cell.piece.color == this.color) break;
        cell.setAvailableMovement(true);
        if (cell.piece) break;
      }
    }
    /**
     * @function abstract availableMovements = Retorna los movimientos disponibles para esa pieza
     */

  }, {
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {}
  }]);

  return Piece;
}();

exports.Piece = Piece;
},{"../types/PieceTypes.js":"types/PieceTypes.js","../types/Color.js":"types/Color.js","./Cell.js":"classes/Cell.js"}],"classes/pieces/Pawn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pawn = void 0;

var _Piece2 = require("../Piece.js");

var _Cell = require("../Cell.js");

var _Theme = require("../../types/Theme.js");

var _PieceTypes = require("../../types/PieceTypes.js");

var _Color = require("../../types/Color.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Pawn = /*#__PURE__*/function (_Piece) {
  _inherits(Pawn, _Piece);

  var _super = _createSuper(Pawn);

  /**
   * @class Pawn @counstructor
   * @param {String} color
   */
  function Pawn(color) {
    _classCallCheck(this, Pawn);

    return _super.call(this, color, ['♟', '♙'], _PieceTypes.PieceTypes.PIECES.pawn);
  }
  /**
   * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Pawn
   * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Pawn
   * @param {Array<Integer>} boardMatrix = Tablero del juego
   */


  _createClass(Pawn, [{
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      /* Coordenadas de la posición donde se encuentra la pieza */
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];
      /* Array con las diferentes celdas disponibles */


      var cellsPossiblesMoves = [];
      /* Conseguimos la posicion de las celdas disponibles en la que puede mover la pieza seleccionada */

      var cellPossibleMove = boardMatrix[i][this.color == _Color.Color.THEME.dark ? j + 1 : j - 1];
      cellsPossiblesMoves.push(cellPossibleMove);
      /* Conseguimos la posicion de las celdas disponibles en caso de que se pueda capturar con el peon en diagonal izquierda */

      if (i != 0 && this.color == _Color.Color.THEME.light) {
        var cellPossibleMoveTakeLeft = boardMatrix[i - 1][j - 1];
        /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */

        if (cellPossibleMoveTakeLeft.piece && cellPossibleMoveTakeLeft.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeLeft);
      } else if (i != 7 && this.color == _Color.Color.THEME.dark) {
        var cellPossibleMoveTakeLeft = boardMatrix[i + 1][j + 1];
        /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */

        if (cellPossibleMoveTakeLeft.piece && cellPossibleMoveTakeLeft.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeLeft);
      }
      /* Conseguimos la posicion de las celdas disponibles en caso de que se pueda capturar con el peon en diagonal derecha */


      if (i != 7 && this.color == _Color.Color.THEME.light) {
        var cellPossibleMoveTakeRight = boardMatrix[i + 1][j - 1];
        /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */

        if (cellPossibleMoveTakeRight.piece && cellPossibleMoveTakeRight.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeRight);
      } else if (i != 0 && this.color == _Color.Color.THEME.dark) {
        var cellPossibleMoveTakeRight = boardMatrix[i - 1][j + 1];
        /* Comprobamos que la pieza que podemos capturar no sea del mismo color que la seleccionada */

        if (cellPossibleMoveTakeRight.piece && cellPossibleMoveTakeRight.piece.color != this.color) cellsPossiblesMoves.push(cellPossibleMoveTakeRight);
      }
      /* Miramos que en caso de que el peon se encuentre en la pirmera fila y no sea del color contrario del inicio puede mover dos posiciones*/


      if (j == 1 && this.color != _Color.Color.THEME.light || j == 6 && this.color != _Color.Color.THEME.dark) {
        /* Comprobamos que no haya una pieza delante */
        if (!cellPossibleMove.piece) {
          var cellPossibleMoveStart = boardMatrix[i][this.color == _Color.Color.THEME.dark ? j + 2 : j - 2];
          cellsPossiblesMoves.push(cellPossibleMoveStart);
        }
      }
      /* Comprobamos si no hay una pieza en la casilla donde se puede mover la pieza seleccionada */


      for (var _i2 = 0; _i2 < cellsPossiblesMoves.length; _i2++) {
        if (!cellsPossiblesMoves[_i2].piece && cellsPossiblesMoves[_i2] != cellPossibleMoveTakeLeft && cellsPossiblesMoves[_i2] != cellPossibleMoveTakeRight) cellsPossiblesMoves[_i2].setAvailableMovement(true);
        /* Ponemos la celda en true en caso de que haya pieza que se pueda capturar en la diagonal izquierda */

        if (cellsPossiblesMoves[_i2] == cellPossibleMoveTakeLeft) {
          if (cellsPossiblesMoves[_i2].piece) cellsPossiblesMoves[_i2].setAvailableMovement(true);
        }
        /* Ponemos la celda en true en caso de que haya pieza que se pueda capturar en la diagonal derecha */


        if (cellsPossiblesMoves[_i2] == cellPossibleMoveTakeRight) {
          if (cellsPossiblesMoves[_i2].piece) cellsPossiblesMoves[_i2].setAvailableMovement(true);
        }
      }
    }
  }]);

  return Pawn;
}(_Piece2.Piece);

exports.Pawn = Pawn;
},{"../Piece.js":"classes/Piece.js","../Cell.js":"classes/Cell.js","../../types/Theme.js":"types/Theme.js","../../types/PieceTypes.js":"types/PieceTypes.js","../../types/Color.js":"types/Color.js"}],"classes/pieces/Rook.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rook = void 0;

var _Piece2 = require("../Piece.js");

var _PieceTypes = require("../../types/PieceTypes.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Rook = /*#__PURE__*/function (_Piece) {
  _inherits(Rook, _Piece);

  var _super = _createSuper(Rook);

  /**
   * @class Rook @counstructor
   * @param {String} color
   */
  function Rook(color) {
    _classCallCheck(this, Rook);

    return _super.call(this, color, ['♜', '♖'], _PieceTypes.PieceTypes.PIECES.rook);
  }
  /**
   * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Rook
   * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Rook
   * @param {Array<Integer>} boardMatrix = Tablero del juego
   */


  _createClass(Rook, [{
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      /* Vertical haci arriba */
      this.checkDirection(position, [0, -1], boardMatrix);
      /* Vertical hacia abajo */

      this.checkDirection(position, [1, 0], boardMatrix);
      /* Horizontal a la derecha */

      this.checkDirection(position, [0, 1], boardMatrix);
      /* Horizontal a la izquierda */

      this.checkDirection(position, [-1, 0], boardMatrix);
    }
    /**
     * @function isCheck = nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero
     */

  }, {
    key: "isCheck",
    value: function isCheck(position, boardMatrix) {
      /* Vertical haci arriba */
      this.checkKingDirection(position, [0, -1], boardMatrix);
      /* Vertical hacia abajo */

      this.checkKingDirection(position, [1, 0], boardMatrix);
      /* Horizontal a la derecha */

      this.checkKingDirection(position, [0, 1], boardMatrix);
      /* Horizontal a la izquierda */

      this.checkKingDirection(position, [-1, 0], boardMatrix);
    }
    /**
     * 
     * @param {Array<integer, integer>} direction = dirección hacia la que puede desplazarse la pieza
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero 
     * @returns nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
    */

  }, {
    key: "checkKingDirection",
    value: function checkKingDirection(position, direction, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];

      var _direction = _slicedToArray(direction, 2),
          iDir = _direction[0],
          jDir = _direction[1];

      for (var k = 1; i <= boardMatrix.length; k++) {
        /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
        var cell = this.getCellFromCoords([i + k * iDir, j + k * jDir], boardMatrix);
        if (!cell) return;

        if (cell.piece) {
          /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
          if (cell.piece.color == this.color) break;
          /* Si la pieza que hemos encontrado no es el rey, salimos del bucle */

          if (cell.piece.type != _PieceTypes.PieceTypes.PIECES.king) break;
          /* Si es el rey, cambiamos is Check a true */

          alert("CHECK");
          cell.piece.isCheck = true;
          break;
        }
      }
    }
  }]);

  return Rook;
}(_Piece2.Piece);

exports.Rook = Rook;
},{"../Piece.js":"classes/Piece.js","../../types/PieceTypes.js":"types/PieceTypes.js"}],"classes/pieces/Knight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Knight = void 0;

var _Piece2 = require("../Piece.js");

var _PieceTypes = require("../../types/PieceTypes.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @class Knight @constructor
 * @param {String} color
 */
var Knight = /*#__PURE__*/function (_Piece) {
  _inherits(Knight, _Piece);

  var _super = _createSuper(Knight);

  function Knight(color) {
    _classCallCheck(this, Knight);

    return _super.call(this, color, ['♞', '♘'], _PieceTypes.PieceTypes.PIECES.knight);
  }

  _createClass(Knight, [{
    key: "isCheck",
    value: function isCheck(position, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];
      /* Posibles movimientos del caballo */


      var possibleMoves = [[i - 1, j - 2], [i + 1, j - 2], [i + 2, j - 1], [i + 2, j + 1], [i - 2, j + 1], [i + 1, j + 2], [i - 1, j + 2], [i - 2, j - 1]];
      /* Recorremos el array para encontrar al rey en una de las casillas amenzadas por el caballo */

      for (var _i2 = 0; _i2 < possibleMoves.length; _i2++) {
        var cell = this.getCellFromCoords(possibleMoves[_i2], boardMatrix);
        console.log(cell);

        if (cell) {
          if (cell.piece) {
            /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
            if (cell.piece.color != this.color) {
              /* Si una de las casillas amenazadas por el caballo se encuentra el rey, cambiamos isCheck a true */
              if (cell.piece.type == _PieceTypes.PieceTypes.PIECES.king) {
                alert("CHECK");
                cell.piece.isCheck = true;
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      var _position2 = _slicedToArray(position, 2),
          i = _position2[0],
          j = _position2[1];
      /* Posibles movimientos del caballo */


      var possibleMoves = [[i - 1, j - 2], [i + 1, j - 2], [i + 2, j - 1], [i + 2, j + 1], [i - 2, j + 1], [i + 1, j + 2], [i - 1, j + 2], [i - 2, j - 1]];
      /* Recorremos el array para ver cuales son las casillas disponibles para el caballo */

      for (var _i3 = 0; _i3 < possibleMoves.length; _i3++) {
        var cell = this.getCellFromCoords(possibleMoves[_i3], boardMatrix);
        if (cell && !(cell.piece && cell.piece.color == this.color)) cell.setAvailableMovement(true);
      }
    }
  }]);

  return Knight;
}(_Piece2.Piece);

exports.Knight = Knight;
},{"../Piece.js":"classes/Piece.js","../../types/PieceTypes.js":"types/PieceTypes.js"}],"classes/pieces/Bishop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bishop = void 0;

var _Piece2 = require("../Piece.js");

var _PieceTypes = require("../../types/PieceTypes.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Bishop = /*#__PURE__*/function (_Piece) {
  _inherits(Bishop, _Piece);

  var _super = _createSuper(Bishop);

  /**
   * @class Bishop @counstructor
   * @param {String} color
  */
  function Bishop(color) {
    _classCallCheck(this, Bishop);

    return _super.call(this, color, ['♝', '♗'], _PieceTypes.PieceTypes.PIECES.bishop);
  }
  /**
   * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Bishop
   * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Bishop
   * @param {Array<Integer>} boardMatrix = Tablero del juego
   */


  _createClass(Bishop, [{
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      /* Diagonal abajo a la derecha */
      this.checkDirection(position, [1, 1], boardMatrix);
      /* Diagonal abajo a la izquierda */

      this.checkDirection(position, [-1, 1], boardMatrix);
      /* Diagonal arriba a la derecha */

      this.checkDirection(position, [1, -1], boardMatrix);
      /* Diagonal arriba a la izquierda */

      this.checkDirection(position, [-1, -1], boardMatrix);
    }
    /**
     * @function isCheck = nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero
     */

  }, {
    key: "isCheck",
    value: function isCheck(position, boardMatrix) {
      /* Diagonal abajo a la derecha */
      this.checkKingDirection(position, [1, 1], boardMatrix);
      /* Diagonal abajo a la izquierda */

      this.checkKingDirection(position, [-1, 1], boardMatrix);
      /* Diagonal arriba a la derecha */

      this.checkKingDirection(position, [1, -1], boardMatrix);
      /* Diagonal arriba a la izquierda */

      this.checkKingDirection(position, [-1, -1], boardMatrix);
    }
    /**
     * 
     * @param {Array<integer, integer>} direction = dirección hacia la que puede desplazarse la pieza
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero 
     * @returns nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
    */

  }, {
    key: "checkKingDirection",
    value: function checkKingDirection(position, direction, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];

      var _direction = _slicedToArray(direction, 2),
          iDir = _direction[0],
          jDir = _direction[1];

      for (var k = 1; i <= boardMatrix.length; k++) {
        /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
        var cell = this.getCellFromCoords([i + k * iDir, j + k * jDir], boardMatrix);
        if (!cell) return;

        if (cell.piece) {
          /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
          if (cell.piece.color == this.color) break;
          /* Si la pieza que hemos encontrado no es el rey, salimos del bucle */

          if (cell.piece.type != _PieceTypes.PieceTypes.PIECES.king) break;
          /* Si es el rey, cambiamos is Check a true */

          alert("CHECK");
          cell.piece.isCheck = true;
          break;
        }
      }
    }
  }]);

  return Bishop;
}(_Piece2.Piece);

exports.Bishop = Bishop;
},{"../Piece.js":"classes/Piece.js","../../types/PieceTypes.js":"types/PieceTypes.js"}],"classes/pieces/Queen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queen = void 0;

var _Piece2 = require("../Piece.js");

var _PieceTypes = require("../../types/PieceTypes.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Queen = /*#__PURE__*/function (_Piece) {
  _inherits(Queen, _Piece);

  var _super = _createSuper(Queen);

  /**
   * @class Queen @counstructor
   * @param {String} color
   */
  function Queen(color) {
    _classCallCheck(this, Queen);

    return _super.call(this, color, ['♛', '♕'], _PieceTypes.PieceTypes.PIECES.queen);
  }
  /**
   * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza Queen
   * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza Queen
   * @param {Array<Integer>} boardMatrix = Tablero del juego
   */


  _createClass(Queen, [{
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      /* Diagonal abajo a la derecha */
      this.checkDirection(position, [1, 1], boardMatrix);
      /* Diagonal abajo a la izquierda */

      this.checkDirection(position, [-1, 1], boardMatrix);
      /* Diagonal arriba a la derecha */

      this.checkDirection(position, [1, -1], boardMatrix);
      /* Diagonal arriba a la izquierda */

      this.checkDirection(position, [-1, -1], boardMatrix);
      /* Vertical hacia arriba */

      this.checkDirection(position, [0, -1], boardMatrix);
      /* Vertical hacia abajo */

      this.checkDirection(position, [1, 0], boardMatrix);
      /* Horizontal a la derecha */

      this.checkDirection(position, [0, 1], boardMatrix);
      /* Horizontal a la izquierda */

      this.checkDirection(position, [-1, 0], boardMatrix);
    }
    /**
     * @function isCheck = nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero
     */

  }, {
    key: "isCheck",
    value: function isCheck(position, boardMatrix) {
      /* Diagonal abajo a la derecha */
      this.checkKingDirection(position, [1, 1], boardMatrix);
      /* Diagonal abajo a la izquierda */

      this.checkKingDirection(position, [-1, 1], boardMatrix);
      /* Diagonal arriba a la derecha */

      this.checkKingDirection(position, [1, -1], boardMatrix);
      /* Diagonal arriba a la izquierda */

      this.checkKingDirection(position, [-1, -1], boardMatrix);
      /* Vertical hacia arriba */

      this.checkKingDirection(position, [0, -1], boardMatrix);
      /* Vertical hacia abajo */

      this.checkKingDirection(position, [1, 0], boardMatrix);
      /* Horizontal a la derecha */

      this.checkKingDirection(position, [0, 1], boardMatrix);
      /* Horizontal a la izquierda */

      this.checkKingDirection(position, [-1, 0], boardMatrix);
    }
    /**
     * 
     * @param {Array<integer, integer>} direction = dirección hacia la que puede desplazarse la pieza
     * @param {Array<integer, integer>} position = posición del tablero donde se encuentra la casilla seleccionada
     * @param {Array<integer, integer>} boardMatrix = tablero 
     * @returns nos indica si el rey está siendo amenazado dependiendo de la casilla donde coloquemos la pieza seleccionada
     */

  }, {
    key: "checkKingDirection",
    value: function checkKingDirection(position, direction, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];

      var _direction = _slicedToArray(direction, 2),
          iDir = _direction[0],
          jDir = _direction[1];

      for (var k = 1; i <= boardMatrix.length; k++) {
        /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
        var cell = this.getCellFromCoords([i + k * iDir, j + k * jDir], boardMatrix);
        if (!cell) return;

        if (cell.piece) {
          /* Comprobamos que en caso de que la celda tenga una pieza si es del mismo color que la pieza seleccionada salga del bucle */
          if (cell.piece.color == this.color) break;
          /* Si la pieza que hemos encontrado no es el rey, salimos del bucle */

          if (cell.piece.type != _PieceTypes.PieceTypes.PIECES.king) break;
          /* Si es el rey, cambiamos is Check a true */

          alert("CHECK");
          cell.piece.isCheck = true;
          break;
        }
      }
    }
  }]);

  return Queen;
}(_Piece2.Piece);

exports.Queen = Queen;
},{"../Piece.js":"classes/Piece.js","../../types/PieceTypes.js":"types/PieceTypes.js"}],"classes/pieces/King.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.King = void 0;

var _Piece2 = require("../Piece.js");

var _PieceTypes = require("../../types/PieceTypes.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var King = /*#__PURE__*/function (_Piece) {
  _inherits(King, _Piece);

  var _super = _createSuper(King);

  /**
   * @type {boolean} isCheck = nos indica si el rey se encuentra en jaque
   */

  /**
   * @type {Array<integer, integer>} directions = indica las direcciones posibles a las que se puede mover el rey
   */

  /**
   * @class King @counstructor
   * @param {String} color
   */
  function King(color) {
    var _this;

    _classCallCheck(this, King);

    _this = _super.call(this, color, ['♚', '♔'], _PieceTypes.PieceTypes.PIECES.king);

    _defineProperty(_assertThisInitialized(_this), "isCheck", void 0);

    _defineProperty(_assertThisInitialized(_this), "directions", [[1, 1], [-1, 1], [1, -1], [-1, -1], [0, -1], [1, 0], [0, 1], [-1, 0]]);

    _this.isCheck = false;
    return _this;
  }
  /**
   * @function availableMovements = Retorna los posibles movimientos que puede realizar la pieza King
   * @param {Array<Integer>} position = Coordenadas de la celda donde se encuentra la pieza King
   * @param {Array<Integer>} boardMatrix = Tablero del juego
   */


  _createClass(King, [{
    key: "availableMovements",
    value: function availableMovements(position, boardMatrix) {
      var _position = _slicedToArray(position, 2),
          i = _position[0],
          j = _position[1];
      /* Recorremos el array de posibles movimientos */


      for (var k = 0; k < this.directions.length; k++) {
        var iDir = this.directions[k][0];
        var jDir = this.directions[k][1];
        /* Cogemos la celda de las diferentes direcciones que tiene el rey */

        var cell = this.getCellFromCoords([i + 1 * iDir, j + 1 * jDir], boardMatrix);
        /* En caso de que haya celda y que la celda no contenga una pieza de nuestro color, indicamos que la celda es una celda válida */

        if (cell && !(cell.piece && cell.piece.color == this.color)) {
          if (!this.isThreatCell([i + 1 * iDir, j + 1 * jDir], boardMatrix)) cell.setAvailableMovement(true);
        }
      }

      if (this.moved) return;
      /* Enroque blanco */

      /* Celda de enroque corto */

      var cellCastleKingShort = this.getCellFromCoords([i + 2, j], boardMatrix);
      /* Celda de torre enroque corto */

      var cellCastleShortRook = this.getCellFromCoords([i + 3, j], boardMatrix);
      /* En caso de que la celda donde debe encontrarse se haya movido no entramos en la condición */

      if (cellCastleShortRook.piece && !cellCastleShortRook.moved) {
        if (cellCastleKingShort && !(cellCastleKingShort.piece && cellCastleKingShort.piece.color == this.color)) cellCastleKingShort.setAvailableMovement(true);
      }
      /* Enroque largo */

      /* Celda de enroque largo */


      var cellCastleKingLong = this.getCellFromCoords([i - 2, j], boardMatrix);
      /* Celda de torre enroque largo */

      var cellCastleLongRook = this.getCellFromCoords([i - 4, j], boardMatrix);
      /* En caso de que la celda donde debe encontrarse se haya movido no entramos en la condición */

      if (cellCastleLongRook.piece && !cellCastleLongRook.moved) {
        if (cellCastleKingLong && !(cellCastleKingLong.piece && cellCastleKingLong.piece.color == this.color)) cellCastleKingLong.setAvailableMovement(true);
      }
    }
    /**
     * @function isThreatCell = indica si la casilla a la que se puede desplazar el rey se encuentra amenazada
     * @param {Array<integer, integer>} position = posición de la celda a la que se puede desplazar el rey
     * @param {Array<integer, integer>} boardMatrix = tablero
     */

  }, {
    key: "isThreatCell",
    value: function isThreatCell(position, boardMatrix) {
      var _position2 = _slicedToArray(position, 2),
          i = _position2[0],
          j = _position2[1];

      for (var l = 0; l < this.directions.length; l++) {
        /* Definimos la dirección hacia la que tenemos que mirar si alguna pieza amenaza la casilla */
        var iDir = this.directions[l][0];
        var jDir = this.directions[l][1];

        for (var k = 1; k < boardMatrix.length; k++) {
          /* De esta manera podemos definir la direccion al multiplicarla por el parametro de la direccion */
          var cell = this.getCellFromCoords([i + k * iDir, j + k * jDir], boardMatrix);
          /* Si no es una celda salimos del bucle */

          if (!cell) break;
          /* Si hay una pieza en la celda del mismo color que el rey actual salimos del bucle */

          if (cell.piece && cell.piece.color == this.color) break;
          /* Cuando l valga de 0 a 3 comprobará las diagonales */

          if (l == 0 || l == 1 || l == 2 || l == 3) {
            /* En caso de que la pieza que encontremos sea un alfil o una reina, esa casilla estará amenazada */
            if (cell.piece) {
              /* Si hay una reina o un alfil en la diagonal la celda está amenazada */
              if (cell.piece.type == _PieceTypes.PieceTypes.PIECES.queen || cell.piece.type == _PieceTypes.PieceTypes.PIECES.bishop) {
                return true;
              } else {
                break;
              }
            }
            /* Cuando l valga de 4 a 7 comprobará las lineas verticales y horizontales */

          } else if (l == 4 || l == 5 || l == 6 || l == 7) {
            /* En caso de que la pieza que encontremos sea una torre o una reina, esa casilla estará amenazada */
            if (cell.piece) {
              /* Si hay una torre o un alfil en la diagonal la celda está amenazada */
              if (cell.piece.type == _PieceTypes.PieceTypes.PIECES.queen || cell.piece.type == _PieceTypes.PieceTypes.PIECES.rook) {
                return true;
              } else {
                break;
              }
            }
          }
        }
      }

      return false;
    }
  }]);

  return King;
}(_Piece2.Piece);

exports.King = King;
},{"../Piece.js":"classes/Piece.js","../../types/PieceTypes.js":"types/PieceTypes.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _socket = require("./socket.js");

var _Board = require("./classes/Board.js");

var _Pawn = require("./classes/pieces/Pawn.js");

var _Rook = require("./classes/pieces/Rook.js");

var _Knight = require("./classes/pieces/Knight.js");

var _Bishop = require("./classes/pieces/Bishop.js");

var _Queen = require("./classes/pieces/Queen.js");

var _King = require("./classes/pieces/King.js");

var _Color = require("./types/Color.js");

/*** VARIABLES CONSTANTES ***/

/**
* @type {integer} WIDTH_CANVAS = Anchura del canvas
* @type {integer} HEIGHT_CANVAS = Altura del canvas
*/
var WIDTH_CANVAS = 800;
var HEIGHT_CANVAS = 700;
/**
* @type {integer} FILES = Filas del TABLERO
* @type {integer} RANKS = Columnas del TABLERO
*/

var FILES = 8;
var RANKS = 8;
/*** --VARIABLES CONSTANTES-- ***/

/*** THEMES ***/

/**
* @type {Object} theme = Themes para nuestro tablero
* @type {{light: string, dark: string}}
*/

var theme = {
  light: '#eeeed2',
  dark: '#769656'
};
/**
* @type {Object} pieceTheme = Themes para piezas Ajedrez
* @type {{light: string, dark: string}}
*/

var pieceTheme = {
  light: '#FFFFFF',
  dark: '#000000'
};
/*** --THEMES-- ***/

/*** Inicializacion de la clase Board ***/

var board = new _Board.Board(WIDTH_CANVAS, HEIGHT_CANVAS, FILES, RANKS, theme, pieceTheme);
/*** --Inicializacion de la clase Board ***/

/*** FUNCIONES ***/

/**
* @function printPawns = Pinta los peones del tablero 
*/

function printPawns() {
  for (var i = 0; i < RANKS; i++) {
    board.initPlacePiece(i, 1, new _Pawn.Pawn(_Color.Color.THEME.dark));
    board.initPlacePiece(i, 6, new _Pawn.Pawn(_Color.Color.THEME.light));
  }
}
/**
* @function printPieces = Pinta las piezas del tablero 
*/


function printPieces() {
  for (var i = 0; i < 2; i++) {
    /* Si 'i' es mayor que 0 entonces pintamos las piezas de color Blanco */
    board.initPlacePiece(0, i * 7, new _Rook.Rook(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(7, i * 7, new _Rook.Rook(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(2, i * 7, new _Bishop.Bishop(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(5, i * 7, new _Bishop.Bishop(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(1, i * 7, new _Knight.Knight(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(6, i * 7, new _Knight.Knight(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(3, i * 7, new _Queen.Queen(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
    board.initPlacePiece(4, i * 7, new _King.King(i > 0 ? _Color.Color.THEME.light : _Color.Color.THEME.dark));
  }
}
/*** --FUNCIONES-- ***/

/* Pintamos las piezas */


printPawns();
printPieces();
/* Renderizamos el tablero */

board.renderBoard();
},{"./socket.js":"socket.js","./classes/Board.js":"classes/Board.js","./classes/pieces/Pawn.js":"classes/pieces/Pawn.js","./classes/pieces/Rook.js":"classes/pieces/Rook.js","./classes/pieces/Knight.js":"classes/pieces/Knight.js","./classes/pieces/Bishop.js":"classes/pieces/Bishop.js","./classes/pieces/Queen.js":"classes/pieces/Queen.js","./classes/pieces/King.js":"classes/pieces/King.js","./types/Color.js":"types/Color.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52367" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/app.e31bb0bc.js.map