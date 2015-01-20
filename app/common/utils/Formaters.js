export default class Formaters {

    // debug.print
    static print(str) {
        console.log("Filters.debug.print", str);
        return str;
    }

    // binary.YesNo
    static YesNo(b) {
        return b === true ? 'Yes' : 'No';
    }

    // string.format
    static format(str) {
        if (!str || arguments.length <= 1) return str;
        var args = arguments;
        for (var i = 1; i < arguments.length; i++) {
            var reg = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            str = str.replace(reg, arguments[i]);
        }
        return str;
    }

    // string.html2string
    static html2string(str) {
        if (!str) return str;
        return $('<div/>').html(str).text();
    }

    // string.shorten
    static shorten(str, length) {
        if (!str || !length || str.length <= length) return (str || '');
        return  str.substr(0, length) + (length <= 3 ? '' : '...');
    }

    // string.lowercase
    static lowercase(str) {
        return (str || '').toLowerCase();
    }

    // string.uppercase
    static uppercase(str) {
        return (str || '').toUpperCase();
    }

    // string.camelcase
    static camelcase(str) {
        return (str || '').toLowerCase().replace(/(\s.|^.)/g, function (match, group) {
            return group ? group.toUpperCase() : '';
        });
    }

    // string.capitalize
    static capitalize(str) {
        if (str != null)
            str = str.toLowerCase();
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    // string.trim
    static trim(str) {
        return (str || '').replace(/(^\s*|\s*$)/g, function (match, group) {
            return '';
        });
    }

    // string.trimstart
    static trimstart(str) {
        return (str || '').replace(/(^\s*)/g, function (match, group) {
            return '';
        });
    }

    // string.trimend
    static trimend(str) {
        return (str || '').replace(/(\s*$)/g, function (match, group) {
            return '';
        });
    }

    // string.replace
    static replace(str, pattern, replacement) {
        try {
            return (str || '').replace(RegExp(pattern, 'g'), replacement);
        } catch (e) {
            console.error("error in replace filter", e);
            return (str || '');
        }
    }

    // array.join
    static join(arr, seperator) {
        if (!arr) return arr;
        return arr.join(seperator || ',');
    }

}
