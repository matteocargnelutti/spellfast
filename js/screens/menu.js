/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * SCREENS/MENU.JS - MENU SCREEN
*/

app.Menu = {
    isFirstLaunch: false // First launch trigger
};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* METHODS */

/**
 * Init
 *
*/
app.Menu.init = function() {

    //
    // Play sound
    //
    if( !app.Menu.isFirstLaunch ) {
        app.Menu.isFirstLaunch = true;
    }
    else {
        app.Sound.play('doubletick');
    }

    //
    // Retrieve best score
    //
    jQuery('#menu-screen .bestscore span').html(
        app.Bestscore.get()
    );

    // 
    // Show screen
    //
    jQuery('#menu-screen').addClass('visible');

}

/**
 * Kill
 *
*/
app.Menu.kill = function() {

    //
    // Remove screen
    //
    jQuery('#menu-screen').removeClass('visible');

}

/* END - METHODS */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/