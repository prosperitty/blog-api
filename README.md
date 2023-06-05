# Blog API

This is the backend API codebase for the blog app. Technology used includes node.js, express.js, mongoose, multer, passport.js, and MongoDB as a database. Hosting was done by [Railway](https://railway.app). Hosting is now on [Render](https://render.com/).

## Functionality

The main functionality of this blog api is to allow the frontend client to call this API to handle a variety of operations on the server side. This API handles authentication, CRUD operations, database operations, form validation/upload, and RESTful operations.

Using mongoose and express, the app is able to query, create models, control view, and create routing. Multer is used to help store data such as images which is then used to generate a image URI to be uploaded to cloudinary. 

The API now utilizes the cloudinary API to store images uploaded by users to the cloud. Previously, the app used Multer to help store data to MongoDB and then used to generate the image on the front end client. However, the stored buffer was very large for such operations and slowed performance significantly. Therefore, cloudinary is utilized to host images on the cloud for a significant increase in performance.

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
- Railway/Render
- Cloudinary

## References

[The Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api)

[Live Demo](https://alex-lvl.github.io/blog-react/)