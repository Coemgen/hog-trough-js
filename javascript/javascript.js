/**
 * Main
 * @param {object} $ jQuery reference
 */
const Main = (function ($) {
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
     */
    const display = function (ordObj) {
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
                    + utils.datify(ordObj[groupOrdKey].pickupTime)
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
                            + utils.monify(price) + "</td>"
                            + "<td class=\"money-cell\">"
                            + utils.monify(tax) + "</td>"
                            + "<td class=\"money-cell\">"
                            + utils.monify(total) + "</td>"
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
                                onclick="Orders.addUserOrder(
                                ${"'" + groupOrdKey + "'"});
                                return false;">
                                Enter/Edit Order
                            </a>
                        <td class="${_getTimeClass(orderByTime)}">
                            orders by:
                            ${utils.datify(orderByTime)}
                        </td>
                        <th class="money-cell" colspan="2">Grand total:</th>
                        <th class="money-cell">${utils.monify(grandTotal)}</th>
                    </tr>
                    `
                );
            }
        );
    };
    return {
        display
    };
}(jQuery));

/**
 * Orders
 */
const Orders = (function () {
    "use strict";
    const formHtml = $("form").html();
    /**
     * add to group order
     */
    const addUserOrder = function (groupOrdKey) {
        $("div.container").empty();
        $("div.container").html(
            "<h2>Hog Trough</h2>"
            + "<form class=\"form-horizontal\">"
            + formHtml
            + "</form>"
            + "<p>" + groupOrdKey + "</p>"
        );
        Object.keys(restaurant.getJson()).forEach(
            function (key) {
                $("select").append(
                    `<option value="${key}">${key}</option>`
                );
            }
        );
    };
    /**
     * edit user order
     */
    const editUserOrder = function () {
        return;
    };
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
     * new group order
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

$(
    function () {
        "use strict";
        let ordObj = Orders.get();
        Main.display(ordObj);
    }
);
