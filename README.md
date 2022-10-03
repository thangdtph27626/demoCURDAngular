# thực hiện CRUD trong angularjs with mockAPI

## AngularJS là gì?

AngularJS là một khung phát triển front end mã nguồn mở triển khai kiến trúc MVVM (Model-View-ViewModel). AngularJS dựa trên JavaScript. Nó được duy trì bởi Google và được cho là một trong những khuôn khổ phổ biến nhất. Điều này chủ yếu là do nó nhận được sự hỗ trợ tuyệt đối từ Google và kết hợp các xu hướng thị trường mới nhất. AngularJS chủ yếu được sử dụng để phát triển các ứng dụng một trang hoặc các SPA.

## thực hiện CURD with angularjs

### b1 tạo api:

bạn có thể tạo api [tại đây](https://mockapi.io/)

vd: \
bảng product gồm các thông tin: mã, tên, số lượng, giá bán, giá nhập, miêu tả \
sau khi bạn tạo api sẽ có đường dẫn api sau: https://63379dcf132b46ee0be3304d.mockapi.io/api/products


> các API thao tác 

 <table>
                    <thead>
                        <th>method</th>
                        <th>url</th>
                        <th>code</th>
                        <th>respone</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>GET</td>
                            <td>/products</td>
                            <td>200</td>
                            <td>List</td>
                        </tr>
                        <tr>
                            <td>GET</td>
                            <td>/products/:id</td>
                            <td>200</td>
                            <td>products</td>
                        </tr>
                        <tr>
                            <td>POST</td>
                            <td>/products</td>
                            <td>201</td>
                            <td>products</td>
                        </tr>
                        <tr>
                            <td>PUT</td>
                            <td>/products/:id</td>
                            <td>200</td>
                            <td>products</td>
                        </tr>
                        <tr>
                            <td>DELETE</td>
                            <td>/products/:id</td>
                            <td>200</td>
                            <td>products</td>
                        </tr>
          </tbody>
</table>


### b2: tạo file html


index.html

> lưu ý:

- Thêm tập lệnh dưới đây vào bên trong thẻ <> của tệp html. Đó là liên kết CDN sẽ giúp bắt đầu với Angular.\
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
- Tạo tệp main.js trong cùng một thư mục và tham chiếu tệp đó bằng thẻ script:
  <script src="main.js" type="text/javascript"></script> \
  
 
  ```md
<body ng-app="demo_product">
    <div ng-controller="myctrl">
        <div class="m-portlet">
            <div class="m-portlet">

                <!-- begin thêm mới product-->
                <form id="form_create_product" ng-submit="onFormSubmit($event)" class="col-8 offset-2">
                    <div class="modal-header">
                    </div>
                    <div><input type="text" value="{{product.id}}" ng-model="product.id" style="display: none;"></div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="col-form-label">Tên sản phẩm</label>
                            <input type="text" class="form-control" id="ten" ng-model="product.ten" value="{{product.ten}}">
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">số lượng</label>
                            <input type="text" class="form-control" id="soLuong" ng-model="product.so_luong" value="{{product.so_luong}}">
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">giá nhập</label>
                            <input type="text" class="form-control" id="giaNhap" ng-model="product.gia_nhap" value="{{product.gia_nhap}}">
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">giá bán</label>
                            <input type="text" class="form-control" id="giaBan" ng-model="product.gia_ban" value="{{product.gia_ban}}">
                        </div>
                        <div class="form-group">
                            <label class="col-form-label">mô tả</label>
                            <textarea id="my-textarea" class="form-control" name="" rows="3" id="moTa"
                                ng-model="product.mieu_ta" aria-valuetext="{{product.mieu_ta}}"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                    
                        <button type="submit" class="btn btn-primary">thêm 
                        </button>
                        <button type="submit" class="btn btn-primary" ng-click="edit($index)"> sửa
                        </button>
                    </div>
                </form>
                <!-- end Thêm Mới product-->

                <!-- begin hiển thị thông tin product -->
                <div>
                    <table id="custom-table" class="table table-bordered m-table d-sm-table m-table--head-bg-primary">
                        <thead>
                            <tr>
                                <td>mã </td>
                                <td>tên</td>
                                <td>số lượng</td>
                                <td>giá nhập </td>
                                <td>giá bán</td>
                                <td>miêu tả</td>
                                <td>edit</td>
                                <td>delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="product in products">
                                <td>{{product.id}}</td>
                                <td>{{product.ten}}</td>
                                <td>{{product.so_luong}}</td>
                                <td>{{product.gia_nhap}}</td>
                                <td>{{product.gia_ban}}</td>
                                <td>{{product.mieu_ta}}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" ng-click="selectProduct(product)">
                                        Sửa
                                    </button>
                                </td>

                                <td> <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                        ng-click="delete(product)">
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <script src="main.js" type="text/javascript"></script>
</body>
  
```
  
  
### b3: hiển thị thông tin product lên màn hình
  
  
```md
  // đường dẫn api khởi tạo ở bước 1
  let productAPI = "https://63379dcf132b46ee0be3304d.mockapi.io/api/products"
  
  var app = angular.module("demo_product", []);
app.controller("myctrl",function($scope, $http, $window){
  // khởi tạo product
    $scope.product = {
        id:"",
        ten:"",
        so_luong:"",
        gia_nhap:"",
        gia_ban:"",
        mieu_ta:""
    }
  // khởi tạo một mảng để chứa các thông tin của product
$scope.products = []
$http.get(productAPI)
.then(function(data){$scope.products = data.data})
.catch(function(e){
    console.log(e)
})
```
  
  
> lưu ý: 
  
  $http.get(url).then().catch() là viết tắt của $http({method : "GET", url : url}).then().catch()
  
  
### 4: thêm mới products
  
  
  ```
  
  $scope.onFormSubmit= function(event){
    event.preventDefault()
    $http.post(productAPI, $scope.product)
    .then(function(){$window.location.reload()})
    .catch(function(e){console.log(e)})}
  
  ```
 
### 5: update sản phẩm
  
  ```
  
 // lấy thông tin của product
// item là đối tượng truyền vào
  $scope.selectProduct = function(item){
        var id = item.id;
        $http.get(productAPI+"/"+id)
        .then(function(data){$scope.product = data.data
        console.log(data)})
        .catch(function(e){console.log(e)})
    }

// thực hiên update 
$scope.edit = function(){
    var id = $scope.product.id
        $http.put(productAPI+"/"+id, $scope.product)
        .then(function(){$window.location.reload()})
        .catch(function(e){console.log(e)})}
  ```

### 5: delete 
  
  ```
  $scope.delete = function(item){

    var id = item.id;
    $http.delete(productAPI+"/"+ id)
    .then(function(){
        $window.location.reload()
    })
    .catch(function(e){console.log(e)})}
})

  
  ```
