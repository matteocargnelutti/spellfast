/**
 * Spell Fast
 *
 * 2015 - Matteo Cargnelutti (mail@elseif.eu)
 * See GITHUB.COM/MATTEOCARGNELUTTI
 *
 *
 * GENERAL/TOOLS.JS - APP TOOLS
*/

app.Tools = {};

/*____________________________________________________________________________*/



/*____________________________________________________________________________*/
/* Tools Methods */

/**
 * Shuffle an array
 * Source : https://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
*/
app.Tools.shuffleArray = function(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

/* END - Tools Methods */
/*____________________________________________________________________________*/



/*____________________________________________________________________________*/