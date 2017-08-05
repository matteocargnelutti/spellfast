/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * GENERAL/SOUND.JS - SOUND HANDLING
*/

app.Sound = {
    isMuted: false,
    sounds: []
};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* Sound methods */

/**
 * Mute / unmute
 *
*/
app.Sound.setMuteState = function() {
    app.Sound.isMuted = !app.Sound.isMuted;
}

/**
 * Load sounds
 *
*/
app.Sound.load = function() {

    app.Sound.sounds['blip'] = new Howl({
        urls: ['audio/blip.ogg','audio/blip.m4a'],
        autoplay: false,
        loop: false,
        volume: 1,
        onend: function() {
        }
    });
    
    app.Sound.sounds['doubletick'] = new Howl({
        urls: ['audio/doubletick.ogg','audio/doubletick.m4a'],
        autoplay: false,
        loop: false,
        volume: 1,
        onend: function() {
        }
    });
    
    app.Sound.sounds['gameover'] = new Howl({
        urls: ['audio/gameover.ogg','audio/gameover.m4a'],
        autoplay: false,
        loop: false,
        volume: 1,
        onend: function() {
        }
    });
    
    app.Sound.sounds['letter'] = new Howl({
        urls: ['audio/letter.ogg','audio/letter.m4a'],
        autoplay: false,
        loop: false,
        volume: 1,
        onend: function() {
        }
    });
    
}


/**
 * Play sound
 *
 * @param int index
*/
app.Sound.play = function( index ) {

    // Stop here if sound is muted
    if( app.Sound.isMuted == true ) {
        return;
    }
    
    // Play sound
    app.Sound.sounds[index].play();

}

/* END - Sound methos */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/