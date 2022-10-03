let productAPI = "https://63379dcf132b46ee0be3304d.mockapi.io/api/products"

var app = angular.module("demo_product", []);
app.controller("myctrl",function($scope, $http, $window){
    $scope.product = {
        id:"",
        ten:"",
        so_luong:"",
        gia_nhap:"",
        gia_ban:"",
        mieu_ta:""
    }
$scope.products = []
$http.get(productAPI)
.then(function(data){$scope.products = data.data})
.catch(function(e){
    console.log(e)
})

$scope.onFormSubmit= function(event){
    event.preventDefault()
    $http.post(productAPI, $scope.product)
    .then(function(){$window.location.reload()})
    .catch(function(e){console.log(e)})}

    $scope.selectProduct = function(item){
        var id = item.id;
        $http.get(productAPI+"/"+id)
        .then(function(data){$scope.product = data.data
        console.log(data)})
        .catch(function(e){console.log(e)})
    }


$scope.edit = function(){
    var id = $scope.product.id
        $http.put(productAPI+"/"+id, $scope.product)
        .then(function(){$window.location.reload()})
        .catch(function(e){console.log(e)})}

$scope.delete = function(item){

    var id = item.id;
    $http.delete(productAPI+"/"+ id)
    .then(function(){
        $window.location.reload()
    })
    .catch(function(e){console.log(e)})}
})
