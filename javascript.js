/*jshint jquery:true*/
/**
 * @file Hog Trough
 * @version 0.0
 * @author Kevin Griffin <kevin.griffin@gmail.com>
 *
 * @todo Write the documentation.
 * @todo Implement this function.
 */

/**
 * @global
 * @param {Object} $ jQuery reference
 * @returns {Object} public methods and properties
 *
 * {@link http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
Module Pattern}
 * This is an anonymous closure which is the fundamental construct that makes
 * it all possible, and really is the single best feature of JavaScript. We’ll
 * simply create an anonymous function, and execute it immediately. All of the
 * code that runs inside the function lives in a closure, which provides
 * privacy and state throughout the lifetime of our application.
 */

/**
 * Restaurants.
 * @param {void}
 * @returns {object} Restaurants object.
 */
let restaurant = (function () {
    "use strict";
    let json = {
        "--TBD--": "http://www.google.com",
        "BERTUCCI'S": "http://www.bertuccis.com/",
        "PAPA GINOS": "https://www.papaginos.com/menu"
    };
    let get = function () {
        return json;
    };
    return {
        get
    };
}());

/**
 * Current date in UTC format.
 * @returns {object} The current UTC date object.
 */
let utcDate = (function () {
    "use strict";
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
        get: function () {
            return utcDate;
        }
    };
}());

/**
 * New group order page.
 * @param {object} jQuery The jQuery global.
 * @returns {object} New group order page.
 */
let GO = (function ($) {
    "use strict";
    return {
        newGroupOrder: function () {
            $("div#main").attr("hidden", true);
            $("#newgrouporder").attr("hidden", false);
            // restaurant SELECT should be in restaurant module???
            Object.entries(restaurant.get()).forEach(
                function (curVal) {
                    $("select#restaurant").append(
                        "<option value=\"" + curVal[0] + "\">" +
                        curVal[0] + "</option>"
                    );
                }
            );
            $("input#orderByTime").val(utcDate.get());
            $("input#orderPickupTime").val(utcDate.get());
        }
    };
}(jQuery));

// jQuery ready function
$(function () {
    "use strict";
    // restaurant select event
    $("select#restaurant").on(
        "change",
        function () {
            $("a#menulink").attr(
                "href",
                restaurant.get()[
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
