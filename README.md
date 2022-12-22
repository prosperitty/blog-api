# Blog API

This is the backend API codebase for the blog app. Technology used includes node.js, express.js, mongoose, multer, passport.js, and MongoDB as a database. Hosting by [Railway](https://railway.app). 

## Functionality

The main functionality of this blog app is to allow users to call this API to create articles, comments, or categories if they are authenticated. Articles and comments use the basic operations of CRUD. Users are only allowed to create categories for now. 

If a user wants to begin writing blogs, or comment below a blog, the user must first create an account. Once registered, the user should be authenticated with passport.js to begin using the app. Users are allowed to sign out if chosen to.

Using mongoose and express, the app is able to query, create models, control view, and create routing. Multer is used to help store data such as images to MongoDB. 

# Learning Objectives

- Authentication
- Local Strategy
- Passport.js
- Express
- Multer
- Node.js
- MongoDB
- Cookies
- Sessions
- CRUD
- REST API
- REST API Structure
- REST API Endpoint Naming Conventions
- HTTP Methods (GET,POST,PUT,DELETE)
- CORS
- Same Origin Policy
- Configuring CORS origin
- CORS Headers
- Frontend Development/Backend Development
- Railway

## References

[The Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api)

[Live Demo](https://alex-lvl.github.io/blog-react/)