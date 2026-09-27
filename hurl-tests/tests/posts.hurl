# Posts API HTTP Testleri

# Tüm postları listele
GET https://jsonplaceholder.typicode.com/posts
HTTP 200
[Asserts]
header "Content-Type" contains "application/json"
jsonpath "$.length" == 100
jsonpath "$[0].id" == 1
jsonpath "$[0].userId" isInteger
jsonpath "$[0].title" isString
jsonpath "$[0].body" isString

# Tek post getir
GET https://jsonplaceholder.typicode.com/posts/1
HTTP 200
[Asserts]
jsonpath "$.id" == 1
jsonpath "$.userId" == 1
jsonpath "$.title" isString
jsonpath "$.body" isString

# Belirli kullanıcının postları
GET https://jsonplaceholder.typicode.com/posts?userId=1
HTTP 200
[Asserts]
jsonpath "$.length" == 10

# Yeni post oluştur
POST https://jsonplaceholder.typicode.com/posts
Content-Type: application/json
{
  "title": "Hurl Test Başlığı",
  "body": "Hurl ile oluşturulan test içeriği",
  "userId": 1
}
HTTP 201
[Asserts]
jsonpath "$.id" isInteger
jsonpath "$.title" == "Hurl Test Başlığı"
jsonpath "$.userId" == 1

# Post güncelle
PUT https://jsonplaceholder.typicode.com/posts/1
Content-Type: application/json
{
  "id": 1,
  "title": "Güncellenmiş Başlık",
  "body": "Güncellenmiş içerik",
  "userId": 1
}
HTTP 200
[Asserts]
jsonpath "$.id" == 1
jsonpath "$.title" == "Güncellenmiş Başlık"

# Post sil
DELETE https://jsonplaceholder.typicode.com/posts/1
HTTP 200
