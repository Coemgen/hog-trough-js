/**
 * @namespace Orders
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.Orders = (function ($) {
        return {
            /**
             * Open Orders page.
             * @function display
             * @memberof! takeout.Orders
             * @param {object} jQuery The jQuery global.
             */
            new: function () {
                $("div#main").empty();
                $("#ordersview").attr("hidden", false);
            }
        };
    }(jQuery));
}());

