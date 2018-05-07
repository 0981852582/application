var clockTime = function () {
    $('.clockpicker').clockpicker()
        .find('input').change(function () {
            console.log(this.value);
        });
    var input = $('#single-input').clockpicker({
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });

    $('.clockpicker-with-callbacks').clockpicker({
        donetext: 'Done',
        init: function () {
            console.log("colorpicker initiated");
        },
        beforeShow: function () {
            console.log("before show");
        },
        afterShow: function () {
            console.log("after show");
        },
        beforeHide: function () {
            console.log("before hide");
        },
        afterHide: function () {
            console.log("after hide");
        },
        beforeHourSelect: function () {
            console.log("before hour selected");
        },
        afterHourSelect: function () {
            console.log("after hour selected");
        },
        beforeDone: function () {
            console.log("before done");
        },
        afterDone: function () {
            console.log("after done");
        }
    })
        .find('input').change(function () {
            console.log(this.value);
        });

    // Manually toggle to the minutes view
    $('#check-minutes').click(function (e) {
        // Have to stop propagation here
        alert('trongntt');
        e.stopPropagation();
        input.clockpicker('show')
            .clockpicker('toggleView', 'minutes');

    });
    if (/mobile/i.test(navigator.userAgent)) {
        $('input').prop('readOnly', true);
    }
}
var app = angular.module('App_ESSALE', ['ui.bootstrap', 'ngAnimate', 'ui.router', 'oc.lazyLoad', 'toaster']);
app.controller('danhSachQuanLy', function ($scope, $timeout, $http, $location, $uibModal, $rootScope, $ocLazyLoad, $state, toaster) {
    $scope.oninit = function () {
        $scope.states = {
            isService: false,
            isAnalytic: false,
            isPrice: false
        };
    }
    $scope.oninit();

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
app.controller('quanLyDichVu', function ($scope, $timeout, $http, $location, $uibModalInstance, $rootScope, toaster) {
    $scope.oninit = function () {
        $scope.title = "Quản lý dịch vụ";
        $scope.displayAdd = false;
        $rootScope.reloadService = function () {
            $http.post("/RoomAPI/getRoomService/").success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachDichVu = rs.results;
                }
            });
        }
        $rootScope.reloadService();
    }
    $scope.oninit();
    $scope.submit = function () {
        if ($scope.danhSachDichVu.length > 0) {
            var arrayObject = [];
            for (let item = 0; item < $scope.danhSachDichVu.length; item++) {
                var object = {
                    Alias: $scope.danhSachDichVu[item].aliasOfService,
                    Title: $scope.danhSachDichVu[item].title,
                    Price: $scope.danhSachDichVu[item].price,
                }
                arrayObject.push(object);
            }
            $http.post("/Manager/updateService/", arrayObject).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    toaster.pop("success", "", rs.title, 5000, "");
                    $rootScope.reloadService();
                    $scope.cancel();
                }
            });
        }
    }
    $scope.submitAdd = function () {
        if ($scope.model != undefined) {
            var arrayObject = [];
            var object = {
                Alias: $scope.model.aliasOfService,
                Title: $scope.model.title,
                Price: $scope.model.price,
            }
            arrayObject.push(object);
            $http.post("/Manager/insertService/", arrayObject).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    toaster.pop("success", "", rs.title, 5000, "");
                    $rootScope.reloadService();
                    $scope.displayAdd = !$scope.displayAdd;
                }
            });
        }
    }
    // outsite
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('quanLyThanhToan', function ($scope, $timeout, $http, $location, $uibModalInstance, $rootScope, toaster) {
    $scope.oninit = function () {
        $scope.title = "Quản lý thanh toán";
        //$scope.displayAdd = false;
        $scope.model = {};
        $rootScope.reloadService = function () {
            $http.post("/RoomAPI/getListPayLoad/").success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachThanhToan = rs.results;
                    $scope.model.selected = [];
                    $scope.model.selected.push(rs.results[0].aliasOfPayLoad);
                    var object = {
                        AliasOfRoom: $scope.danhSachThanhToan[0].aliasOfPayLoad
                    }
                    $http.post("/Manager/getDetailPayLoad/", object).success(function (rs) {
                        if (rs.error !== true) {
                            $scope.danhSachChiTietThanhToan = rs.results;
                            for (let i = 0; i < $scope.danhSachChiTietThanhToan.length; i++) {
                                if ($scope.danhSachChiTietThanhToan[i].status == 0) {
                                    $scope.danhSachChiTietThanhToan[i].startDate = (new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes());
                                    $scope.danhSachChiTietThanhToan[i].endDate = (new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes());
                                }
                            }
                        }
                    });
                }
            });
        }
        $rootScope.reloadService();
    }
    $scope.oninit();
    $scope.changeSelected = function (item) {
        if (item[0] != undefined) {
            var object = {
                AliasOfRoom: item[0]
            }
            $http.post("/Manager/getDetailPayLoad/", object).success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachChiTietThanhToan = rs.results;
                    for (let i = 0; i < $scope.danhSachChiTietThanhToan.length; i++) {
                        if ($scope.danhSachChiTietThanhToan[i].status == 0) {
                            $scope.danhSachChiTietThanhToan[i].startDate = (new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes());
                            $scope.danhSachChiTietThanhToan[i].endDate = (new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes());
                        }
                    }
                    $timeout(() => {
                        if (item[0] == "QD") {
                            clockTime();
                        }
                    }, 1);
                }
            });
        }
    }
    $scope.submit = function () {
        if ($scope.danhSachChiTietThanhToan.length > 0) {
            var arrayObject = [];
            for (let item = 0; item < $scope.danhSachChiTietThanhToan.length; item++) {
                let startDate;
                let endDate;
                if ($scope.danhSachChiTietThanhToan[item].startDate != undefined) {
                    startDate = '/Date(' + new Date(2018, 01, 01, $scope.danhSachChiTietThanhToan[item].startDate.split(':')[0], $scope.danhSachChiTietThanhToan[item].startDate.split(':')[1]).getTime() + ')/';
                    endDate = '/Date(' + new Date(2018, 01, 02, $scope.danhSachChiTietThanhToan[item].endDate.split(':')[0], $scope.danhSachChiTietThanhToan[item].endDate.split(':')[1]).getTime() + ')/';
                }
                var object = {
                    Id: $scope.danhSachChiTietThanhToan[item].id,
                    Alias: $scope.danhSachChiTietThanhToan[item].aliasOfPrice,
                    Status: $scope.danhSachChiTietThanhToan[item].status,
                    ToHours: $scope.danhSachChiTietThanhToan[item].toHours,
                    ToDay: $scope.danhSachChiTietThanhToan[item].toDay,
                    Price: $scope.danhSachChiTietThanhToan[item].price,
                    StartDate: startDate,
                    EndDate: endDate
                }
                arrayObject.push(object);
            }
            $http.post("/Manager/updatePayLoad/", arrayObject).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    toaster.pop("success", "", rs.title, 5000, "");
                    $rootScope.reloadService();
                    $scope.cancel();
                }
            });
        }
    }
    $scope.submitAdd = function () {
        if ($scope.model != undefined) {
            var arrayObject = [];
            var object = {
                Alias: $scope.model.aliasOfService,
                Title: $scope.model.title,
                Price: $scope.model.price,
            }
            arrayObject.push(object);
            $http.post("/Manager/insertService/", arrayObject).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    toaster.pop("success", "", rs.title, 5000, "");
                    $rootScope.reloadService();
                    //$scope.displayAdd = !$scope.displayAdd;
                }
            });
        }
    }
    // outsite
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
app.controller('quanLyThongKe', function ($scope, $timeout, $http, $location, $uibModal, $uibModalInstance, $rootScope, toaster) {
    $scope.oninit = function () {
        $scope.title = "Thống kê";
        //$scope.displayAdd = false;
        $scope.model = {
            startTime: new Date(),
            endTime: new Date()
        };
        $rootScope.reloadService = function () {
            $http.post("/RoomAPI/getListPayLoad/").success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachThanhToan = rs.results;
                    $scope.model.selected = [];
                    $scope.model.selected.push(rs.results[0].aliasOfPayLoad);
                    var object = {
                        AliasOfRoom: $scope.danhSachThanhToan[0].aliasOfPayLoad
                    }
                    $http.post("/Manager/getDetailPayLoad/", object).success(function (rs) {
                        if (rs.error !== true) {
                            $scope.danhSachChiTietThanhToan = rs.results;
                            for (let i = 0; i < $scope.danhSachChiTietThanhToan.length; i++) {
                                if ($scope.danhSachChiTietThanhToan[i].status == 0) {
                                    $scope.danhSachChiTietThanhToan[i].startDate = (new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes());
                                    $scope.danhSachChiTietThanhToan[i].endDate = (new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes());
                                }
                            }
                        }
                    });
                }
            });
        }
        $rootScope.reloadService();
    }
    $scope.oninit();
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
    $scope.changeSelected = function (item) {
        if (item[0] != undefined) {
            var object = {
                AliasOfRoom: item[0]
            }
            $http.post("/Manager/getDetailPayLoad/", object).success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachChiTietThanhToan = rs.results;
                    for (let i = 0; i < $scope.danhSachChiTietThanhToan.length; i++) {
                        if ($scope.danhSachChiTietThanhToan[i].status == 0) {
                            $scope.danhSachChiTietThanhToan[i].startDate = (new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].startDate).getMinutes());
                            $scope.danhSachChiTietThanhToan[i].endDate = (new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getHours()) + ':' + (new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() < 10 ? '0' + new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes() : new Date($scope.danhSachChiTietThanhToan[i].endDate).getMinutes());
                        }
                    }
                    $timeout(() => {
                        if (item[0] == "QD") {
                            clockTime();
                        }
                    }, 1);
                }
            });
        }
    }
    $scope.submit = function () {
        if ($scope.danhSachChiTietThanhToan.length > 0) {
            var objects = {
                startTime: $scope.model.startTime,
                endTime: $scope.model.endTime
            }
            $http.post("/Manager/report/", objects).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    $scope.danhSachBaoCao = rs.results;
                }
            });
        }
    }
    $scope.submitAdd = function () {
        if ($scope.model != undefined) {
            var arrayObject = [];
            var object = {
                Alias: $scope.model.aliasOfService,
                Title: $scope.model.title,
                Price: $scope.model.price,
            }
            arrayObject.push(object);
            $http.post("/Manager/insertService/", arrayObject).success(function (rs) {
                if (rs.error === true) {
                    toaster.pop("error", "", rs.title, 5000, "");
                } else {
                    toaster.pop("success", "", rs.title, 5000, "");
                    $rootScope.reloadService();
                    //$scope.displayAdd = !$scope.displayAdd;
                }
            });
        }
    }
    // outsite
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});