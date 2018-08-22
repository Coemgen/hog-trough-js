/*global $, ORDERS_ARR, USER_ID, takeout*/
/**
 * @namespace main
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.main = (function () {
        /**
         * @function init
         * @memberof! takeout.main
         * @param {object} ordObj
         */
        const init = function () {
            takeout.orders.displayGroups();
            // event listener(s)
            $("form").on(
                "submit",
                function () {
                    event.preventDefault();
                    takeout.orders.fileUserOrder();
                    $("form").hide();
                    takeout.orders.displayGroups();
                }
            );
            $("form button[type=\"button\"").on(
                "click",
                function () {
                    $("form").hide();
                    $("h2 span").show();
                    takeout.orders.displayGroups();
                }
            );
            $("h2 span button").on(
                "click",
                function () {
                    takeout.orders.newGroupOrder();
                }
            );
            $("select").on(
                "change",
                function () {
                    $("#menu-link").attr(
                        "href", takeout.restaurants.getJson()[
                            $("option:selected").val()
                        ]
                    );
                }
            );
            // timers(s)
            // TODO: add trigger(s)
            // myVar = window.setTimeout(function, milliseconds);
            // clearTimeout(myVar);
            // myVar = window.setInterval(function, milliseconds);
            // clearTimeout(myVar);
        };
        return {
            init
        };
    }());
}());

$(takeout.main.init);
