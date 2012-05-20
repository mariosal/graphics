Array.prototype.copy = function () {
    var newArray = this.slice();
    this.forEach( function( value, i ) {
        if ( value instanceof Array ) {
            newArray[ i ] = value.copy();
        }
    } );
    return newArray;
};
