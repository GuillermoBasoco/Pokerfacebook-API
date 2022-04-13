# Pokerfacebook-API
Social Media API using Express, Prisma and Planetscale DB

Pokerfacebook API allows authenticated users to retreive other Users data and published Posts. Only Admins are allowed to create, update and delete Posts. 
The number of times every single post is queried (by any User) is properly tracked.


### Create New User (Admins Only)  [POST]
[http://localhost:3000/api/register](http://localhost:3000/api/register)
```json
{
	"name" : "Guillo",
	"email" : "guillo@guillo.com",
	"password" : "passwordToEncrypt",
	"roleId" : 2
}
```

### User Login  [POST] 
[http://localhost:3000/api/login](http://localhost:3000/api/login)
```json
{
	"email" : "guillo@guillo.com",
	"password" : "password"
}
```

### Get All Users (Just name & email)  [GET]
[http://localhost:3000/api/users](http://localhost:3000/api/users)


### Create Post (Admins Only)  [POST]
[http://localhost:3000/api/posts](http://localhost:3000/api/posts)
```json
{
	"title" : "Sergio Magaña",
	"content" : "Moctezuma",
	"authorId" : 1
}
```

### Get All Posts  [GET]
[http://localhost:3000/api/posts](http://localhost:3000/api/posts)

### Get Post by id  [GET]
[http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)

### Update Post by id  [PATCH]
[http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)

```json
{
	"title" : "Moliere",
	"content" : "El Misántropo",
	"authorId" : 1
}
```


### DELETE Post by id  [PATCH]
[http://localhost:3000/api/posts/1](http://localhost:3000/api/posts/1)
