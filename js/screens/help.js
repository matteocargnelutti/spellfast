/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * SCREENS/HELP.JS - HELP SCREEN
*/

app.Help = {};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* METHODS */

/**
 * Init
 *
*/
app.Help.init = function() {

    //
    // Play sound
    //
    app.Sound.play('doubletick');

    // 
    // Show screen
    //
    jQuery('#help-screen').addClass('visible');

}

/**
 * Kill
 *
*/
app.Help.kill = function() {

    //
    // Remove screen
    //
    jQuery('#help-screen').removeClass('visible');

}

/* END - METHODS */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/