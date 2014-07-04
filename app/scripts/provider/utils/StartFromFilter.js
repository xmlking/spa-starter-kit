//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
export default function StartFromFilter() {
    'use strict';
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
}
