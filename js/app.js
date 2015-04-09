var kingTab = (function (window, $) {
    var IMAGE_CONFIG = {
        wid: 1656,
        hei: 1128,
        fmt: 'jpeg',
        qlt: [90, 0],
        op_sharpen: 0,
        resMode: 'sharp2',
        op_usm: [1, 1, 6, 0],
        iccEmbed: 0,
        printRes: 72,
        fit: ['fit', 1]
    };

    var textElements = {
        welcome: $('#welcome-message'),
        clock: $('#clock')
    };

    var eventElements = {
        eventTitle: $('#event-title'),
        eventDescription: $('#event-description')
    };

    var baseUrl = 'https://www.onekingslane.com/';

    return {
        init: function () {
            this.currentEvent = EventsManager.getRandomEvent();
            this.setBackgroundImage(this.currentEvent.event_id);
            this.setMessages(textElements);
            this.setEvent(eventElements, this.currentEvent);
            this.createEventHandlers();
        },

        setBackgroundImage: function (eventId) {
            $('#wrapper').css('background-image','url("' + this.imageUrl(eventId) + '")');
        },

        imageUrlParams: function () {
            var key, params = '';
            for (key in IMAGE_CONFIG) {
                if (IMAGE_CONFIG.hasOwnProperty(key)) {
                    params += this.prepareImageParam(key);
                }
            }
            return params;
        },

        prepareImageParam: function (key) {
            return key + '=' + this.prepareImageParamValue(IMAGE_CONFIG[key]) + '&';

        },

        prepareImageParamValue: function (value) {
            if (value instanceof Array) {
                return value.join(',');
            }
            return value;
        },

        imageUrl: function (eventId) {
            return "images/" + "SalesEvent_" + eventId + "_Lifestyle_3.jpeg";
        },

        eventUrl: function (eventId) {
            return baseUrl + 'sales/' + eventId;
        },

        setMessages: function (ems) {
            $(ems.welcome).html('Good '+DateHelper.getTimeOfTheDayGreeting());
            this.setTime(ems.clock);
        },

        setTime: function (clock) {
            var callee = arguments.callee;
            clock.html(DateHelper.getCurrentTime());
            requestAnimationFrame(function () {
                callee(clock);
            });
        },

        setEvent: function(ems, currentEvent) {
            $(ems.eventTitle).html(currentEvent.event_title);
            $(ems.eventDescription).html(currentEvent.event_description);
        },

        createEventHandlers: function () {
            var input = $('#search-input');
            input.keydown(function (event) {
                if (event.keyCode === 13) {
                    window.location = baseUrl + 'search?q=' + input.val().replace(/\s/g, '+');
                }
            });
        }
    };
})(window, $);

$(document).on('ready',function () {
    kingTab.init();
});
