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
{
  "result": "No cart"
}
Status: 200
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
{
   message: 'Item added to cart successfully'
}
Status: 200

Sample Response Body:
{
   error: 'CartItems not present in request'
}
Status: 400
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
{
   error: 'Not logged in'
}
Status: 400
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
GET /api/orders/
    https://best-read.herokuapp.com/api/orders/
Sample Response Body:
[
  {
    "createdAt": "2021-11-02T13:33:50.874Z",
    "updatedAt": "2021-11-02T13:33:50.874Z",
    "_id": "6181402803ba3e0016a660ce",
    "userId": "61800c56fdf3e676838f5ebb",
    "amount": 20000,
    "currency": "INR",
    "status": "COMPLETED",
    "cartItems": [
        {
            "_id": "6181401103ba3e0016a660cb",
            "itemId": "60db2d1eab6fbca8549f6371",
            "quantity": 1,
            "title": "The Power of Habit : Why We Do What We Do, and How to Change",
            "author": "Charles Duhigg",
            "description": "A young woman walks into a laboratory. Over the past two years, she has transformed almost every aspect of her life....",
            "pages": 375,
            "image": "https://images-na.ssl-images-amazon.com/images/I/71iEVsSP1GL.jpg",
            "category": "books",
            "ratingSum": 12,
            "totalRatings": 3,
            "price": 20000
        }
    ],
    "__v": 0,
    "razorpay_order_id": "order_IGkt4CVFswL8fA",
    "razorpay_payment_id": "pay_IGktIaqAmfzalP",
    "razorpay_signature": "faed87dd30ff09268570efb616b07690952056e816be0fb51abbef0c2008a8b6"
},
{
  "createdAt": "2021-11-02T14:01:08.837Z",
  "updatedAt": "2021-11-02T14:01:08.837Z",
  "_id": "618144c6abfd8f9211b64b21",
  "userId": "61800c56fdf3e676838f5ebb",
  "amount": 29900,
  "currency": "INR",
  "status": "COMPLETED",
  "cartItems": [
      {
          "_id": "618144c0abfd8f9211b64b20",
          "itemId": "60db3e01ab6fbca8549f6376",
          "quantity": 1,
          "title": "Elon Musk: How the Billionaire CEO of SpaceX and Tesla is Shaping our Future",
          "author": "Ashlee Vance",
          "description": "Elon Musk, the entrepreneur and innovator behind SpaceX, Tesla, and SolarCity, sold one of his internet companies, PayPal, for $1.5 billion. Ashlee Vance captures the full spectacle and arc of the genius's life and work, from his tumultuous upbringing in South Africa and flight to the United States to ...",
          "pages": 392,
          "image": "https://images-na.ssl-images-amazon.com/images/I/5112YFsXIJL.jpg",
          "category": "books",
          "ratingSum": 0,
          "totalRatings": 0,
          "price": 29900
      }
  ],
  "__v": 0,
  "razorpay_order_id": "order_IGlDrw1w3TXcvB",
  "razorpay_payment_id": "pay_IGlEf9hGtaypA9",
  "razorpay_signature": "7285388c016d6225b10519de54febebb9228dbedba5d7e4118d7084d1ba7263a"
}
]
Status: 200

```
