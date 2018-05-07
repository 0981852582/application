var app = angular.module('App_ESSALE', ['ui.bootstrap', 'ngAnimate', 'ui.router', 'oc.lazyLoad', 'toaster']);
app.controller('danhSachThongKe', function ($scope, $timeout, $http, $location, $uibModal, $rootScope, $ocLazyLoad, $state, toaster) {
    $scope.oninit = function () {
        $scope.states = {
            isService: false,
            isAnalytic: false,
            isPrice: false
        };
        $scope.danhSachBaoCao = [];
    }
    $scope.chooseMonth = new Date().getFullYear().toString();
    $scope.startTime = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    $scope.endTime = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
    $scope.oninit();
    $scope.getCarendar = function (startTime, endTime) {
        BlockUI({
            target: 'html',
            message: 'Đang tải...'
        });
        var object = {
            StartTime: $scope.chooseMonth + '-01-01 00:00',
            EndTime: $scope.chooseMonth + '-12-31 00:00'
        }
        $scope.totalNumber = 0;
        $scope.totalPrice = 0;
        $http.post("/Manager/genereateCarlendar/", object).success(function (rs) {
            if (rs.error !== true) {
                $scope.startTime = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
                $scope.endTime = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
                let id = 0;
                $scope.danhSachLich = rs.results;
                for (let i = 0; i < $scope.danhSachLich.length; i++) {
                    for (let j = 0; j < $scope.danhSachLich[i].length; j++) {
                        $scope.danhSachLich[i][j].fullDate = new Date($scope.danhSachLich[i][j].fullDate);
                        if ($scope.danhSachLich[i][j].fullDate.valueOf() == $scope.startTime.valueOf()) {
                            id = $scope.danhSachLich[i][j].id;
                            $scope.danhSachLich[i][j].startChecked = true;
                        } else {
                            $scope.danhSachLich[i][j].startChecked = false;
                        }
                        if ($scope.danhSachLich[i][j].fullDate.valueOf() == $scope.endTime.valueOf()) {
                            id = $scope.danhSachLich[i][j].id;
                            $scope.danhSachLich[i][j].endChecked = true;
                        } else {
                            $scope.danhSachLich[i][j].endChecked = false;
                        }
                    }
                }
                $timeout(() => {
                    if (id != 0) {
                        var possition = angular.element("#" + id).offset().top - angular.element("#content").offset().top;
                        angular.element("#content").scrollTop(possition - 250);
                    } else {
                        angular.element("#content").scrollTop(0);
                    }
                    UnBlockUI("html");
                }, 100);
            }
        });

        $scope.check = function (index) {
            if (index != 0) {
                var check = 0;
                if (index - 1 === 0) {
                    check = 6;
                }
                if ($scope.danhSachLich[index][0].month == $scope.danhSachLich[index - 1][check].month)
                    return false;
                else
                    return true;
            } else {
                return true;
            }
        }
        $scope.getrow = function (index) {
            var month = (index != 0 ? $scope.danhSachLich[index][0].month : $scope.danhSachLich[index][6].month);
            var row = 1;
            for (var i = 0; i < $scope.danhSachLich.length; i++) {
                if (i != index) {
                    if ($scope.danhSachLich[i][0].month == month) {
                        row++;
                    }
                }
            }
            return row;
        }
        $scope.getMonth = function (index) {
            return index != 0 ? $scope.danhSachLich[index][0].month : $scope.danhSachLich[index][6].month;
        }
        $scope.CRDStartTime = undefined;
        $scope.CRDEndTime = undefined;
        $scope.chooseCarendar = function (value) {
            if (new Date(value.fullDate).valueOf() == new Date($scope.endTime).valueOf()) {
                $scope.startTime = value.fullDate;
            } else
                if (new Date(value.fullDate).valueOf() > new Date($scope.endTime).valueOf()) {
                    $scope.endTime = value.fullDate;
                } else if (new Date(value.fullDate).valueOf() < new Date($scope.startTime).valueOf()) {
                    $scope.endTime = $scope.startTime;
                    $scope.startTime = value.fullDate;
                }
                else if (new Date(value.fullDate).valueOf() < new Date($scope.endTime).valueOf()) {
                    $scope.endTime = value.fullDate;
                }
            let idStart;
            let idEnd;
            for (let i = 0; i < $scope.danhSachLich.length; i++) {
                for (let j = 0; j < $scope.danhSachLich[i].length; j++) {
                    $scope.danhSachLich[i][j].fullDate = new Date($scope.danhSachLich[i][j].fullDate);
                    if ($scope.danhSachLich[i][j].fullDate.valueOf() == $scope.startTime.valueOf()) {
                        idStart = $scope.danhSachLich[i][j].id;
                        $scope.danhSachLich[i][j].startChecked = true;
                    } else {
                        $scope.danhSachLich[i][j].startChecked = false;
                    }
                    if ($scope.danhSachLich[i][j].fullDate.valueOf() == $scope.endTime.valueOf()) {
                        idEnd = $scope.danhSachLich[i][j].id;
                        $scope.danhSachLich[i][j].endChecked = true;
                    } else {
                        $scope.danhSachLich[i][j].endChecked = false;
                    }
                }
            }
            for (let i = 0; i < $scope.danhSachLich.length; i++) {
                for (let j = 0; j < $scope.danhSachLich[i].length; j++) {
                    if ($scope.danhSachLich[i][j].id > idStart && $scope.danhSachLich[i][j].id < idEnd) {
                        $scope.danhSachLich[i][j].betweenChecked = true;
                    } else {
                        $scope.danhSachLich[i][j].betweenChecked = false;
                    }
                }
            }
        }
        $scope.submit = function () {
            var objects = {
                startTime: $scope.startTime,
                endTime: $scope.endTime
            }
            BlockUI({
                target: 'html',
                message: 'Đang tải...'
            });
            $http.post("/Manager/report/", objects).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    $scope.danhSachBaoCao = rs.results;
                    $scope.totalNumber = 0;
                    $scope.totalPrice = 0;
                    for (let i = 0; i < $scope.danhSachBaoCao.length; i++) {
                        $scope.totalNumber += $scope.danhSachBaoCao[i].number;
                        $scope.totalPrice += $scope.danhSachBaoCao[i].price;
                    }
                }
                $timeout(() => {
                    UnBlockUI("html");
                }, 100);
            });
        }
        $scope.submit();
        $scope.redirectModalDetailReport = function (item) {
            $rootScope.objectDetail = item;
            console.log(item);
            var object = {
                date: item.indicatorDate
            };
            $http.post("/Manager/detailReport/", object).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    $rootScope.danhSachChiTietBaoCao = rs.results;
                }
            });
            angular.element('#modalDetail').modal('show');
        }
    }
    $scope.getCarendar();
    $scope.redirectModalService = function () {
        $timeout(function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../lib/jscontroller/manager/service.html',
                controller: 'quanLyDichVu',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                }
            });
        }, 1);
    }
    $scope.redirectModalPayLoad = function () {
        $timeout(function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../lib/jscontroller/manager/payload.html',
                controller: 'quanLyThanhToan',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                }
            });
        }, 1);
    }
    $scope.redirectModalReport = function () {
        $timeout(function () {
            var modalInstance = $uibModal.open({
                templateUrl: '../../lib/jscontroller/manager/report.html',
                controller: 'quanLyThongKe',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                }
            });
        }, 1);
    }
});