/**
 * @namespace utils
 */
window.utils = (function () {
    "use strict";
    /**
     * @function datify
     * @memberof! utils
     * @param {number} milSecs
     * @returns {string}
     */
    const datify = function (milSecs) {
        let dt = new Date(milSecs);
        return dt.toLocaleString("en-US");
    };
    /**
     * @function monify
     * @memberof! utils
     * @param {number} sum
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
