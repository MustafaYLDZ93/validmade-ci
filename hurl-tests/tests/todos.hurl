# Todos API HTTP Testleri

# Tüm todo'ları listele
GET https://jsonplaceholder.typicode.com/todos
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.length" == 200
jsonpath "$[0].userId" isInteger
jsonpath "$[0].id" == 1
jsonpath "$[0].title" isString
jsonpath "$[0].completed" isBoolean

# Tek todo getir
GET https://jsonplaceholder.typicode.com/todos/1
HTTP 200
[Asserts]
jsonpath "$.id" == 1
jsonpath "$.userId" == 1
jsonpath "$.completed" == false

# Tamamlanmış todo'ları filtrele
GET https://jsonplaceholder.typicode.com/todos?completed=true
HTTP 200
[Asserts]
jsonpath "$.length" > 0

# Belirli kullanıcının todo'ları
GET https://jsonplaceholder.typicode.com/todos?userId=1
HTTP 200
[Asserts]
jsonpath "$.length" == 20

# Yeni todo oluştur
POST https://jsonplaceholder.typicode.com/todos
Content-Type: application/json
{
  "title": "Hurl ile todo testi",
  "completed": false,
  "userId": 1
}
HTTP 201
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.title" == "Hurl ile todo testi"
jsonpath "$.completed" == false
