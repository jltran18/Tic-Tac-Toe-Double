/**
 * Created by jessica.tran on 10/8/15.
 */

function TicTacToe(layout) {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.newGame = true;
    this.layout = layout;
    this.player = 'X';
    this.gameOver = false;
    this.winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
}

TicTacToe.prototype = {

    constructor: TicTacToe,

    startNewGame: function() {
        this.restartMode();
        this.cellClick();
        this.restartBtn();
    },

    restartMode: function() {
        var self = this;
        self.player = 'X';
        self.gameOver = false;

        self.text();
        self.clearBoard();
    },

    text: function() {
        var text;
        text = "Player " + this.player + "'s turn";
        $(this.layout+' .playerTurn').html(text);
    },

    switchPlayer: function() {
        if (this.player == 'X') {
            this.player = 'O';
        } else {
            this.player = 'X';
        }
    },

    checkAndSwitch: function() {
        var self = this;
        console.log(self.player);
        self.checkWin();
        if(self.gameOver) {return}
        self.switchPlayer();
        self.text();
    },

    checkWin: function() {
        var self = this;
        var matchGame = false;
        $.each(self.winCombos, function (index) {
            if (
                self.board[self.winCombos[index][0]] == self.board[self.winCombos[index][1]]
                &&
                self.board[self.winCombos[index][0]] == self.board[self.winCombos[index][2]]
                &&
                self.board[self.winCombos[index][0]] != " ") {

                $(self.layout + ' .winner').html('Player ' + self.player + ' is the winner!');
                matchGame= true;
                self.gameOver = true;

            } else if(self.checkTie() && !matchGame) {
                var text = "Tie game. Play again!";
                $(self.layout+' .winner').html(text);
                self.gameOver = true;
            }
        });
    },

    checkTie: function() {
        var self = this;
        var isTie = true;
        for(var i=0; i<self.board.length; i++){
            if(self.board[i] == " "){
                isTie = false;
            }
        }
        return isTie;
    },

    clearBoard: function() {
        if(this.newGame) {
            $('.sign').removeClass('xPlayer').removeClass('oPlayer');
            $('.winner').html("");
            this.newGame = false;
        }else {
            $(this.layout +' .sign').removeClass('xPlayer').removeClass('oPlayer');
            $(this.layout +' .winner').html("");
        }
    },

    cellClick: function() {
    var self = this;
    $(self.layout+' div.cell').on('click', function(cellNum) {

        cellNum = $(this).index() ;

        if(self.gameOver || self.board[cellNum] !== " ") {
            return
        }

        self.board[cellNum] = self.player;

        if (self.player == "X") {
            $(this).find($('.sign')).toggleClass('xPlayer').removeClass('oPlayer');
        } else if (self.player == "O") {
            $(this).find($('.sign')).toggleClass('oPlayer').removeClass('xPlayer');
        }

        self.checkAndSwitch();

    })},

    restartBtn: function() {
        var self = this;
        $(self.layout + ' .restart').on('click',function() {

            self.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            self.restartMode();
        })
    }
};
var table1 = new TicTacToe('#layout');
var table2 = new TicTacToe('#layout2');

$(document).ready(function() {
    table1.startNewGame();
    table2.startNewGame();
});