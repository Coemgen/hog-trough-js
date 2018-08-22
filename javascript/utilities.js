/*global $, ORDERS_ARR, REST_ARR, USER_ID, takeout*/
/**
 * @namespace utilities
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.utilities = (function () {
        /**
         * @function datify
         * @memberof! takeout.utilities
         * @param {number} milSecs Number of milliseconds to be converted to
         * date string
         * @returns {string} A human readable date and time string in U.S.
         * format
         */
        const datify = function (milSecs) {
            let dt = new Date(milSecs);
            return dt.toLocaleString("en-US");
        };
        /**
         * @function monify
         * @memberof! takeout.utilities
         * @param {number} sum Calculated money value
         * @returns {string} Money value formatted as U.S. dollar string
         */
        const monify = function (sum) {
            return sum.toLocaleString(
                "en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2
                }
            );
        };
        return {
            datify,
            monify
        };
    }());
}());
