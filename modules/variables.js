exports.variables = [
    {
        "selector":"g",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.fromNow(true) : "[parse error: not a moment.js object]"},
        "desc":"How long ago the timestamp was (e.g a few seconds, or 2 years, or 4 months)"
    },
    {
        "selector":"G",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.calendar(null, {sameDay: '[Today]',nextDay: '[Tomorrow]',nextWeek: 'dddd',lastDay: '[Yesterday]',lastWeek: '[Last] dddd', sameElse: 'YYYY-MM-DD'}) : "[parse error: not a moment.js object]"},
        "desc":"When the timestamp was, default Discord style (e.g Today, or 05/17/2009, or Last Friday)"
    },
    {
        "selector": "Y",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getFullYear()},
        "desc": "Full year (e.g 2020)"
    },
    {
        "selector": "y",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getYear() - 100},
        "desc": "Last 2 digits of year (e.g 20)"
    },
    {
        "selector": "q",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return Math.floor((new Date().getMonth() + 3) / 3)},
        "desc": "Year quarter (e.g 3)"
    },
    {
        "selector": "W",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.format("dddd") : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][timestamp.getDay()]},
        "desc": "Day of the week (e.g Wednesday)"
    },
    {
        "selector": "w",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.format("ddd") : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][timestamp.getDay()].slice(0,3)},
        "desc": "Short form of day of the week (e.g Wed)"
    },
    {
        "selector": "E",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return Math.ceil(((new Date(now.getFullYear(), timestamp.getMonth(), timestamp.getDate())-new Date(now.getFullYear(),0,1))/864e5+new Date(now.getFullYear(),0,1).getDay()+1)/7) - 1},
        "desc": "Week of the year (e.g 39)"
    },
    {
        "selector": "M",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getMonth() + 1},
        "desc": "Month (e.g 9)"
    },
    {
        "selector": "0M",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + (timestamp.getMonth() + 1)).substr(-2)},
        "desc": "Month (lead 0) (e.g 09)"
    },
    {
        "selector": "N",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.format("MMMM") : ['January', 'February',  'March',  'April',  'May',  'June',  'July', 'August',  'September',  'October',  'November',  'December'][timestamp.getMonth()]},
        "desc": "Month (word form) (e.g September)"
    },
    {
        "selector": "n",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestampMoment ? timestampMoment.format("MMM") : ['January', 'February',  'March',  'April',  'May',  'June',  'July', 'August',  'September',  'October',  'November',  'December'][timestamp.getMonth()].slice(0,3)},
        "desc": "Month (short word form) (e.g Sep)"
    },
    {
        "selector": "D",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getDate()},
        "desc": "Day (e.g 23)"
    },
    {
        "selector": "0D",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + timestamp.getDate()).substr(-2)},
        "desc": "Day (lead 0) (e.g 23)"
    },
    {
        "selector": "H",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getHours()},
        "desc": "Hour (24 hour format) (e.g 13)"
    },
    {
        "selector": "0H",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + timestamp.getHours()).substr(-2)},
        "desc": "Hour (24 hour format) (lead 0) (e.g 13)"
    },
    {
        "selector": "h",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getHours() % 12 || 12},
        "desc": "Hour (12 hour format) (e.g 7)"
    },
    {
        "selector": "0h",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + (timestamp.getHours() % 12 || 12)).substr(-2)},
        "desc": "Hour (12 hour format) (lead 0) (e.g 07)"
    },
    {
        "selector": "m",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getMinutes()},
        "desc": "Minute (e.g 6)"
    },
    {
        "selector": "0m",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + timestamp.getMinutes()).substr(-2)},
        "desc": "Minute (lead 0) (e.g 06)"
    },
    {
        "selector": "s",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getSeconds()},
        "desc": "Second (e.g 54)"
    },
    {
        "selector": "0s",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('0' + timestamp.getSeconds()).substr(-2)},
        "desc": "Second (lead 0) (e.g 54)"
    },
    {
        "selector": "l",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getMilliseconds()},
        "desc": "Milliseconds (e.g 7)"
    },
    {
        "selector": "0l",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return ('00' + timestamp.getMilliseconds()).substr(-3)},
        "desc": "Milliseconds (lead 0) (e.g 007)"
    },
    {
        "selector": "a",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getHours() < 12 ? 'a' : 'p'},
        "desc": "Time ending in 12 hour formats, without the M (e.g p) (p.s You can use %am for the full ending)"
    },
    {
        "selector": "A",
        "func": function(timestamp,timestampMoment = null, now = new Date()) {return timestamp.getHours() < 12 ? 'A' : 'P'},
        "desc": "same as %a, but capital (e.g P)"
    }
]
