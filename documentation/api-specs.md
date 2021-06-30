# API Design:-

## Routes:-

<ol>
<li><b>Get all items in a category(eg:-get all books)</b></li>
GET https://best-read.herokuapp.com/api/items/:category<br>
<a href='https://best-read.herokuapp.com/api/items/books'>https://best-read.herokuapp.com/api/items/books</a> <br>
(/api/items/books)<br>
(/api/items/laptop)<br>
[{
	"id": "xyz...",<br>
  "title":"abc",<br>
  "author":"abc-xyz",<br>
  "overview":"Sample overview of the book",<br>
  "thumbnail": "https://avatars.aljsl.com/",<br>
  "averageRating":8.3,<br>
  "totalRating":333,<br>
  "category":"book",<br>
  "subCategory":"business",<br>
}, {<br>
	"id": "xyz...",<br>
  "title":"abc",<br> 
  "author":"abc-xyz",<br>
  "overview":"Sample overview of the book",<br>
  "thumbnail": "https://avatars.aljsl.com/",<br>
  "averageRating":8.3,<br>
  "totalRating":333,<br>
  "category":"book",<br>
  "subCategory":"business",<br>
}]<br><br>
Status: 200
<br><br>

<li><b>Get all items</b></li>
<a href='https://best-read.herokuapp.com/api/items'>GET https://best-read.herokuapp.com/api/items</a> <br>
(/api/items/)<br>
[{
	"id": "xyz...",<br>
  "title":"abc",<br>
  "author":"abc-xyz",<br>
  "overview":"Sample overview of the book",<br>
  "thumbnail": "https://avatars.aljsl.com/",<br>
  "averageRating":8.3,<br>
  "totalRating":333,<br>
  "category":"anyting",<br>
  "subCategory":"business",<br>
}, {<br>
	"id": "xyz...",<br>
  "title":"abc",<br> 
  "author":"abc-xyz",<br>
  "overview":"Sample overview of the book",<br>
  "thumbnail": "https://avatars.aljsl.com/",<br>
  "averageRating":8.3,<br>
  "totalRating":333,<br>
  "category":"anything",<br>
}]<br><br>
Status: 200
<br><br>

<li><b>Get reviews for a particular product:-</b></li>
<a href=''>GET /api/items/:itemId/reviews</a> <br>
(/api/items/99/review)<br>
[<br>
{<br>
  "user_id":"xyz",<br>
  "firstName":"abc",<br>
  "lastName":"xyz",<br>
  "avatarUrl":"xyz.abc",<br>
  "book_id":"12121",<br>
  "rating":5,<br>
  "review":"Lorem Ipsum is simply dummy text of the printing and <br>typesetting industry. Lorem Ipsum has been the industry's standard <br>dummy text ever since the 1500",<br>

},<br>
{<br>
"user_id":"xyz",<br>
"firstName":"abc",<br>
"lastName":"xyz",<br>
"avatarUrl":"xyz.abc",<br>
"book_id":"12121",<br>
"rating":5,<br>
"review":"Lorem Ipsum is simply dummy text of the printing and <br>typesetting industry. Lorem Ipsum has been the industry's standard <br>dummy text ever since the 1500",<br>
}]
<br><br>
Status: 200
<br><br>

<li><b>Post a review:-</b></li>
<a href=''>POST api/items/:itemId/reviews</a> <br>
(/api/items/44/review)<br>
{
  "user_id":"xyz",<br>
  "firstName":"abc",<br>
  "lastName":"xyz",<br>
  "avatarUrl":"xyz.abc",<br>
  "rating":5,<br>
  "review":"Lorem Ipsum is simply dummy text of the printing and <br>typesetting industry. Lorem Ipsum has been the industry's standard <br>dummy text ever since the 1500",<br>

}
<br><br>
Status: 201 (review created), 400 ( itemId is invalid)
<br><br>

<li><b>EDIT a review and rating:-</b></li>
<a href=''>PUT /api/items/:itemId/reviews</a> <br>
(/api/items/22/99)<br>
(Edit the review and rating where item with itemId=22 and userId=99)<br>
{<br>
  "rating":5,<br>
  "review":"Lorem Ipsum is simply dummy text of the printing and <br>typesetting industry. Lorem Ipsum has been the industry's standard <br>dummy text ever since the 1500",<br>

}
<br><br>
Status: 200
<br><br>

<li><b>Delete a review:-</b></li>
<a href=''>Delete /api/items/:itemId/review</a> <br>
(/api/items/review/99/22)<br>
<br>
Status: 204 (Deleted)<br>
</ol>
