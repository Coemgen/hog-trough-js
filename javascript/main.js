/**
 * @namespace main
 * @memberof takeout
 */
(function () {
    "use strict";
    takeout.main = (function ($) {
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
         * @function display
         * @memberof! takeout.main
         * @param {object} ordObj
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
                        + takeout.utilities.datify(ordObj[groupOrdKey].pickupTime)
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
                                Enter/Edit Order
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
        return {
            display
        };
    }(jQuery));
}());

$(function () {
    "use strict";
    let ordObj = takeout.orders.get();
    takeout.main.display(ordObj);
});
