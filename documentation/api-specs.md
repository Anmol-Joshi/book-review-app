# API Design:-

# Routes:-

## Cart:-

```js
GET /api/cart/

Sample Response Body:
[
{
      itemId: itemId,
      quantity: quantity,
      title: title,
      author: author,
      description: description,
      pages: pages,
      publishDate: publishDate,
      image: image,
      category: category,
      ratingSum: ratingSum,
      totalRatings: totalRatings,
      price: price,
    }
]

Sample Response Body:
Status: 200
{
    "result": "No cart"
}
```

```js
POST api/cart/
Sample Response Body:
{
      itemId: itemId,
      quantity: quantity,
      title: title,
      author: author,
      description: description,
      pages: pages,
      publishDate: publishDate,
      image: image,
      category: category,
      ratingSum: ratingSum,
      totalRatings: totalRatings,
      price: price,
}

Sample Response Body:
Status: 200
{
   message: 'Item added to cart successfully'
}

Sample Response Body:
Status: 400
{
   error: 'CartItems not present in request'
}
```

```js
DELETE api/cart/

Sample Response Body:
{
      itemId: itemId,
}
Status: 201
```

## Item:-

```js
GET /api/items/

Sample Response Body:
[
  {
    _id:_id,
    title:title,
    ratingSum:ratingSum,
    totalRatings:totalRatings,
    image:image,
    price:price,
    author:author
  }
]
Status: 200

Sample Response Body:
Status: 200
{
    "result": "No item found"
}
```

```js
GET /api/items/:itemId
    https://best-read.herokuapp.com/api/items/60db2d1eab6fbca8549f6371

Sample Response Body:

{
    "createdAt": "2021-09-25T13:32:05.361Z",
    "updatedAt": "2021-09-25T13:32:05.361Z",
    "_id": "60db2d1eab6fbca8549f6371",
    "title": "The Power of Habit : Why We Do What We Do, and How to Change",
    "author": "Charles Duhigg",
    "description": "A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life. She has quit smoking, run a marathon, and been promoted a...",
    "pages": 375,
    "publishDate": "Published February 28th 2012 by Random House",
    "category": "books",
    "ratingSum": 12,
    "totalRatings": 3,
    "price": 20000
}

Status: 200

Sample Response Body:

Status: 404
{
   result: 'Item with requested itemId was not found'
}
```

## Review:-

```js
GET /api/items/:itemId/reviews
    https://best-read.herokuapp.com/api/items/60db2d1eab6fbca8549f6371/reviews
Sample Response Body:
[
    {
        "createdAt": "2021-09-30T12:46:22.595Z",
        "updatedAt": "2021-09-30T12:46:22.595Z",
        "_id": "6155d64ce30cbadc90f11f4d",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "6155d605e30cbadc90f11f4a",
        "rating": 5,
        "review": "Good",
        "firstName": "Anmol",
        "lastName": "Joshi",
        "__v": 0
    },
    {
        "createdAt": "2021-10-17T11:22:00.767Z",
        "updatedAt": "2021-10-17T11:22:00.767Z",
        "_id": "616c0dcbc071210330a781f1",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "61587248fd9207001653d080",
        "rating": 5,
        "review": "test review",
        "firstName": "abc",
        "lastName": "def",
        "__v": 0
    },
    {
        "createdAt": "2021-11-01T16:54:29.949Z",
        "updatedAt": "2021-11-01T16:54:29.949Z",
        "_id": "61801c8bad35b90016d9d02a",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "61800c56fdf3e676838f5ebb",
        "rating": 2,
        "review": "222",
        "firstName": "Test",
        "lastName": "User",
        "__v": 0
    }
]
Status: 200

```

```js
DELETE /api/items/:itemId/reviews
      https://best-read.herokuapp.com/api/items/60db2d1eab6fbca8549f6371/reviews
Sample Response Body:

Status: 204//Successfully deleted the review

Sample Response Body:

Status: 400
{
   error: 'Not logged in'
}

```

```js
POST /api/items/:itemId/reviews
    https://best-read.herokuapp.com/api/items/60db2d1eab6fbca8549f6371/reviews
Sample Request Body:
[
   {
    "firstName":"test",
    "lastName":"user",
    "rating":5,
    "review":"test rating"
  }
]
Sample Response Body:

{
  "Update/Insert successful"
}
Status: 200

Sample Response Body:

Status: 400
{
   error: 'Not logged in'
}
```

## Order:-

```js
GET /api/orders/:itemId/reviews
    https://best-read.herokuapp.com/api/items/60db2d1eab6fbca8549f6371/reviews
Sample Response Body:
[
    {
        "createdAt": "2021-09-30T12:46:22.595Z",
        "updatedAt": "2021-09-30T12:46:22.595Z",
        "_id": "6155d64ce30cbadc90f11f4d",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "6155d605e30cbadc90f11f4a",
        "rating": 5,
        "review": "Good",
        "firstName": "Anmol",
        "lastName": "Joshi",
        "__v": 0
    },
    {
        "createdAt": "2021-10-17T11:22:00.767Z",
        "updatedAt": "2021-10-17T11:22:00.767Z",
        "_id": "616c0dcbc071210330a781f1",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "61587248fd9207001653d080",
        "rating": 5,
        "review": "test review",
        "firstName": "abc",
        "lastName": "def",
        "__v": 0
    },
    {
        "createdAt": "2021-11-01T16:54:29.949Z",
        "updatedAt": "2021-11-01T16:54:29.949Z",
        "_id": "61801c8bad35b90016d9d02a",
        "itemId": "60db2d1eab6fbca8549f6371",
        "userId": "61800c56fdf3e676838f5ebb",
        "rating": 2,
        "review": "222",
        "firstName": "Test",
        "lastName": "User",
        "__v": 0
    }
]
Status: 200

```

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
(/api/items/99/reviews)<br>
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
  <!-- "user_id":"xyz", -->
  <!-- <br>"firstName":"abc",<br>
  "lastName":"xyz",<br>
  "avatarUrl":"xyz.abc",<br> -->
  <br>"rating":5,<br>
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
