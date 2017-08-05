/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * GAME.JS - MAIN TRUNK
*/

jQuery(document).ready( function() {
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* APP INIT */

/**
 * Resolution and screen
 *
*/

// Resolution scale : on launch
app.Resolution.scale();

// Resolution scale : on resize
jQuery(window).resize( function() {
    app.Resolution.scale();
});

// Orientation : on launch
app.Resolution.orientation();

// Orientation : on orientation change
jQuery(window).resize( function() {
    app.Resolution.orientation();
});


/**
 * Sounds
 *
*/

// Preload
app.Sound.load();


/**
 * Playable Container position
 *
*/

// Position : on ready
app.Resolution.setPlayableContainerPosition();

// Position : on resize
jQuery(window).resize( function() {
    app.Resolution.setPlayableContainerPosition();
});

// Scroll handling
app.Resolution.scrollHandling();


/**
 * Hide loader and launch menu
 *
*/

// Hide loader : +4sec
setTimeout(
    function() {
        jQuery('#loading-alert').addClass('hidden');
    },
    3000
);

// Init menu : +4sec
setTimeout(
    function() {
        app.Menu.init();
    },
    4000
);

/* END - APP INIT */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* MENU SCREEN */

/**
 * Play
 *
*/
jQuery(document.body).on('tap', '#menu-screen .play', function() {
    
    // Kill menu
    app.Menu.kill();
    
    // Init Match
    app.Match.init();
    
});


/**
 * Sound ON/OFF
 *
*/
jQuery('#menu-screen .sound').click( function() {

    // Mute / unmute
    app.Sound.setMuteState();
    
    // Change text
    if( app.Sound.isMuted ) {
        jQuery('#menu-screen .sound').html('Sound : No');
    }
    else {
        jQuery('#menu-screen .sound').html('Sound : On');
    }
    
    // Play sound (safe)
    app.Sound.play('blip');
    
});


/**
 * Help
 *
*/
jQuery(document.body).on('tap', '#menu-screen .help', function() {
    
    // Kill menu
    app.Menu.kill();
    
    // Init Help
    app.Help.init();
    
});


/* END - MENU SCREEN */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* MATCH SCREEN */

/**
 * Timer update loop
 *
*/
setInterval(
    function() {
        app.Match.updateTimer();
    },
    100
);

/**
 * Tap on letter
 *
*/

// Desktop mode
if( window.orientation == undefined ) {

    // Cursor : Pointer
    jQuery('.key').css('cursor','pointer');
    jQuery('.switch').css('cursor','pointer');
    
    // On click
    jQuery('#match-screen .keyboard .key').click( function() {
        app.Match.letterTap(this);    
    });

}
// Mobile mode
else {

    // On tap
    jQuery(document.body).on('tap', '#match-screen .keyboard .key', function() {
        app.Match.letterTap(this);
    });
    
}

/**
 * Sound ON/OFF
 *
*/
jQuery('#match-screen .sound').click( function() {
    
    app.Sound.setMuteState();

    // Change class
    if( app.Sound.isMuted ) {
        jQuery('.switch.sound').addClass('disabled');
    }
    else {
        jQuery('.switch.sound').removeClass('disabled');
    }

});

/* END - MATCH SCREEN */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* GAME OVER SCREEN */

/**
 * Retry
 *
*/
jQuery(document.body).on('tap', '#gameover-screen .retry', function() {
    app.Gameover.kill();
    app.Match.init();
});


/**
 * Quit
 *
*/
jQuery(document.body).on('tap', '#gameover-screen .quit', function() {
    app.Gameover.kill();
    app.Menu.init();
});


/**
 * Sound ON/OFF
 *
*/
jQuery('#gameover-screen .sound').click( function() {
    
    app.Sound.setMuteState();

    // Change class
    if( app.Sound.isMuted ) {
        jQuery('.switch.sound').addClass('disabled');
    }
    else {
        jQuery('.switch.sound').removeClass('disabled');
    }

});

/* END - GAME OVER SCREEN */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* HELP SCREEN */

/**
 * Play
 *
*/
jQuery(document.body).on('tap', '#help-screen .play', function() {
    app.Help.kill();
    app.Match.init();
});


/**
 * Return
 *
*/
jQuery(document.body).on('tap', '#help-screen .quit', function() {
    app.Help.kill();
    app.Menu.init();
});

/* END - HELP SCREEN */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
});