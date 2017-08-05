/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * SCREENS/GAMEOVER.JS - GAMEOVER SCREEN
*/

app.Gameover = {};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* METHODS */

/**
 * Init
 *
*/
app.Gameover.init = function() {

    //
    // Store best score if needed
    //
    app.Bestscore.handle();
    
    //
    // Play sound
    //
    app.Sound.play('gameover');

    //
    // Inject infos
    //
    jQuery('#gameover-screen .score').html( app.Match.score );
    jQuery('#gameover-screen .bestscore').html( app.Bestscore.get() );
    
    // 
    // Show screen
    //
    jQuery('#gameover-screen').addClass('visible');

}

/**
 * Kill
 *
*/
app.Gameover.kill = function() {

    //
    // Remove screen
    //
    jQuery('#gameover-screen').removeClass('visible');

}

/* END - METHODS */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/