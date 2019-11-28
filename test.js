/**
 * The sequence:
 * row2 column2 yellow
 * row3 column3 green
 * row3 column1 blue
 * row1 column4 white
 * row4 column2 orange
 */

window.addEventListener( 'load', () => {

    /**
     * Chrome's autoplay policy
     * https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
     * Autoplay with sound is allowed if user has interacted with the domain (click, tap, etc.).
     */

    /**
     * Throttle the button so it can only be clicked once every 6 seconds
     * (over kill since I disable the button with the HTML5 attribute anyway)
     */
    const btn = document.querySelector( '#app-btn' )
    btn.addEventListener( 'click', throttle( () => {
        init()
    }, 6000 ))
})

const init = () => {
    
    // Add visual indication button is disabled during performance
    const btn = document.querySelector( '#app-btn' )
    btn.disabled = true

    // Delayed start time
    const t = 1000
    
    // For replays, just in case of overlaps (not necessary since setCell() unsets the background colour anyway.
    // I'm also throttling and disabling the button so overlaps shouldn't happen).
    clearCells()

    // Play the 5 notes
    // https://www.soundboard.com/sb/close_encounters_audio
    setTimeout( () => { sound( 'five-notes.mp3' ) }, t )

    // Set timed colour changes
    setTimeout( () => { setCell( 1, 1, 'yellow' ) }, t + 100 )
    setTimeout( () => { setCell( 2, 2, 'green' ) }, t + 500 )
    setTimeout( () => { setCell( 2, 0, 'blue' ) }, t + 1000 )
    setTimeout( () => { setCell( 0, 3, 'white' ) }, t + 1500 )
    setTimeout( () => {
        setCell( 3, 1, 'orange' )
        setTimeout( () => { btn.disabled = false }, t + 2400 )
    }, t + 2300 )
}

/**
 * Set a table cell's background colour that's been identified by row and column number
 * @param {Number} row row number of the cell (zero index)
 * @param {Number} col column number of the cell (zero index)
 * @param {String} colour the colour you wish to change the cell to.
 */
const setCell = ( row, col, colour ) => {

    const cell = document.querySelector( '#app-table' ).rows[ row ].cells[ col ]
    cell.style.backgroundColor = colour
    setTimeout( () => { cell.style.backgroundColor = 'unset' }, 1000 )
}

/**
 * How to add sound
 * https://www.w3schools.com/graphics/game_sound.asp
 */
const sound = ( src ) => {

    const sound = document.createElement( 'audio' )
    sound.src = src
    sound.setAttribute( 'preload', 'auto' )
    sound.setAttribute( 'controls', 'none' )
    sound.style.display = 'none'
    document.body.appendChild( sound )
    sound.play()
}

const clearCells = () => {
    
    const tds = document.querySelectorAll( '#app-table td' )

    for ( let td of tds ) {
        td.style.backgroundColor = 'unset'
    }
}

/**
 * https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
 */
const throttle = ( func, limit ) => {

    let inThrottle
    return function() {
        const args = arguments
        const context = this
        if ( !inThrottle ) {
            func.apply( context, args )
            inThrottle = true
            setTimeout( () => inThrottle = false, limit )
        }
    }
}