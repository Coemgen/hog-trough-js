/**
 * @namespace restaurant
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.restaurant = (function () {
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
         * @memberof! takeout.restaurant
         * @returns {object}
         */
        const getJson = function () {
            return json;
        };
        return {
            getJson
        };
    }());
}());
