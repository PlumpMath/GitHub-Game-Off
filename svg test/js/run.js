/*
 * Vars
 */
var game, keys,
    player, und;

/*
 * Key presses
 */
document.body.addEventListener("keydown", function (e) {
    keys.press (e.keyCode);
});
document.body.addEventListener("keyup", function (e) {
    keys.release (e.keyCode);
});
document.getElementById ("gameStartButton").addEventListener ("click", function (e) {
    startGame (true);
});
document.getElementById ("toggleInstructions").addEventListener ("click", function (e) {
    document.body.classList.toggle ("instructionsOpen");
});
document.getElementById ("closeInstructions").addEventListener ("click", function (e) {
    document.body.classList.remove ("instructionsOpen");
});

document.getElementById ("sfxButton").addEventListener ("click", function (e) {
    game.sounds.toggle ();
});

/*
document.getElementById ("openInstructions").addEventListener ("click", function (e) {
    game.state.change ("instructions");
});
document.getElementById ("closeInstructions").addEventListener ("click", function (e) {
    game.state.change ("start");
});
document.getElementById ("start").addEventListener ("click", function (e) {
    startGame (false);
});
document.getElementById ("restart").addEventListener ("click", function (e) {
    startGame (true);
});
*/

var dbuttons = document.getElementsByClassName ("dbutton");
for (var i = 0; i < dbuttons.length; i++) {
    dbuttons [i].addEventListener("touchstart", function (e) {
        keys.press (e.target.dataset.keyValue);
    });
    dbuttons [i].addEventListener("touchend", function (e) {
        keys.release (e.target.dataset.keyValue);
    });
}

/*
 * INIT Phase
 */
(function () { // Create components
    var c = document.getElementById ("game");
    var turnSpeed = 500;
    game = new Game (c, turnSpeed);
    //game.loadSVG ("scene.svg");
    game.init ();
    keys = new Keyring ();
})();

function startGame (isRestart) { // INIT
    player = new Player ();
    
    if (isRestart) {
        game.restart ();
    } else {
        game.start ();
    }
    
    GameLoop ();
}

/*
 * UPDATE Loop
 */
function GameLoop () {
    window.requestAnimationFrame(GameLoop);
    
    var now = Date.now ();
    game.turn.update ();
    
    if (game.turn.newTurn) {
        game.update ();
        //console.log (game.turn.current + " :: " + now);
        if (keys.current.pressed) {
            // change player position
            player.move (keys.current);
        }
        
        /// Reset the turn variable
        game.turn.resetNewTurn ();
        
    }
    
    //console.log (keys.current);
};

/*
 * Probably wont use draw since we're using SVG
 */
/*
function Draw () {
    // clear canvas
    game.clearCanvas ();
    
    game.drawBit (player.position.x, player.position.y,
                  game.colors.player, "1");
    
    // enemies
    for (var i = 0; i < game.enemies.length; i++) {
        game.enemies [i].update ();
        
        // Check to see if it's offscreen - use player check
        if (game.enemies [i].position.x >= 0 &&
            game.enemies [i].position.x < game.board.width &&
            game.enemies [i].position.y >= 0 &&
            game.enemies [i].position.y < game.board.height) {
            
            game.drawBit (game.enemies [i].position.x, 
                game.enemies [i].position.y,
                game.colors.enemy, "1");
        } else {
            game.removeEnemy (i);
        }
    }
    
    // check for enemy impacts with player
    for (var i = 0; i < game.enemies.length; i++) {
        if (game.enemies [i].position.x === player.position.x &&
            game.enemies [i].position.y === player.position.y &&
            game.enemies [i].spawning === false) {
                player.changeHealth (-30);
        }
    }
    
    
    // spawn a new enemy - progressively more enemies
    if (game.enemies.length < (game.coinsCollected/2) ||
        game.enemies.length <= 0) {
        game.spawnEnemy ();
    }
}
*/
