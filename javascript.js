/*jshint jquery:true*/
/*globals HT*/
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
    window.HT = {};
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
         * @param {void}
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
             * @returns {object} The current UTC date object.
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
             * @returns {object} New group order page.
             */
            new: function () {
                $("div#main").attr("hidden", true);
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

// jQuery ready function
$(function () {
    "use strict";
    // restaurant select event
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
    // form submit event
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
        });
});
