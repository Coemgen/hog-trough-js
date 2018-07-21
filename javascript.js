/*jshint browser:true, jquery:true*/
/*globals HT, ordersArr*/

/**
 * @file Hog Trough
 * @version 0.0
 * @author Kevin Griffin <kevin.griffin@gmail.com>
 * @todo Write the documentation.
 * @todo Implement this function.
 */

/**
 * Hog Trough
 * <p>This is an anonymous closure which is the fundamental construct that makes
 * it all possible, and really is the single best feature of JavaScript. We’ll
 * simply create an anonymous function, and execute it immediately. All of the
 * code that runs inside the function lives in a closure, which provides
 * privacy and state throughout the lifetime of our application.
 * See [Module Pattern]{@link
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html}.</p>
 * @namespace HT
 */
(function () {
    "use strict";
    window.HT = {};
}());

/**
 * @namespace Utils
 * @memberof HT
 */
(function () {
    "use strict";
    HT.Utils = (function () {
        /**
         * Format decimal number into a USD money string.
         * @function get
         * @memberof! HT.Restaurant
         * @param {number} cashNum
         * @returns {object} Restaurants object.
         */
        let monify = function (cashNum) {
            return cashNum.toLocaleString(
                "en-US", {
                    "style": "currency",
                    "currency": "USD"
                });
        };
        return {
            monify
        };

    }());
}());

/**
 * @namespace Restaurant
 * @memberof HT
 */
(function () {
    "use strict";
    HT.Restaurant = (function () {
        let json = {
            "--TBD--": "http://www.google.com",
            "BERTUCCI'S": "http://www.bertuccis.com/",
            "PAPA GINOS": "https://www.papaginos.com/menu"
        };
        /**
         * Get Restaurants object.
         * @function get
         * @memberof! HT.Restaurant
         * @returns {object} Restaurants object.
         */
        let get = function () {
            return json;
        };
        return {
            get
        };
    }());
}());

/**
 * @namespace UtcDate
 * @memberof HT
 */
(function () {
    "use strict";
    HT.UtcDate = (function () {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();
        let hh = d.getHours();
        let MM = d.getMinutes();
        let utcDate = yyyy + "-" +
            mm.toString().padStart(2, "0") + "-" +
            dd.toString().padStart(2, "0") +
            "T" +
            hh.toString().padStart(2, "0") + ":" +
            MM.toString().padStart(2, "0") + ":" +
            "00";
        return {
            /**
             * Get current date in UTC format.
             * @function get
             * @memberof! HT.UtcDate
             * @returns {string} The current date in UTC format.
             */
            get: function () {
                return utcDate;
            }
        };
    }());
}());

/**
 * @namespace GroupOrder
 * @memberof HT
 */
(function () {
    "use strict";
    HT.GroupOrder = (function ($) {
        return {
            /**
             * Open new Group Order page.
             * @function new
             * @memberof! HT.GroupOrder
             * @param {object} jQuery The jQuery global.
             */
            new: function () {
                // $("div#main").attr("hidden", true);
                $("div#main").empty();
                $("#ordersview").attr("hidden", true);
                $("#newgrouporder").attr("hidden", false);
                // restaurant SELECT should be in restaurant module???
                Object.entries(HT.Restaurant.get()).forEach(
                    function (curVal) {
                        $("select#restaurant").append(
                            "<option value=\"" + curVal[0] + "\">" +
                            curVal[0] + "</option>"
                        );
                    }
                );
                $("input#orderByTime").val(HT.UtcDate.get());
                $("input#orderPickupTime").val(HT.UtcDate.get());
            }
        };
    }(jQuery));
}());

/**
 * @namespace OneOrder
 * @memberof HT
 */
(function () {
    "use strict";
    HT.OneOrder = (function ($) {
        return {
            /**
             * Open new Group Order page.
             * @function new
             * @memberof! HT.GroupOrder
             * @param {string} restaurant
             */
            new: function (restaurant) {
                $("div#main").empty();
                $("#ordersview").attr("hidden", true);
                $("#newgrouporder").attr("hidden", false);
                Object.entries(HT.Restaurant.get()).forEach(
                    function (curVal) {
                        $("select#restaurant").append(
                            "<option value=\"" + curVal[0] + "\"" +
                            (restaurant === curVal[0] ? " selected>" : ">") +
                            curVal[0] + "</option>"
                        );
                    }
                );
                $("select#restaurant").attr("disabled", true);
                $("select#restaurant option:selected")
                    .trigger("change");
                $("input#orderByTime").val(HT.UtcDate.get());
                $("input#orderPickupTime").val(HT.UtcDate.get());
            }
        };
    }(jQuery));
}());

/**
 * @namespace Orders
 * @memberof HT
 */
(function () {
    "use strict";
    let tableHtml = "";
    let curDate = HT.UtcDate.get();
    let getObj = function (ordersArr) {
        /*
        forEach order
            if pickup time is less than current plus a couple of hours
                if restaurant not indexed for this time
                    add restaurant
                        add order
                else add order to the proper restaurant
        {
            PAPA GINOS: {
                pickuptime:2018...,
                orderbytime:2018...,
                numoforders:20,
                orders: [{placer:"Griffin,Kevin",order:Pizza,price:12.00},...]
            },
            ....
        },
        */
        return ordersArr.reduce(
            function (obj, curVal) {
                /*
                 * curVal =
                 * 0 orderPickupDate
                 * 1 restaurant
                 * 2 orderByDate     // order coordinator only
                 * 3 numberOfOrders  // order coordinator only
                 * 4 userID
                 * 5 orderText
                 * 6 orderPrice
                 */
                if (curVal[0] > curDate) {
                    if (obj[curVal[1]] === undefined) {
                        obj[curVal[1]] = {};
                        // first order will be from order admin
                        obj[curVal[1]].pickupDate = curVal[0];
                        obj[curVal[1]].orderByDate = curVal[2];
                        obj[curVal[1]].numOfOrders = Number(curVal[3]);
                        obj[curVal[1]].orders = [];
                    }
                    obj[curVal[1]].orders.push({
                        "placer": curVal[4],
                        "order": curVal[5],
                        "price": curVal[6]
                    });
                }
                return obj;
            }, {});
    };
    let formatOrder = function (ord, tableID) {
        let price = Number(ord.price);
        let tax = Number(price) * 0.07;
        let total = price + tax;
        $("table#" + tableID + " tbody").append(
            "<tr>" +
            "<td>" +
            ord.placer +
            "</td>" +
            "<td>" +
            ord.order +
            "</td>" +
            "<td>" +
            HT.Utils.monify(price) +
            "</td>" +
            "<td>" +
            HT.Utils.monify(tax) +
            "</td>" +
            "<td>" +
            HT.Utils.monify(total) +
            "</td>" +
            "</tr>"
        );
        return total;
    };
    let display = function (ordersArr) {
        let ordObj = getObj(ordersArr);
        let grandTotal = 0;
        let tableID = "";
        let rowCount = 0;
        let ordByDate = {};
        let pickupDate = {};
        $("#newgrouporder").attr("hidden", true);
        $("#ordersview").attr("hidden", false);
        Object.keys(ordObj).forEach(
            function (curVal, index) {
                grandTotal = 0;
                tableID = ("table" + index);
                $("div#ordersview").append(tableHtml);
                $("table#default-table").attr("id", tableID);
                ordByDate = new Date(ordObj[curVal].orderByDate);
                pickupDate = new Date(ordObj[curVal].pickupDate);
                $("table#" + tableID + " caption").html(
                    curVal +
                    ",&nbsp;orders&nbsp;by&#58;&nbsp;" +
                    ordByDate.toLocaleString("en-US") +
                    ",&nbsp;pickup&nbsp;time&#58;&nbsp;" +
                    pickupDate.toLocaleString("en-US")
                );
                ordObj[curVal].orders.forEach(
                    function (curVal) {
                        grandTotal += formatOrder(curVal, tableID);
                    });
                $("table#" + tableID + " tfoot tr th.grand-total").html(
                    HT.Utils.monify(grandTotal)
                );
                rowCount = ordObj[curVal].orders.length;
                if (rowCount < ordObj[curVal].numOfOrders) {
                    $("table#" + tableID + " tfoot tr th:eq(0)").html(
                        "<a>Add me/edit my order</a>"
                    );
                }
                $("table#" + tableID + " tfoot tr th:eq(0)").on(
                    "click",
                    function () {
                        HT.OneOrder.new(curVal)
                    }
                );
            });
    };
    // get table default html from index.html
    tableHtml = $("div#ordersview").html();
    // prevents doubling first table displayed
    $("div#ordersview").empty();
    HT.Orders = (function ($) {
        return {
            /**
             * Open Orders page.
             * @function display
             * @memberof! HT.Orders
             * @param {object} jQuery The jQuery global.
             */
            display
        };
    }(jQuery));
}());

/**
 * [jQuery ready function]{@link https://api.jquery.com/ready/} invocation.
 * @namespace jQuery-ready-fxn
 * @memberof HT
 */
$(function (ordersArr) {
    "use strict";
    /**
     * Handler for Restaurant select event.
     * @name change-restaurant
     * @memberof! HT.jQuery-read-fxn
     */
    $("select#restaurant").on(
        "change",
        function () {
            $("a#menulink").attr(
                "href",
                HT.Restaurant.get()[
                    $("select#restaurant option:selected").val()
                ]
            );
        });
    /**
     * Handler for New Group Order submit event.
     * @name submit-new-group-order
     * @memberof! HT.jQuery-ready-fxn
     */
    $("form#newgrouporderform").on(
        "submit",
        function (event) {
            let formObj = $("form").serializeArray()
                .reduce(
                    function (formObj, curVal) {
                        formObj[curVal.name] = curVal.value;
                        return formObj;
                    }, {});
            event.preventDefault();
            HT.Orders.display(formObj);
        });
    /**
     * Display Orders
     * @name display-orders
     * @memberof! HT.jQuery-ready-fxn
     */
    HT.Orders.display(ordersArr);
}(ordersArr));
