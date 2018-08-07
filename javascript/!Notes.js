/**
 * @namespace Orders
 * @memberof HT
 */
(function () {
    "use strict";
    HT.Orders = (function ($) {
        return {
            /**
             * Open Orders page.
             * @function display
             * @memberof! HT.Orders
             * @param {object} jQuery The jQuery global.
             */
            new: function () {
                $("div#main").empty();
                $("#ordersview").attr("hidden", false);
            }
        };
    }(jQuery));
}());

