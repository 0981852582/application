var app = angular.module('App_ESSALE', ['ui.bootstrap', 'ngAnimate', 'ui.router', 'oc.lazyLoad', 'toaster']);
app.controller('danhSachDatPhong', function ($scope, $timeout, $http, $location, $uibModal, $rootScope, $ocLazyLoad, $state, toaster) {
    $scope.oninit = function () {
        // rootScope
        $rootScope.reload = function () {
            BlockUI({
                target: 'html',
                message: 'Đang tải...'
            });
            $http.post("/RoomAPI/getRoomGoing/").success(function (rs) {
                if (rs.error !== true) {
                    $scope.danhSachDatPhong = rs.results;
                    $timeout(() => {
                        UnBlockUI("html");
                    }, 100);
                }
            });
        }
        $rootScope.reload();
        // rootScope
        $rootScope.convertServiceInit = function (danhSachDichVu) {
            for (let item = 0; item < danhSachDichVu.length; item++) {
                if (danhSachDichVu[item].number === undefined || danhSachDichVu[item].number === '') {
                    danhSachDichVu[item].number = 0;
                }
                danhSachDichVu[item].total = parseInt(danhSachDichVu[item].number) + parseInt(danhSachDichVu[item].price);
            }
        }
        // rootScope
        $rootScope.addNumber = function (object) {
            object.number = object.number + 1;
            object.total = parseInt(object.number) * parseInt(object.price);
        }
        // rootScope
        $rootScope.SubtractionNumber = function (object) {
            if (object.number < 1) {
                return;
            }
            object.number = object.number - 1;
            object.total = parseInt(object.number) * parseInt(object.price);
        }
        // rootScope
        $rootScope.getDateNow = function () {
            return (new Date().getDay() < 10 ? '0' : '') + '' + new Date().getDay() + '/' + (new Date().getMonth() < 10 ? '0' : '') + '' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + (new Date().getHours() < 10 ? '0' : '') + '' + new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' : '') + '' + new Date().getMinutes();
            //return "/Date(" + new Date().getTime() + ")/";
        }
    }
    $scope.oninit();

    $scope.redirectModal = function (parameter) {
        if (parameter.status === false) {
            $timeout(function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '../../lib/jscontroller/home/detail.html',
                    controller: 'themMoiDatPhong',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        parameter: function () {
                            return parameter;
                        }
                    }
                });
            }, 1);
        } else {
            $timeout(function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '../../lib/jscontroller/home/detail.html',
                    controller: 'capNhatDatPhong',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        parameter: function () {
                            return parameter;
                        }
                    }
                });
            }, 1);
        }
    }
});
app.controller('themMoiDatPhong', function ($scope, $timeout, $http, $location, $uibModalInstance, parameter, $rootScope, toaster) {
    $scope.oninit = function () {
        $scope.title = parameter.title;
        $scope.model = parameter;
        $scope.isAdd = true;
        $scope.model.startTime = new Date();
        $http.post("/RoomAPI/getRoomService/").success(function (rs) {
            if (rs.error !== true) {
                $scope.danhSachDichVu = rs.results;
                // convert dịch vụ trước khi sử dụng
                $scope.convertServiceInit($scope.danhSachDichVu);
                console.log(rs.title);
                $http.post("/RoomAPI/getListPayLoad/").success(function (rs) {
                    if (rs.error !== true) {
                        $scope.danhSachThanhToan = rs.results;
                        if ($scope.danhSachThanhToan.length > 0)
                            $scope.danhSachThanhToan[0].status = true;
                        console.log(rs.title);

                    }
                });
            }
        });
        $rootScope.selected = function (doiTuong, danhSachThanhToan) {
            $timeout(() => {
                for (let item = 0; item < danhSachThanhToan.length; item++) {
                    if (danhSachThanhToan[item].id != doiTuong.id) {
                        danhSachThanhToan[item].status = false;
                    } else {
                        danhSachThanhToan[item].status = true;
                    }
                }
            }, 1);
        }
    }
    $scope.oninit();
    // Tinh Lai Tien
    $scope.submitRollback = function () {
        
        Comfirm("<font class='label-custom' style='opacity: 1;'>Bạn có chắc chắn muốn tính lại tiền ?</font>", function (rs) {
            if (rs) {
                var object = {
                    AliasOfRoom: $scope.model.alias
                }
                $http.post("/RoomAPI/RollBackRoomGoing/", object).success(function (rs) {
                    if (rs.error == true) {
                        toaster.pop("error", "", rs.title, 5000, "");
                    } else {
                        toaster.pop("success", "", rs.title, 5000, "");
                        $rootScope.reload();
                        $scope.cancel();
                    }
                });
            }
        });
        
    }
    $scope.submit = function () {
        var object = {
            Alias: $scope.model.alias,
            StartTime: $scope.model.startTime,
            listOfService: JSON.stringify($scope.danhSachDichVu),
            AliasOfPayLoad: $scope.danhSachThanhToan.find(x => x.status == true).aliasOfPayLoad,
            CreatedBy: 'Trương Quốc Trọng',
            ModifiedBy: 'Trương Quốc Trọng'
        }
        $http.post("/RoomAPI/InsertRoomGoing/", object).success(function (rs) {
            if (rs.error == true) {
                toaster.pop("error", "", rs.title, 5000, "");
            } else {
                toaster.pop("success", "", rs.title, 5000, "");
                $rootScope.reload();
                $scope.cancel();
            }
        });
    }
    // outsite
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.$watch("danhSachDichVu", function (newvalue, oldvalue) {
        if (newvalue != undefined) {
            $timeout(() => {
                $scope.totalService = 0;
                for (let item = 0; item < newvalue.length; item++) {
                    newvalue[item].totalPriceOfSecond = parseInt(newvalue[item].number) * parseInt(newvalue[item].price);
                    $scope.totalService += newvalue[item].totalPriceOfSecond;
                }
            }, 1);
        }
    }, true);
    $scope.$watch("totalService", function (newvalue, oldvalue) {
        if (newvalue != undefined && $scope.model.caculatorPrice != undefined) {
            $scope.totalPrice = parseFloat(newvalue) + parseFloat($scope.model.caculatorPrice);
        }
    }, true);
    $scope.$watch("model.caculatorPrice", function (newvalue, oldvalue) {
        if (newvalue != undefined && $scope.totalService != undefined) {
            $scope.totalPrice = parseFloat(newvalue) + parseFloat($scope.totalService);
        }
    }, true);
});
app.controller('capNhatDatPhong', function ($scope, $timeout, $http, $location, $uibModalInstance, parameter, $rootScope, toaster) {
    $scope.oninit = function () {
        $scope.title = parameter.title;
        $scope.model = parameter;
        $scope.isUpdate = true;
        $http.post("/RoomAPI/getRoomService/").success(function (rs) {
            if (rs.error !== true) {
                $scope.danhSachDichVu = rs.results;
                // convert dịch vụ trước khi sử dụng
                $scope.convertServiceInit($scope.danhSachDichVu);
                console.log(rs.title);
                $http.post("/RoomAPI/getListPayLoad/").success(function (rs) {
                    if (rs.error !== true) {
                        $scope.danhSachThanhToan = rs.results;
                        if ($scope.danhSachThanhToan.length > 0)
                            $scope.danhSachThanhToan[0].status = true;
                        console.log(rs.title);

                    }
                    $scope.reload(object);
                });
            }
        });
        debugger;
        var object = {
            Alias: parameter.alias,
            AliasOfPayLoad: parameter.aliasOfPayLoad
        }
        $scope.reload = function (object) {
            $http.post("/RoomAPI/getRoomDetailGoing/", object).success(function (rs) {
                if (rs.error === true) {

                } else {
                    $scope.model = rs.results;
                    if ($scope.model.listOfService != undefined) {
                        try {
                            var convertJSON = JSON.parse($scope.model.listOfService);
                            for (let item = 0; item < convertJSON.length; item++) {
                                var check = $scope.danhSachDichVu.find(x => x.aliasOfService === convertJSON[item].aliasOfService);
                                if (check != undefined) {
                                    check.number = convertJSON[item].number;
                                }
                            }
                        } catch (ex) {

                        }
                    }
                    $scope.model.startTime = "/Date(" + new Date($scope.model.startTime).getTime() + ")/";
                    for (let item = 0; item < $scope.danhSachThanhToan.length; item++) {
                        if ($scope.danhSachThanhToan[item].aliasOfPayLoad === $scope.model.aliasOfPayLoad) {
                            $scope.danhSachThanhToan[item].status = true;
                        } else {
                            $scope.danhSachThanhToan[item].status = false;
                        }
                    }

                }
            });
        }
        $rootScope.selected = function (doiTuong, danhSachThanhToan) {
            $timeout(() => {
                var index = "TG";
                for (let item = 0; item < danhSachThanhToan.length; item++) {
                    if (danhSachThanhToan[item].id != doiTuong.id) {
                        danhSachThanhToan[item].status = false;
                    } else {
                        danhSachThanhToan[item].status = true;
                        index = danhSachThanhToan[item].aliasOfPayLoad;
                    }
                }
                debugger;
                object.AliasOfPayLoad = index;
                $http.post("/RoomAPI/getRoomDetailGoing/", object).success(function (rs) {
                    if (rs.error === true) {

                    } else {
                        $scope.model = rs.results;
                    }
                });
            }, 1);
        }
    }
    $scope.oninit();

    // THANH TOAN
    $scope.submitPayLoad = function () {
        var object = {
            AliasOfRoom: $scope.model.alias,
            AliasOfPayLoad: $scope.model.aliasOfPayLoad,
            PriceOfRoom: $scope.model.caculatorPrice,
            PriceOfService: $scope.totalService,
            StartTime: $scope.model.startTime,
            ListOfService: JSON.stringify($scope.danhSachDichVu),
            CreatedBy: "Admin",
            ModifiedBy: "Admin"
        }
        $http.post("/RoomAPI/UpdatePayLoad/", object).success(function (rs) {
            if (rs.error === true) {
                toaster.pop("error", "", rs.title, 5000, "");
            } else {
                toaster.pop("success", "", rs.title, 5000, "");
                $rootScope.reload();
                $scope.cancel();
            }
        });
    }
    // HUY PHONG
    $scope.submitDestroy = function () {

        Comfirm("<font class='label-custom' style='opacity: 1;'>Bạn có chắc chắn muốn hủy phòng ?</font>", function (rs) {
            if (rs) {
                var object = {
                    Id: $scope.model.id,
                    AliasOfRoom: $scope.model.alias
                }
                $http.post("/RoomAPI/DestroyRoomGoing/", object).success(function (rs) {
                    if (rs.error === true) {
                        toaster.pop("error", "", rs.title, 5000, "");
                    } else {
                        toaster.pop("success", "", rs.title, 5000, "");
                        $rootScope.reload();
                        $scope.cancel();
                    }
                });
            }
        });
    }
    $scope.submit = function () {
        var object = {
            Id: $scope.model.id,
            Alias: $scope.model.alias,
            StartTime: $scope.model.startTime,
            listOfService: JSON.stringify($scope.danhSachDichVu),
            AliasOfPayLoad: $scope.danhSachThanhToan.find(x => x.status == true).aliasOfPayLoad,
            CreatedBy: 'Trương Quốc Trọng',
            ModifiedBy: 'Trương Quốc Trọng'
        }
        BlockUI({
            target: 'html',
            message: 'Đang tải...'
        });
        $http.post("/RoomAPI/UpdateRoomGoing/", object).success(function (rs) {
            if (rs.error === true) {
                $timeout(() => {
                    UnBlockUI("html");
                }, 1);
                toaster.pop("error", "", rs.title, 5000, "");
            } else {
                toaster.pop("success", "", rs.title, 5000, "");
                $rootScope.reload();
                $scope.cancel();


            }
        });
    }
    // outsite
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.$watch("danhSachDichVu", function (newvalue, oldvalue) {
        if (newvalue != undefined) {
            $timeout(() => {
                $scope.totalService = 0;
                for (let item = 0; item < newvalue.length; item++) {
                    newvalue[item].totalPriceOfSecond = parseInt(newvalue[item].number) * parseInt(newvalue[item].price);
                    $scope.totalService += newvalue[item].totalPriceOfSecond;
                }
            }, 1);
        }
    }, true);
    $scope.$watch("totalService", function (newvalue, oldvalue) {
        if (newvalue != undefined && $scope.model.caculatorPrice != undefined) {
            $scope.totalPrice = parseFloat(newvalue) + parseFloat($scope.model.caculatorPrice);
        }
    }, true);
    $scope.$watch("model.caculatorPrice", function (newvalue, oldvalue) {
        if (newvalue != undefined && $scope.totalService != undefined) {
            $scope.totalPrice = parseFloat(newvalue) + parseFloat($scope.totalService);
        }
    }, true);
});
