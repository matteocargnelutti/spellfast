/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * GENERAL/BESTSCORE.JS - BREST SCORE METHODS
*/

app.Bestscore = {};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* Best score methods */

/**
 * Get
 *
*/
app.Bestscore.get = function() {

    if( window.localStorage ) {
    
        if( window.localStorage.getItem('spellfast_bestscore') ) {
            return window.localStorage.getItem('spellfast_bestscore');
        }
        else {
            return 0;
        }
        
    }
    else {
        return 0;
    }

}


/**
 * Store
 *
*/
app.Bestscore.store = function() {

    if( window.localStorage ) {
        window.localStorage.setItem('spellfast_bestscore', app.Match.score);
    }
    else {
        return app.Match.score;
    }

}


/**
 * Compare before storing, and then stores
 *
*/
app.Bestscore.handle = function() {

    var currentScore = app.Match.score;
    var lastBestScore = app.Bestscore.get();
    
    if( currentScore > lastBestScore ) {
        app.Bestscore.store();
    }

}

/**
 * Is it the best score ?
 *
*/
app.Bestscore.currentScoreIsNewBestScore = function() {

    var currentScore = app.Match.score;
    var lastBestScore = app.Bestscore.get();
    
    if( currentScore > lastBestScore ) {
        return true;
    }
    else {
        return false;
    }
    
}