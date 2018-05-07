var app = angular.module("App_Hotel", ['ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'toaster', 'ui.select', 'angularjs-datetime-picker']);
app.controller("Ctrl_Hotel", function ($scope, $state, $rootScope, $http, $timeout) {
    $rootScope.fgh = 0;
});
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("");

    $stateProvider.state('Product', {
        url: "/Product",
        templateUrl: "AdminSanPham/Index",
        controller: "SanPhamController",
        data: { Title: "ABC" },
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/sanpham.js'
                    ]
                });
            }]
        }
    }).state('IEProduct', {
        url: "/IEProduct",
        templateUrl: "AdminSanPham/IESanPham",
        controller: "IESanPhamController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/IEsanpham.js',
                    ]
                });
            }]
        }
    }).state('TKProduct', {
        url: "/TKProduct",
        templateUrl: "AdminSanPham/TKIndex",
        controller: "TKSanPhamController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/TKsanpham.js',
                    ]
                });
            }]
        }
    }).state('NhaCC', {
        url: "/NhaCC",
        templateUrl: "NhaCC/Index",
        controller: "NhaCCController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/NhaCC.js',
                    ]
                });
            }]
        }
    }).state('ChungLoai', {
        url: "/ChungLoai",
        templateUrl: "ChungLoai/Index",
        //data: { pageTitle: data },
        controller: "ChungLoaiController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/ChungLoai.js',
                    ]
                });
            }]
        }
    }).state('Quyen', {
        url: "/Quyen",
        templateUrl: "Quyen/Index",
        //data: { pageTitle: data },
        controller: "QuyenController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/Quyen.js',
                    ]
                });
            }]
        }
    }).state('TaiKhoan', {
        url: "/TaiKhoan",
        templateUrl: "TaiKhoan/Index",
        //data: { pageTitle: data },
        controller: "TaiKhoanController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/TaiKhoan.js',
                    ]
                });
            }]
        }
    }).state('DatHang', {
        url: "/DatHang",
        templateUrl: "DatHang/Index",
        controller: "DatHangController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/DatHang.js',
                    ]
                });
            }]
        }
    }).state('TKMonney', {
        url: "/TKMonney",
        templateUrl: "ThongKeDoanhThu/Index",
        controller: "ThongKeDoanhThuController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/ThongKeDoanhThu.js',
                    ]
                });
            }]
        }
    }).state('ThongTinTaiKhoan', {
        url: "/ThongTinTaiKhoan",
        templateUrl: "ThongTinTaiKhoan/IndexAdmin",
        controller: "Ctrl_THONGTINTAIKHOAN",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'lazyLoadApp',
                    files: [
                        '../../Content/custom/ThongTinTaiKhoanAdmin.js',
                    ]
                });
            }]
        }
    })

}]);