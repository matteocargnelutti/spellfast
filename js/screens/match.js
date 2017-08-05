/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * SCREENS/MATCH.JS - MATCH SCREEN
*/

app.Match = {
    gameIsOver: false,
    score: 0,
    timeoutTimestamp: 0,
    currentWord: '',
    lastWord: '',
    currentChar: 0,
    wrongChars: 0,
    
    dictionary: {}
};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* DICTIONARY */

app.Match.dictionary = [

    // Level 1 : 3 letterss
    [
        'EAT',
        'TEA',
        'YES',
        'LIP',
        'PIE',
        'ZOO',
        'DOG',
        'YOU',
        'WIN',
        'CAT',
        'DOG',
        'MAD',
        'RED',
        'ASK',
        'FAR',
        'LOW',
        'LIE',
        'ICE',
        'KEY',
        'OAK',
        'SAW',
        'DIG',
        'HIT',
        'PUG',
        'BUS',
        'EYE',
        'FUN',
        'SAY',
        'EGO',
        'TWO',
        'TOY',
        'GET',
        'SET',
        'MUG',
        'PET',
        'PEN',
        'WHY',
        'WHO',
        'WAR',
        'FLY'
    ],
    
    // Level 2 : 4 letters
    [
        'FIRE',
        'LOVE',
        'KICK',
        'WAVE',
        'PICK',
        'RICH',
        'EACH',
        'ECHO',
        'JOKE',
        'GAME',
        'DUCK',
        'JUMP',
        'SNOW',
        'POET',
        'DRUM',
        'GOOD',
        'VIEW',
        'SLOW',
        'FACT',
        'BEST',
        'LAKE',
        'RAIL',
        'WALL',
        'NICE',
        'FOOT',
        'RACE',
        'WIND',
        'FROG',
        'MAZE',
        'EVER',
        'ROSE',
        'OAKS',
        'AXIS',
        'MONK',
        'CUBE',
        'ROOT',
        'SURE',
        'DOJO',
        'JUDO',
        'NINE',
        'LOGO',
        'SHOW',
        'SLIP',
        'MATH',
        'CURL',
        'FREE',
        'BASS',
        'GEAR',
        'BOOK',
        'BIRD',
        'WHAT',
        'WHEN'
    ],
    
    // Level 3 : 5 letters
    [
        'HUMOR',
        'HUSKY',
        'TRAIN',
        'PHONE',
        'SPEAK',
        'SWEET',
        'SWEEP',
        'MOUSE',
        'POWER',
        'SHOES',
        'SMOKE',
        'CELLO',
        'VALUE',
        'CURRY',
        'TOUCH',
        'SHEET',
        'PAPER',
        'MONEY',
        'MARCH',
        'WITCH',
        'TOAST',
        'ARMOR',
        'CROSS',
        'NORTH',
        'OCTET',
        'SCARF',
        'FROST',
        'METAL',
        'HEAVY',
        'RADIO',
        'SHARK',
        'IBIZA',
        'VOCAL',
        'VOICE',
        'MOUTH',
        'SKILL',
        'TEMPO',
        'SWORD',
        'UNZIP',
        'WHERE',
        'PLANE',
        'PEACH',
        'APPLE',
        'JUICE',
        'WATER',
        'SUGAR'
    ]

];

/* END - DICTIONARY */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* METHODS */

/**
 * Init
 *
*/
app.Match.init = function() {

    //
    // Re-init default values
    //
    app.Match.gameIsOver = false;
    app.Match.score = 0;
    app.Match.timeoutTimestamp = 0;
    app.Match.currentWord = '';
    app.Match.lastWord = '';
    app.Match.currentChar = 0;
    app.Match.wrongChars = 0;

    //
    // Show screen
    //
    jQuery('#match-screen').addClass('visible');
    
    //
    // Play sound
    //
    app.Sound.play('doubletick');

    //
    // First Word
    //
    setTimeout(
        function() {
            app.Match.nextWord();
        },
        2000
    );

}


/**
 * Next Word
 *
*/
app.Match.nextWord = function() {

    //
    // Reset indexes
    //
    app.Match.currentChar = 0;
    app.Match.wrongChars = 0;
    
    //
    // Pick word, depending on the score
    //
    
    // A word can't be picked twice
    while( app.Match.currentWord == app.Match.lastWord ) {
    
        // 3 letters
        if( app.Match.score < 15 ) {
        
            app.Match.dictionary[0] = app.Tools.shuffleArray(app.Match.dictionary[0]);
            app.Match.currentWord = app.Match.dictionary[0][0];
        
        }
        
        // 4 letters
        if( app.Match.score >= 15  ) {
        
            app.Match.dictionary[1] = app.Tools.shuffleArray(app.Match.dictionary[1]);
            app.Match.currentWord = app.Match.dictionary[1][0];
        
        }
        
        // 5 letters
        if( app.Match.score > 55 ) {
        
            app.Match.dictionary[2] = app.Tools.shuffleArray(app.Match.dictionary[2]);
            app.Match.currentWord = app.Match.dictionary[2][0];   
            
        }
        
        
    }
    
    // Store word for history
    app.Match.lastWord = app.Match.currentWord;
    
    
    //
    // Set time to tap the word, depending on the score
    // This reset the timer
    //
    var timeToType = 10000;
    
    if( app.Match.score < 15 ) {
        timeToType = 10000;
    }
    
    if( app.Match.score >= 15 ) {
        timeToType = 8000;
    }
    
    if( app.Match.score >= 30 ) {
        timeToType = 6000;
    }
    
    if( app.Match.score >= 60 ) {
        timeToType = 4500;
    }
    
    if( app.Match.score >= 100 ) {
        timeToType = 3500;
    }
    
    if( app.Match.score >= 150 ) {
        timeToType = 2500;
    }
    
    // Timeout timestamp = current time + timeToType            
    var date = new Date();
    app.Match.timeoutTimestamp = date.getTime() + timeToType;
    
    
    //
    // Show word
    //
    jQuery('.word-to-guess .letter').addClass('hidden');
    jQuery('.word-to-guess .letter').addClass('inactive');
    
    // Insert letters and show used
    for( var i = 0; i < 5; i++ ) {
    
        if( app.Match.currentWord[i] != undefined && app.Match.currentWord[i] != null ) {
        
            jQuery('.word-to-guess #letter'+(i+1)+' i').html(
                app.Match.currentWord[i]
            );
            
            jQuery('.word-to-guess #letter'+(i+1)).removeClass(
                'hidden'
            );
        
        }
    
    }
    
    
    //
    // Show keyboard
    //
    
    // Clean keyboard
    jQuery('.keyboard .key').removeClass('good');
    jQuery('.keyboard .key').removeClass('bad');
    jQuery('.keyboard .key').removeClass('blocked');
    
    // Prepare an array of letters : it contains the good letters and wrong ones
    var keyboardLetters = app.Match.currentWord;

    // Random letters
    var randomLetters = app.Tools.shuffleArray(['A','Z','E','R','T','Y','U','I','O','P','Q','S','D','F','G','H','J','K','L','M','W','X','C','V','B','N']);
    var i = 0;
    
    while( keyboardLetters.length < 16 ) {
        
        keyboardLetters = keyboardLetters + randomLetters[i];
        i++;
        
    }
    
    // Shuffle the letters
    keyboardLetters = keyboardLetters.split("");
    keyboardLetters = app.Tools.shuffleArray(keyboardLetters);
    
    // Insert the letters into the keyboard
    for( var i = 1; i <= 16; i++ ) {
        jQuery('#key'+i).html(keyboardLetters[i-1]);
    }
    
    //
    // Play sound
    //
    app.Sound.play('letter');

}


/**
 * Tap on letter
 *
 * @param elem 
*/
app.Match.letterTap = function(elem) {

    //
    // Is this letter blocked ?
    //
    if( jQuery(elem).hasClass('blocked') ) {
        return;
    }
    
    //
    // Play sound
    //
    app.Sound.play('blip');
    
    // Block this letter (for 1 sec)
    jQuery(elem).addClass('blocked');
    
    setTimeout(
        function() {
            jQuery(elem).removeClass('blocked');
        },
        1000
    );
    
    // Catch id
    var keyId = jQuery(elem).attr('id');

    //
    // Is the game over ?
    //
    if( app.Match.gameIsOver ) {
        return;
    }
    
    //
    // Get the letter
    //
    var letterTapped = jQuery('#'+keyId).html();
    
    //
    // Is the letter correct ?
    //
    if( letterTapped == app.Match.currentWord[app.Match.currentChar] ) {
    
        // Mark as good
        jQuery('#'+keyId).addClass('good');
        
        // Highlight the letter
        jQuery('.word-to-guess #letter'+(app.Match.currentChar+1)).removeClass('inactive');
        
        // Add points to score
        app.Match.score += 1;
        
        // Show score
        jQuery('.hud .score b').html(app.Match.score);
        
        // Set the currentChar index further
        app.Match.currentChar += 1;
        
        //
        // If the word is completed
        //
        if( app.Match.currentChar >= app.Match.currentWord.length ) {
        
            setTimeout(
                function() {
                    app.Match.nextWord();
                },
                200
            );
            
        }
        
    }
    //
    // If the letter isn't correct
    //
    else {

        // Mark as bad
        jQuery('#'+keyId).addClass('bad');
        
        // Increment wrong chars index
        app.Match.wrongChars += 1;
        
    }
    
}


/**
 * Update timer
 *
*/
app.Match.updateTimer = function() {

    //
    // Only work when the game is not over
    //
    if( app.Match.gameIsOver ) {
        return;
    }
    
    //
    // Get the current timestamp
    //
    var date = new Date();
    var currentTimestamp = date.getTime();
    
    //
    // If there's time left
    //
    if( currentTimestamp < app.Match.timeoutTimestamp ) {
    
        //
        // Displaying the time left
        //
        var timeLeft = app.Match.timeoutTimestamp - currentTimestamp;
        
        if( timeLeft > 1000 ) {
            timeLeft = ''+timeLeft;
            timeLeft = timeLeft[0]+'.'+timeLeft[1];
        }
        else {
            timeLeft = ''+timeLeft;
            timeLeft = '0.'+timeLeft[0];
        }
        
        // HUD update
        jQuery('.hud .time b').html(timeLeft);

    
    }
    
    //
    // If there's no time left
    //
    else {
        
        // HUD update
        jQuery('.hud .time b').html('0.0');
        
        // Game over : if the word isn't completed
        if( app.Match.currentChar < app.Match.currentWord.length ) {
            app.Match.gameOver('timeout');
        }
        
    }

}


/**
 * Game Over
 *
 * @param string cause (timeout|mispell)
*/
app.Match.gameOver = function(cause) {
    
    //
    // Kill match
    //
    app.Match.kill();
    
    //
    // Call game over screen
    //
    app.Gameover.init();
    
}


/**
 * Kill
 *
*/
app.Match.kill = function() {

    //
    // Game is over
    //
    app.Match.gameIsOver = true;
    
    //
    // Re-init word and keyboard
    //
    
    // Word
    jQuery('.word-to-guess .letter').addClass('hidden');
    jQuery('.word-to-guess .letter').addClass('inactive');
    
    jQuery('.word-to-guess #letter1 i').html('?');
    jQuery('.word-to-guess #letter1').removeClass('hidden');
    
    jQuery('.word-to-guess #letter2 i').html('?');
    jQuery('.word-to-guess #letter2').removeClass('hidden');
        
    jQuery('.word-to-guess #letter3 i').html('?');
    jQuery('.word-to-guess #letter3').removeClass('hidden');
    
    // Insert the letters into the keyboard
    for( var i = 1; i <= 16; i++ ) {
        jQuery('#key'+i).html('?');
    }
    
    jQuery('.keyboard .key').removeClass('good');
    jQuery('.keyboard .key').removeClass('bad');
    jQuery('.keyboard .key').removeClass('blocked');

    //
    // Hide screen
    //
    jQuery('#match-screen').removeClass('visible');

}

/* END - METHODS */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/