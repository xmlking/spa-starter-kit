export default class Filters {

    // math.max
    static max(arr) {
        if (!arr) return arr;
        return Math.max.apply(null, arr);
    }

    // math.min
    static min(arr) {
        if (!arr) return arr;
        return Math.min.apply(null, arr);
    }

    // array.reverse
    static reverse(arr) {
        if (!arr) return arr;
        return arr.reverse();
    }

    // array.unique
    static unique(items, filterOn) {
        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var newItems = [],
                get = angular.isString(filterOn) ? $parse(filterOn) : function (item) {
                    return item;
                };

            var extractValueToCompare = function (item) {
                return angular.isObject(item) ? get(item) : item;
            };

            angular.forEach(items, function (item) {
                var isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    }

}