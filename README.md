# Pokerfacebook-API
Social Media API using Express, Prisma and Planetscale DB

Pokerfacebook API allows authenticated users to retreive other Users data and published Posts. Only Admins are allowed to create, update and delete Posts. 
The number of times every single post is queried (by any User) is properly tracked.


## Usage instructions

After cloning the repository, install the required dependencies with: 

```console
npm install
```
or 

```console
yarn install
```

then, create a .env file in the root folder of the project, you can use the following test Planetscale DB to start using the API immediately:

*NOTE*: The project uses *Prisma Migrate*, a Shadow Database is required.
<br/>
*NOTE*: sslaccept=accept_invalid_certs parameter required to test without SSL.

```env
DATABASE_URL='mysql://dsj5hykbsqj7:pscale_pw_xEvhkfUb65inQ6s6u1hQoLpK4ACVXn3ulWlPn68T9EA@602226y6l5ii.us-east-4.psdb.cloud/pokerfacebookdb?sslaccept=accept_invalid_certs'
SHADOW_DATABASE_URL='mysql://nrlg7usdmfg2:pscale_pw_2NBfVtC7wOI11vwbqrJcYhyKeiwk8b6lVKB7YOOPBgI@x3te3iypw2mo.us-east-3.psdb.cloud/pokerfacebook-shadowdb?sslaccept=accept_invalid_certs'
PORT=3000
ACCESS_TOKEN_SECRET='accessToken'
```

To migrate the DB, use: 

```console
npx prisma migrate dev --name [name_of_your_migration]  
```

You can visualize and edit the DB using Prisma Studio, open it in your browser with:
```console
npx prisma studio
```

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
