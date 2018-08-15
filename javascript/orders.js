/*globals $, ORDERS_ARR, REST_ARR, USER_ID, takeout*/
/**
 * @namespace orders
 * @memberof takeout
 */
(function () {
    "use strict";
    const ordersObj = ORDERS_ARR.reduce(
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
    takeout.orders = (function () {
        /**
         * @function get
         * @memberof! takeout.orders
         * @returns {object}
         */
        const get = function () {
            return ordersObj;
        };
        /**
         * @function addUserOrder
         * @memberof! takeout.orders
         * @param {string} groupOrdKey
         */
        const addUserOrder = function (groupOrdKey) {
            const restr = get()[groupOrdKey].restaurant;
            $("h2 span").hide();
            $("table").remove();
            $("form").show();
            // N.b., reset() is native JavaScript and
            // $("#form-order")[0] === document.getElementById("form-order")
            document.getElementById("form-order").reset();
            $("form input#ord-key").attr("value", groupOrdKey);
            $("form select").attr("disabled", true);
            $("form select").append(
                `<option value="${restr}" selected>${restr}</option>`
            );
            $("#menu-link").attr(
                "href", takeout.restaurant.getJson()[restr]
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
         * @function editUserOrder
         * @memberof! takeout.orders
         */
        const fileUserOrder = function () {
            const ordKey = $("form input#ord-key").val();
            const order = $("form input#order").val();
            const price = $("form input#price").val();
            ordersObj[ordKey].orders.push({
                userID: USER_ID,
                order: order,
                price: price
            });
            return;
        };
        /**
         * @function newGroupOrder
         * @memberof! takeout.orders
         */
        const newGroupOrder = function () {
            $("h2 span").hide();
            $("table").remove();
            $("form").show();
            document.getElementById("form-order").reset();
            Object.keys(takeout.restaurant.getJson()).forEach(
                function (key) {
                    $("select").append(
                        `<option value="${key}">${key}</option>`
                    );
                }
            );
            return;
        };
        return {
            addUserOrder,
            editUserOrder,
            fileUserOrder,
            get,
            newGroupOrder
        };
    }());
}());
