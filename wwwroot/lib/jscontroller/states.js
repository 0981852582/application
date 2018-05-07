var app = angular.module("App_Hotel", ['ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'toaster', 'angularjs-datetime-picker']);
app.controller("Ctrl_Hotel", function ($scope, $state, $rootScope, $http, $timeout) {

});
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("");

    $stateProvider.state('danhSachDatPhong', {
        url: "/danhSachDatPhong",
        templateUrl: "../../lib/jscontroller/home/index.html",
        controller: "danhSachDatPhong",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../lib/jscontroller/home/controller.js'
                    ]
                });
            }]
        }
    }).state('danhSachQuanLy', {
        url: "/danhSachQuanLy",
        templateUrl: "../../lib/jscontroller/manager/index.html",
        controller: "danhSachQuanLy",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../lib/jscontroller/manager/controller.js'
                    ]
                });
            }]
        }
    }).state('danhSachThongKe', {
        url: "/danhSachThongKe",
        templateUrl: "../../lib/jscontroller/report/index.html",
        controller: "danhSachThongKe",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../lib/jscontroller/report/controller.js'
                    ]
                });
            }]
        }
    })
}]);
var convert = function (string) {
    try {
        return string.replace(/,/g, ".");
    } catch (ex) {
        return "";
    }
}
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$formatters.unshift(function (a) {
                return convert($filter(attrs.format)(ctrl.$modelValue));
            });

            ctrl.$parsers.unshift(function (viewValue) {

                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                plainNumber = plainNumber.replace(/[.]/g, "");
                elem.val(convert($filter('number')(plainNumber)));

                return plainNumber;
            });
        }
    };
}]);
var convertNumber = function (number, isview) {
    try {
        var numbers = number;
        var length = numbers.length;
        if (isview) {
            if (numbers.indexOf(".") != -1) {
                length = numbers.indexOf(".");
                numbers = number.replace(".", ",");
            }
        } else
            if (numbers.indexOf(",") != -1) length = numbers.indexOf(",");
        var isTrue = true;
        while (isTrue) {
            if (numbers[0] == "0") numbers = numbers.substr(1, numbers.length);
            else isTrue = false;
        };
        numbers = numbers.split(",");
        var string = "";
        for (var i = 0; i < numbers.length; i++) {
            if (i == 0) string += numbers[i];
            else if (i == 1) string += "," + numbers[i];
            else string += numbers[i];
        }
        numbers = string;
        var no = 3, index = length - no;
        while (index > 0) {
            numbers = numbers.substr(0, index) + '.' + numbers.substr(index);
            index -= no;
        };
        return numbers == "" ? 0 : numbers;
    } catch (ex) {
    }
    return numbers == "" ? 0 : numbers;
}
app.directive("number", function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs, ctrl) {
            var func = function () {
                var read = attrs.number.split("."); var save;
                for (var i = 0; i < read.length; i++) {
                    if (save == undefined)
                        save = scope[read[i]];
                    else
                        save = save[read[i]];
                }
                if (save != undefined && save != null)
                    elem.text(convertNumber(save.toString(), true));
                else
                    elem.text("");
            }; func();
            scope.$watch(attrs.number,
                function (newvalue, oldvalue) {
                    func();
                });
        }
    }
})
var convertDateFull = function (value) {
    return (new Date(value).getDate() < 10 ? '0' : '') + '' + new Date(value).getDate() + '/' + ((new Date(value).getMonth() + 1) < 10 ? '0' : '') + '' + (new Date(value).getMonth() + 1) + '/' + new Date(value).getFullYear() + ' ' + (new Date(value).getHours() < 10 ? '0' : '') + '' + new Date(value).getHours() + ':' + (new Date(value).getMinutes() < 10 ? '0' : '') + '' + new Date(value).getMinutes();
}
var convertOnlyDate = function (value) {
    return (new Date(value).getDate() < 10 ? '0' : '') + '' + new Date(value).getDate() + '/' + ((new Date(value).getMonth() + 1) < 10 ? '0' : '') + '' + (new Date(value).getMonth() + 1) + '/' + new Date(value).getFullYear();
}
app.directive('datetimePickerFull', ['$filter', function () {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            $(elem).datetimepicker({
                timepicker: true,
                step: 5,
                format: 'd/m/Y H:i'
            });
            ctrl.$formatters.unshift(function (viewValue) {
                if (viewValue.indexOf('/Date') != -1) {
                    viewValue = parseFloat(viewValue.substr(6, 13));
                }
                return convertDateFull(viewValue);
            });
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue != undefined && viewValue != '') {
                    try {
                        var hours = viewValue.split(' ');
                        var split = hours[0].split('/');
                        var result = '/Date(' + (new Date(split[2] + '-' + split[1] + '-' + split[0] + ' ' + hours[1]).getTime()) + ')/';
                        return result;
                    } catch (ex) {
                        return '';
                    }
                }
            });
        }
    };
}]);
app.directive('datetimePickerOnlyDate', ['$filter', function () {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            $(elem).datetimepicker({
                timepicker: false,
                step: 5,
                format: 'd/m/Y'
            });
            ctrl.$formatters.unshift(function (viewValue) {
                if (viewValue.indexOf('/Date') != -1) {
                    viewValue = parseFloat(viewValue.substr(6, 13));
                }
                return convertOnlyDate(viewValue);
            });
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue != undefined && viewValue != '') {
                    try {
                        var split = viewValue.split('/');
                        var result = '/Date(' + (new Date(split[2] + '-' + split[1] + '-' + split[0]).getTime()) + ')/';
                        return result;
                    } catch (ex) {
                        return '';
                    }
                }
            });
        }
    };
}]);
app.directive('keyboardPicker', ['$filter', function () {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            $(elem).accentKeyboard({
                layout: 'accent',
                active_shift: true,
                active_caps: false,
                is_hidden: true,
                open_speed: 300,
                close_speed: 100,
                show_on_focus: true,
                hide_on_blur: true,
                trigger: undefined,
                enabled: true
            });
        }
    };
}]);
var BlockUI = function (objects) {
    App.blockUI({ target: objects.target, boxed: !0, message: objects.message });
}
var UnBlockUI = function (objects) {
    App.unblockUI(objects);
}
var Comfirm = function (messages, callback) {
    bootbox.dialog({ message: messages, title: "", buttons: { success: { label: "<a href='javascript:void(0)' class='button-success'>Đồng ý</a>", className: "btn-primary", callback: function () { return callback(true) } }, danger: { label: "<a href='javascript:void(0)' class='button-danger'>Hủy</a>", className: "red", callback: function () { return callback(false) } } } })
}
