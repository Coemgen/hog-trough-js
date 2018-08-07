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
         * @returns {string}
         */
        const datify = function (milSecs) {
            let dt = new Date(milSecs);
            return dt.toLocaleString("en-US");
        };
        /**
         * @function monify
         * @memberof! takeout.utilities
         * @returns {string}
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
