# Users API HTTP Testleri

# Tüm kullanıcıları listele
GET https://jsonplaceholder.typicode.com/users
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.length" == 10
jsonpath "$[0].id" == 1
jsonpath "$[0].name" isString
jsonpath "$[0].email" isString
jsonpath "$[0].address" isCollection
jsonpath "$[0].company" isCollection

# Tek kullanıcı getir
GET https://jsonplaceholder.typicode.com/users/1
HTTP 200
[Asserts]
jsonpath "$.id" == 1
jsonpath "$.name" == "Leanne Graham"
jsonpath "$.username" == "Bret"
jsonpath "$.email" matches ".*@.*"
jsonpath "$.address.city" isString
jsonpath "$.address.geo.lat" isString
jsonpath "$.company.name" isString

# Kullanıcının postları
GET https://jsonplaceholder.typicode.com/users/1/posts
HTTP 200
[Asserts]
jsonpath "$.length" == 10

# Kullanıcının album'leri
GET https://jsonplaceholder.typicode.com/users/1/albums
HTTP 200
[Asserts]
jsonpath "$.length" == 10

# Varolmayan kullanıcı - 404 beklenir
GET https://jsonplaceholder.typicode.com/users/9999
HTTP 404
