# Database Design:-

## Schema

<ol>
<li>user</li>
<ul>
<li>_id</li>
<li>email(req,unique)</li>
<li>firstName</li>
<li>lastName</li>
<li>avatarUrl</li>
<li>createdAt</li>
<li>updatedAt</li>
</ul>

<li>userCredential</li>
<ul>
<li>_id</li>
<li>email(req,unique)</li>
<li>password</li>
<li>createdAt</li>
<li>updatedAt</li>
</ul>

<li>Book</li>
<ul>
<li>_id</li>
<li>title</li>
<li>author</li>
<li>overview</li>
<li>thumbnail</li>
<li>averageRating</li>
<li>totalRatingCount</li>
<li>category</li>
<li>subCategory</li>
</ul>

<li>RatingAndReview</li>
<ul>
<li>_id</li>
<li>user_id(_id of user collection)</li>
<li>firstName</li>
<li>lastName</li>
<li>avatarUrl</li>
<li>book_id(_id of book collection)</li>
<li>rating(0-10,required)</li>
<li>review</li>
<li>createdAt</li>
<li>updatedAt</li>
</ul>

</ol>
