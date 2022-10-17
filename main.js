let productAPI = "https://63379dcf132b46ee0be3304d.mockapi.io/api/products";

var app = angular.module("demo_product", []);
app.controller("myctrl", function ($scope, $http) {

  $scope.viTriHienTai = -1;
  $scope.product = {
    id: "",
    ten: "",
    so_luong: "",
    gia_nhap: "",
    gia_ban: "",
    mieu_ta: "",
  };
  $scope.products = [];
  $http
    .get(productAPI)
    .then(function (data) {
      $scope.products = data.data;
    })
    .catch(function (e) {
      console.log(e);
    });

  $scope.onFormSubmit = function (event) {
    event.preventDefault();
    if($scope.viTriHienTai == -1){
      $http
      .post(productAPI, $scope.product)
      .then(function () {
        $scope.products.push($scope.product)
      })
      .catch(function (e) {
        console.log(e);
      });
    }else{
      var id = $scope.products[$scope.viTriHienTai].id;
    $http
      .put(productAPI + "/" + id, $scope.product)
      .then(function () {
        $scope.viTriHienTai = -1;
        $scope.products.splice($scope.viTriHienTai, 1, $scope.product)
      })
      .catch(function (e) {
        console.log(e);
      });
    }
    
  };

  $scope.selectProduct = function ( index) {
    var id =  $scope.products[index].id;
    $scope.viTriHienTai = index
    $http
      .get(productAPI + "/" + id)
      .then(function (data) {
        $scope.product = data.data
      })
      .catch(function (e) {
        console.log(e);
      });
  };

  $scope.delete = function (index) {
    var id = $scope.products[index].id;
    $http
      .delete(productAPI + "/" + id)
      .then(function () {
        $scope.products.splice(index, 1)
      })
      .catch(function (e) {
        console.log(e);
      });
  };
});
