/*global $, ORDERS_ARR, USER_ID, takeout*/
/**
 * @namespace orders
 * @memberof takeout
 */
(function () {
    "use strict";
    const tableHtml = $("table").html();
    /**
     */
    const _addTableHtml = function (num) {
        $("div").append(
            `
            <table id="table${num}" class="table table-bordered table-striped
            table-condensed"></table>
            `
        );
        $("table#table" + num).html(tableHtml);
    };
    /**
     * @function displayGroup
     * @memberof! takeout.orders
     * @param {object} ordObj
     */
    const displayGroups = function () {
        const ordObj = takeout.orders.get();
        const _getTimeClass = function (orderByTime) {
            return (Date.now() > orderByTime)
                ? "text-danger"
                : "text-success";
        };
        Object.keys(ordObj).forEach(
            function (groupOrdKey, index) {
                let num = index;
                let grandTotal = 0;
                let orderByTime = ordObj[groupOrdKey].orderByTime;
                _addTableHtml(num);
                $("table#table" + num + " caption").text(
                    ordObj[groupOrdKey].restaurant
                    + " pickup time: "
                    + takeout.utilities.datify(
                        ordObj[groupOrdKey].pickupTime
                    )
                );
                ordObj[groupOrdKey].orders.forEach(
                    function (curVal, index) {
                        let price = Number(curVal.price);
                        let tax = price * 0.07;
                        let total = price + tax;
                        $("table#table" + num + " tbody").append(
                            "<tr>"
                            + "<td class=\"text-center\">"
                            + (index + 1) + "</td>"
                            + "<td>" + curVal.userID + "</td>"
                            + "<td>" + curVal.order + "</td>"
                            + "<td class=\"money-cell\">"
                            + takeout.utilities.monify(price) + "</td>"
                            + "<td class=\"money-cell\">"
                            + takeout.utilities.monify(tax) + "</td>"
                            + "<td class=\"money-cell\">"
                            + takeout.utilities.monify(total) + "</td>"
                            + "</tr>"
                        );
                        grandTotal += total;
                    }
                );
                $("table#table" + num + " tfoot").html(
                    `
                    <tr>
                        <th class="text-center" colspan="2">
                            <a href="#" class="btn btn-info btn-xs"
                                role="button"
                                onclick="takeout.orders.addUserOrder(
                                ${"'" + groupOrdKey + "'"});
                                return false;">
                                Add Me
                            </a>
                        <td class="${_getTimeClass(orderByTime)}">
                            orders by:
                            ${takeout.utilities.datify(orderByTime)}
                        </td>
                        <th class="money-cell" colspan="2">Grand total:</th>
                        <th class="money-cell">
                        ${takeout.utilities.monify(grandTotal)}</th>
                    </tr>
                    `
                );
            }
        );
    };
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
            $("form select#restaurant").attr("disabled", true);
            $("form select#restaurant").append(
                `<option value="${restr}" selected>${restr}</option>`
            );
            $("#menu-link").attr(
                "href", takeout.restaurants.getJson()[restr]
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
            $("div#num-orders").show();
            $("div#order-by-time").show();
            $("pickup-time").show();
            $("select#restaurant").attr("disabled", false);
            Object.keys(takeout.restaurants.getJson()).forEach(
                function (key) {
                    $("select#restaurant").append(
                        `<option value="${key}">${key}</option>`
                    );
                }
            );
            return;
        };
        return {
            addUserOrder,
            displayGroups,
            editUserOrder,
            fileUserOrder,
            get,
            newGroupOrder
        };
    }());
}());
