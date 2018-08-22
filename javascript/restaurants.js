/*global $, ORDERS_ARR, REST_ARR, USER_ID, takeout*/
/**
 * @namespace restaurants
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.restaurants = (function () {
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
         * @memberof! takeout.restaurants
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
