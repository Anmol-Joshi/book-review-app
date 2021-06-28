# API Design:-

## Routes:-

<ol>
<li>Get all items in a category(eg:-get all books)</li>
GET /items/:category <br>
(/items/books)
[{
	"id": "xyz...",  
  "title":"abc",    
  "author":"abc-xyz",  
  "overview":"Sample overview of the book",  
  "thumbnail": "https://avatars.aljsl.com/",  
  "averageRating":8.3,  
  "totalRating":333,  
  "category":"book",  
  "subCategory":"business",  
}, {
	"id": "xyz...",  
  "title":"abc",  
  "author":"abc-xyz",  
  "overview":"Sample overview of the book",  
  "thumbnail": "https://avatars.aljsl.com/",  
  "averageRating":8.3,  
  "totalRating":333,  
  "category":"book",  
  "subCategory":"business",  
}]
Status: 200

<li>Get all items in a category(eg:-get all books)</li>
GET /items/:category
(/items/books)

<li>Post all items in a category(eg:-get all books)</li>
GET /items/:category
(/items/books)

<li>Put all items in a category(eg:-get all books)</li>
GET /items/:category
(/items/books)

<li>Delete all items in a category(eg:-get all books)</li>
GET /items/:category
(/items/books)
</ol>
