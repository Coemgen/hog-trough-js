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
        /**
         * @function utcDate
         * @memberof! takeout.utilities
         * @returns {string} Current date and time in UTC format
         */
        const getUtcDate = function (sum) {
            let d = new Date();
            let yyyy = d.getFullYear();
            let mm = d.getMonth() + 1;
            let dd = d.getDate();
            let hh = d.getHours();
            let MM = d.getMinutes();
            return yyyy + "-"
                + mm.toString().padStart(2, "0") + "-"
                + dd.toString().padStart(2, "0")
                + "T"
                + hh.toString().padStart(2, "0") + ":"
                + MM.toString().padStart(2, "0") + ":"
                + "00";
        };
        return {
            datify,
            monify,
            getUtcDate
        };
    }());
}());
