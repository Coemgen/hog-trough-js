/**
 * @namespace restaurant
 */
window.restaurant = (function () {
    "use strict";
    const json = (function () {
        return REST_ARR.reduce(
            function (json, restArr) {
                json[restArr[0]] = restArr[1];
                return json;
            }, {}
        );
    }());
    /**
     * @function getJson
     * @memberof! restaurant
     * @returns {object}
     */
    const getJson = function () {
        return json;
    };
    return {
        getJson
    };
}());
