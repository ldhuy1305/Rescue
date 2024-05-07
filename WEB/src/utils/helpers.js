import messages from './messages';
// import store from '@/store';
// import moment from 'moment';
const helpers = {
    insertComma: (val) => {
        return (val + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    isEmail: (str) => {
        if (helpers.isNullOrEmpty(str)) {
            return true;
        }
        return String(str)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    },
    isPhone: (str) => {
        if (helpers.isNullOrEmpty(str)) {
            return true;
        }
        return String(str)
            .toLowerCase()
            .match(/^\d{1,5}-\d{1,5}-\d{1,5}$/);
    },
    isValidData: (data, rules) => {
        try {
            let isValid = true;
            // eslint-disable-next-line no-undef
            for (const key in rules) {
                if (Object.prototype.hasOwnProperty.call(rules, key)) {
                    const value = rules[key];
                    const values = value.split('|');
                    const length = values.length;
                    for (let i = 0; i < length; i++) {
                        const rule = values[i];
                        const checks = rule.split(':');
                        if (checks[0] == 'required') {
                            if (
                                !Object.prototype.hasOwnProperty.call(
                                    data,
                                    key
                                ) ||
                                data[key] == null ||
                                `${data[key] ?? ''}`
                                    .trim()
                                    // eslint-disable-next-line no-irregular-whitespace
                                    .replace(/　/g, '') == '' ||
                                // eslint-disable-next-line no-undef
                                ($(`#${key}`)?.last()?.is('select') &&
                                    data[key] == '0')
                            ) {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E006);
                                // eslint-disable-next-line no-undef
                                $(`[id^="${key}_"]`);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'email') {
                            if (!helpers.isEmail(data[key])) {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E002);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'phone') {
                            if (!helpers.isPhone(data[key])) {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E012);
                                isValid = false;
                            }
                        }
                    }
                }
            }
            if (!isValid) {
                // eslint-disable-next-line no-undef
                $(`.item-error`).first().focus();
            }
            return isValid;
        } catch (e) {
            console.log('validData: ' + e.message);
            return false;
        }
    },

    setItemError(id, msg) {
        // eslint-disable-next-line no-undef
        $(`#${id}`).ItemError(msg);
        // eslint-disable-next-line no-undef
        $(`.item-error`).first().focus();
    },
    /**
     *
     * @param {*} type type = 1 (type: 'characters')
     * @param {*} type type = 2 (type: 'string')
     * @param {*} type type = 3 (type: 'number')
     * @param {*} length
     * @returns
     */
    randomString: (type, length) => {
        try {
            let result = '';
            let lengthKey = 0;
            let Key = '';
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const texts =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            if (type == 1) {
                lengthKey = characters.length;
                Key = characters;
            } else if (type == 2) {
                lengthKey = texts.length;
                Key = texts;
            } else {
                lengthKey = numbers.length;
                Key = numbers;
            }
            for (var i = 0; i < length; i++) {
                result += Key.charAt(Math.floor(Math.random() * lengthKey));
            }
            return result;
        } catch (e) {
            console.log('randomString: ' + e.message);
            return false;
        }
    },
    splitByType: (str) => {
        str = str + '';
        const length = str.length;
        let beforeChar = '';
        let childStr = '';
        const result = [];
        for (let i = 0; i < length; i++) {
            const currentChar = str[i];
            if (
                (isNaN(beforeChar) && !isNaN(currentChar)) ||
                (!isNaN(beforeChar) && isNaN(currentChar))
            ) {
                if (childStr != '') {
                    const child = '00000000000000000000' + childStr;
                    result.push(
                        !isNaN(childStr)
                            ? child.substring(child.length - 20, child.length)
                            : childStr
                    );
                    childStr = currentChar;
                } else {
                    childStr = currentChar;
                }
            } else {
                childStr += currentChar;
            }
            beforeChar = currentChar;
        }
        if (childStr != '') {
            const child = '00000000000000000000' + childStr;
            result.push(
                !isNaN(childStr)
                    ? child.substring(child.length - 20, child.length)
                    : childStr
            );
        }
        return result;
    },
    getNumber: (str, emptyIsMax) => {
        if (str == null || str == undefined || str == '') {
            if (emptyIsMax) {
                return Number.MAX_SAFE_INTEGER;
            }
            return 0;
        }
        str = (str + '').replace(/\D/g, '');
        if (str == '') {
            if (emptyIsMax) {
                return Number.MAX_SAFE_INTEGER;
            }
            return 0;
        }
        const number = parseInt(str);
        if (isNaN(number)) {
            if (emptyIsMax) {
                return Number.MAX_SAFE_INTEGER;
            }
            return 0;
        }
        return number;
    },
    isNullOrEmpty: (str, isCheckZero = false) => {
        if (str == undefined || str == null || str == '') {
            return true;
        }
        if (isCheckZero && str == 0) {
            return true;
        }
        return false;
    },
    encodeParams: (params) => {
        try {
            if (params == undefined || params == null || params.length == 0) {
                return '';
            }
            let output = btoa(JSON.stringify(params));
            let endPos = 0;
            for (endPos = output.length; endPos > 0; endPos--) {
                if (output[endPos - 1] !== '=') {
                    break;
                }
            }
            const numberPaddingChars = output.length - endPos;
            output = output.replace(/\+/g, '-');
            output = output.replace(/\//g, '_');
            output = output.substring(0, endPos);
            output = output + numberPaddingChars;

            return output;
        } catch (e) {
            return '';
        }
    },
    decodeParams: (params) => {
        try {
            if (params == undefined || params == null || params.length == '') {
                return {};
            }
            var numberPading = parseInt(params.substring(params.length - 1));
            params = params.substring(0, params.length - 1);
            params = params.replace(/-/g, '+');
            params = params.replace(/_/g, '/');
            for (var j = 0; j < numberPading; j++) {
                params = params + '=';
            }
            params = params.replace(/[^A-Za-z0-9+/=]/g, '');
            params = atob(params);
            return JSON.parse(params);
        } catch (e) {
            return {};
        }
    },
    addPadLeft(value, char, length) {
        return String(char.repeat(length) + value).slice(-1 * length);
    },
    convertDecimal(value, decimal = 1) {
        if (value == undefined || value == '' || value == null) {
            return '';
        }
        value = value + '';
        let values = [];
        let negative = '';
        let dot = '';
        let afterDot = '';
        values = value.split('.');
        values[0] = values[0].replace(/\D/g, '');
        if (values.length > 1) {
            afterDot = values[1].replace(/\D/g, '');
            if (afterDot.length > decimal) {
                afterDot = afterDot.substring(0, decimal);
            }
            dot = '.';
        }
        if (!values[0]) {
            values[0] = 0;
        }
        return (value = negative + values[0] + dot + afterDot);
    },
    getUserFromToken() {
        try {
            const token = sessionStorage.getItem('token');
            const data = helpers.parseJwt(token);
            const logindata = JSON.parse(data.logindata ?? '{}');
            logindata.switchUser = {};
            if (sessionStorage.getItem('switchUser')) {
                logindata.switchUser = JSON.parse(
                    // eslint-disable-next-line no-undef
                    Base64.decode(sessionStorage.getItem('switchUser'))
                );
            }
            return logindata;
        } catch (e) {
            console.log('getUserFromToken: ' + e.message);
        }
        return [];
    },
    parseJwt(token) {
        if (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map(function (c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join('')
            );
            return JSON.parse(jsonPayload);
        }
        return {};
    }
};
export default helpers;
