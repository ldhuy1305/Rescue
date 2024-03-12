import messages from './messages';
import label from './label';
import store from '@/store';
import moment from 'moment';

const helpers = {
    removeJapaneseCharacter: (str) => {
        if (str == undefined || str == null) {
            return '';
        }
        const regex =
            /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
        return str.replace(regex, '');
    },
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
    isZipCode: (str) => {
        if (helpers.isNullOrEmpty(str)) {
            return true;
        }
        return String(str)
            .toLowerCase()
            .match(/^\d{3}-\d{4}$/);
    },
    isKatakana: (str) => {
        if (helpers.isNullOrEmpty(str)) {
            return true;
        }
        return String(str)
            .toLowerCase()
            .match(/[ァ-ンｧ-ﾝﾞﾟ0-9ー]$/);
    },
    isValidData: (
        data,
        rules,
        includeName = false,
        valueBase = null,
        csrId = undefined
    ) => {
        try {
            let isValid = true;
            const screenId = csrId ?? store.state.app.screenId;
            // eslint-disable-next-line no-undef
            $(`.item-error`).RemoveError();
            for (const key in rules) {
                if (Object.prototype.hasOwnProperty.call(rules, key)) {
                    let tbl = label[screenId] ? label[screenId][key] : '';
                    const value = rules[key];
                    const values = value.split('|');
                    const length = values.length;
                    if (tbl == undefined || tbl == null || tbl == '') {
                        tbl = '項目';
                    }
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
                                // if (isValid) {
                                //     store.commit('app/showHeaderError', [
                                //         tbl + messages.E001
                                //     ]);
                                // }
                                const err_msg = includeName
                                    ? key + messages.E010
                                    : messages.E006;
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(err_msg);
                                // eslint-disable-next-line no-undef
                                $(`[id^="${key}_"]`).ItemError(err_msg);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'email') {
                            if (
                                !helpers.isEmail(data[key]) &&
                                data[key] != '@'
                            ) {
                                // if (isValid) {
                                //     store.commit('app/showHeaderError', [
                                //         messages.E002
                                //     ]);
                                // }
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E002);
                                // eslint-disable-next-line no-undef
                                $(`#${key}_part2`)
                                    .last()
                                    .ItemError(messages.E002);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'phone') {
                            if (
                                !helpers.isPhone(data[key]) &&
                                data[key] != '--'
                            ) {
                                // if (isValid) {
                                //     store.commit('app/showHeaderError', [
                                //         messages.E012
                                //     ]);
                                // }
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E012);
                                // eslint-disable-next-line no-undef
                                $(`#${key}_part2`)
                                    .last()
                                    .ItemError(messages.E012);
                                // eslint-disable-next-line no-undef
                                $(`#${key}_part3`)
                                    .last()
                                    .ItemError(messages.E012);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'zipcode') {
                            if (
                                !helpers.isZipCode(data[key]) &&
                                data[key] != '-'
                            ) {
                                // if (isValid) {
                                //     store.commit('app/showHeaderError', [
                                //         messages.E013
                                //     ]);
                                // }
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E013);
                                // eslint-disable-next-line no-undef
                                $(`#${key}_part2`)
                                    .last()
                                    .ItemError(messages.E013);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'katakana') {
                            if (!helpers.isKatakana(data[key])) {
                                // if (isValid) {
                                //     store.commit('app/showHeaderError', [
                                //         messages.E014
                                //     ]);
                                // }
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E014);
                                isValid = false;
                            }
                        }
                        if (checks[0] == 'isBaseAnother') {
                            if (valueBase == null || valueBase == '') {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E006);
                                isValid = false;
                            }
                            if (valueBase == 'E056') {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E056);
                                isValid = false;
                            }
                            if (valueBase == 'E057') {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E057);
                                isValid = false;
                            }
                            if (valueBase == 'E061') {
                                // eslint-disable-next-line no-undef
                                $(`#${key}`).last().ItemError(messages.E061);
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
    isMobile: () => {
        let check = false;
        try {
            try {
                check = navigator.userAgentData.mobile;
            } catch (e) {
                (function (a) {
                    if (
                        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                            a
                        ) ||
                        // eslint-disable-next-line no-useless-escape
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                            a.substr(0, 4)
                        )
                    )
                        check = true;
                })(navigator.userAgent || navigator.vendor || window.opera);
            }
            // eslint-disable-next-line no-empty
        } catch (ex) {}
        if (!check && window.outerWidth <= 768 && window.outerWidth > 0) {
            check = true;
        }
        return check;
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
    },
    permission() {
        const appData = store._state.data.app;
        if (
            appData.user.switchUser &&
            appData.user.switchUser.ユーザ権限 &&
            appData.user.switchUser.ユーザ権限 != appData.user.ユーザ権限
        ) {
            return appData.user.switchUser.ユーザ権限;
        }
        return appData.user.ユーザ権限;
    },
    isSwitchUser() {
        const appData = store._state.data.app;
        return (
            appData.user.switchUser &&
            ((appData.user.switchUser.パスワード &&
                appData.user.switchUser.パスワード != appData.user.loginid) ||
                (appData.user.switchUser.契約会社コード &&
                    appData.user.switchUser.契約会社コード !=
                        appData.user.契約会社コード))
        );
    },
    convertDateString(value) {
        if (value == undefined || value == '' || value == null) {
            return '';
        }
        var reg1 = /^[0-9]{4}(1[0-2]|0[1-9])(3[0-1]|[1-2][0-9]|0[1-9])$/;
        var reg2 =
            /^[0-9]{4}[/.](1[0-2]|0[1-9])[/.](3[0-1]|[1-2][0-9]|0[1-9])$/;
        var reg3 = /^[0-9]{4}(1[0-2]|0[1-9])$/;
        var reg4 = /^[0-9]{4}[/.](1[0-2]|0[1-9])$/;
        if (value.match(reg1)) {
            value =
                value.substring(0, 4) +
                '/' +
                value.substring(4, 6) +
                '/' +
                value.substring(6);
        }
        if (value.match(reg3)) {
            value = value.substring(0, 4) + '/' + value.substring(4, 6) + '/01';
        }
        if (value.match(reg4)) {
            value = value + '/01';
        }
        if (!value.match(reg2)) {
            value = '';
        }
        return value;
    },
    convertTimeString(value) {
        if (value == undefined || value == '' || value == null) {
            return '';
        }
        value = (value + '').replace(/\D/g, '');
        if (value.length == 0) {
            return '0:00';
        }
        if (value.length == 1) {
            return '0:0' + value;
        }
        if (value.length == 2) {
            return '0:' + value;
        }
        return (
            (value.substr(0, value.length - 2).length == 1
                ? '0' + value.substr(0, value.length - 2)
                : value.substr(0, value.length - 2)) +
            ':' +
            value.substr(value.length - 2, value.length)
        );
    },
    shuffleString(str, maxlength) {
        var shuffledString = str
            .split('')
            .sort(function () {
                return 0.5 - Math.random();
            })
            .join('');
        if (maxlength > 0) {
            shuffledString = shuffledString.substr(0, maxlength);
        }
        return shuffledString;
    },
    generatePassword(length, rules) {
        if (!length || length == undefined) {
            length = 12;
        }
        if (!rules || rules == undefined) {
            rules = [
                { chars: 'abcdefghijklmnopqrstuvwxyz', min: 3 },
                { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', min: 2 },
                { chars: '0123456789', min: 2 },
                { chars: '!@#$&*?|%+-_./:;=()[]{}', min: 1 }
            ];
        }
        var allChars = '',
            allMin = 0;
        rules.forEach(function (rule) {
            allChars += rule.chars;
            allMin += rule.min;
        });
        if (length < allMin) {
            length = allMin;
        }
        rules.push({ chars: allChars, min: length - allMin });
        var pswd = '';
        rules.forEach(function (rule) {
            if (rule.min > 0) {
                pswd += helpers.shuffleString(rule.chars, rule.min);
            }
        });
        return helpers.shuffleString(pswd);
    },
    plusTime(time1, time2) {
        if (helpers.isNullOrEmpty(time1) && helpers.isNullOrEmpty(time2)) {
            return '0:00';
        }
        if (helpers.isNullOrEmpty(time1)) {
            return helpers.convertTimeString(time2);
        }
        if (helpers.isNullOrEmpty(time2)) {
            return helpers.convertTimeString(time1);
        }
        const time1Split = helpers.convertTimeString(time1).split(':');
        const time2Split = helpers.convertTimeString(time2).split(':');
        const time1Minute =
            parseInt(time1Split[0]) * 60 + parseInt(time1Split[1]);
        const time2Minute =
            parseInt(time2Split[0]) * 60 + parseInt(time2Split[1]);
        const sum = time1Minute + time2Minute;
        const totalHour = Math.floor(sum / 60);
        const totalMinute = sum % 60;
        return `${totalHour}:${totalMinute < 10 ? '0' : ''}${totalMinute}`;
    },
    minusTime(time1, time2) {
        if (helpers.isNullOrEmpty(time1) || helpers.isNullOrEmpty(time2)) {
            return '0:00';
        }
        const time1Split = helpers.convertTimeString(time1).split(':');
        const time2Split = helpers.convertTimeString(time2).split(':');
        const time1Minute =
            parseInt(time1Split[0]) * 60 + parseInt(time1Split[1]);
        const time2Minute =
            parseInt(time2Split[0]) * 60 + parseInt(time2Split[1]);
        const sum = time2Minute - time1Minute;
        const negative = sum < 0 ? '-' : '';
        const totalHour = Math.floor(Math.abs(sum) / 60);
        const totalMinute = Math.abs(sum) % 60;
        return `${negative}${totalHour}:${
            totalMinute < 10 ? '0' : ''
        }${totalMinute}`;
    },
    compareTime(time1, time2) {
        if (helpers.isNullOrEmpty(time1) || helpers.isNullOrEmpty(time2)) {
            return 1;
        }
        const time1Split = helpers.convertTimeString(time1).split(':');
        const time2Split = helpers.convertTimeString(time2).split(':');
        const time1Minute =
            parseInt(time1Split[0]) * 60 + parseInt(time1Split[1]);
        const time2Minute =
            parseInt(time2Split[0]) * 60 + parseInt(time2Split[1]);
        return time2Minute - time1Minute;
    },
    compareDate(date1, date2) {
        if (helpers.isNullOrEmpty(date1) || helpers.isNullOrEmpty(date2)) {
            return 1;
        }
        if (date1 == date2) {
            return 0;
        }
        const from = moment(`${date1.replace(/\//g, '-')} 00:00:00`);
        const to = moment(`${date2.replace(/\//g, '-')} 00:00:00`);
        if (from < to) {
            return 1;
        }
        return -1;
    },
    compareMonth(month1, month2) {
        if (helpers.isNullOrEmpty(month1) || helpers.isNullOrEmpty(month2)) {
            return 1;
        }
        if (month1 == month2) {
            return 0;
        }
        const from = moment(`${month1.replace(/\//g, '-')}-01 00:00:00`);
        const to = moment(`${month2.replace(/\//g, '-')}-01 00:00:00`);
        if (from < to) {
            return 1;
        }
        return -1;
    },
    getDayOfWeek(day) {
        try {
            if (!day) {
                day = moment().day();
            }
            return ['日', '月', '火', '水', '木', '金', '土'][day];
        } catch (e) {
            console.log('getDayOfWeek' + e.message);
        }
        return '';
    },
    getAbsoluteMonths(momentDate) {
        const months = Number(momentDate.format('MM'));
        const years = Number(momentDate.format('YYYY'));
        return months + years * 12;
    },
    monthDiff(start, end) {
        const startMonths = helpers.getAbsoluteMonths(start);
        const endMonths = helpers.getAbsoluteMonths(end);
        return endMonths - startMonths;
    }
};
export default helpers;
