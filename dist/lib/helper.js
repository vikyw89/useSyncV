var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { result, update } from 'lodash-es';
import { diffJson } from 'diff';
export var store = {};
export var subscribers = [];
export var selectorHistory = {};
export var emitChange = function () {
    for (var _i = 0, subscribers_1 = subscribers; _i < subscribers_1.length; _i++) {
        var subscriber = subscribers_1[_i];
        subscriber();
    }
};
export var subscribe = function (callback) {
    subscribers = __spreadArray(__spreadArray([], subscribers, true), [callback], false);
    return function () {
        subscribers = subscribers.filter(function (p) {
            return p !== callback;
        });
    };
};
export var debugSyncVConfig = {
    maxHistory: 50
};
/**
 * A function that logs debug information about the data in the store using the specified selector.
 *
 * @param selector - The selector to use for accessing data in the store, debug store root if empty
 */
export var debugSyncV = function (selector) {
    var selectorKey = selector !== null && selector !== void 0 ? selector : 'ROOT';
    var currentSelectorJSONValue = selector
        ? JSON.stringify(result(store, selector, ''), null, '\t')
        : JSON.stringify(store, null, '\t');
    console.group("START OF DEBUGSYNCV");
    console.count('Iteration number');
    console.log("Selector:", selectorKey);
    console.groupCollapsed("Value");
    console.log(currentSelectorJSONValue);
    console.groupEnd();
    var previousSelectorJSONValue = JSON.stringify('');
    update(selectorHistory, selectorKey, function (p) {
        var _a;
        if (!p) {
            p = [JSON.stringify('')];
        }
        var historyLength = p.length;
        // get the previous selector history value
        previousSelectorJSONValue = (_a = p[historyLength - 1]) !== null && _a !== void 0 ? _a : JSON.stringify('');
        if (historyLength >= 10) {
            p.shift();
        }
        return __spreadArray(__spreadArray([], p, true), [currentSelectorJSONValue], false);
    });
    // diff selector history with previous result
    console.groupCollapsed('Change log');
    var listOfChangedObject = diffJson(JSON.parse(previousSelectorJSONValue), JSON.parse(currentSelectorJSONValue), { newlineIsToken: false });
    listOfChangedObject.forEach(function (v) {
        if (v.added) {
            console.log("--", v.value);
        }
        else if (v.removed) {
            console.info("++", v.value);
        }
    });
    console.groupEnd();
    console.groupEnd();
    console.log(JSON.parse(currentSelectorJSONValue));
};
//# sourceMappingURL=helper.js.map