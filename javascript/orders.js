/**
 * @namespace orders
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.orders = (function () {
        const formHtml = $("form").html();
        /**
         * @function addUserOrder
         * @memberof! takeout.orders
         * @param {string} groupOrdKey
         */
        const addUserOrder = function (groupOrdKey) {
            $("div.container").empty();
            $("div.container").html(
                "<h2>Hog Trough</h2>" +
                "<form class=\"form-horizontal\">" +
                formHtml +
                "</form>" +
                "<p>" + groupOrdKey + "</p>"
            );
            Object.keys(takeout.restaurant.getJson()).forEach(
                function (key) {
                    $("select").append(
                        `<option value="${key}">${key}</option>`
                    );
                }
            );
        };
        /**
         * @function editUserOrder
         * @memberof! takeout.orders
         */
        const editUserOrder = function () {
            return;
        };
        /**
         * @function get
         * @memberof! takeout.orders
         * @returns {object}
         */
        const get = function () {
            return ORDERS_ARR.reduce(
                /**
                 * restaurant (key 1)
                 * filed time (key 2)
                 * order by time in milliseconds
                 * pickup time in milliseconds
                 * userID
                 * order text
                 * price
                 */
                function (obj, curVal) {
                    let ordKey = curVal[0].replace(/\W/g, "") + curVal[1];
                    if (obj[ordKey] === undefined) {
                        obj[ordKey] = {};
                        obj[ordKey].restaurant = curVal[0];
                        obj[ordKey].orderByTime = curVal[2];
                        obj[ordKey].pickupTime = curVal[3];
                        obj[ordKey].orders = [];
                    }
                    obj[ordKey].orders.push({
                        "userID": curVal[4],
                        "order": curVal[5],
                        "price": curVal[6]
                    });
                    return obj;
                }, {}
            );
        };
        /**
         * @function newGroupOrder
         * @memberof! takeout.orders
         */
        const newGroupOrder = function () {
            return;
        };
        return {
            addUserOrder,
            editUserOrder,
            get,
            newGroupOrder
        };
    }());
}());
