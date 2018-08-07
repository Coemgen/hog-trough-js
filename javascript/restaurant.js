/**
 * @namespace restaurant
<<<<<<< HEAD
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
=======
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
>>>>>>> 3f572d47c2b89046e20125a21e483ccfcf64ac60
}());
