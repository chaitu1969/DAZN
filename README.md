
# Danz API

Danz is a backend API for managing movies, allowing operations like listing, searching, adding, updating, and deleting movies. It includes an authentication mechanism for admins to restrict certain actions to authorized users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Setup](#setup)
- [Run the Application](#run-the-application)
- [API Endpoints](#api-endpoints)
  - [List All Movies](#1-list-all-movies)
  - [Search Movies](#2-search-movies)
  - [Add a Movie (Admin only)](#3-add-a-movie-admin-only)
  - [Update a Movie (Admin only)](#4-update-a-movie-admin-only)
  - [Delete a Movie (Admin only)](#5-delete-a-movie-admin-only)
- [Middleware](#middleware)
- [License](#license)

## Features

- **List all movies**
- **Search movies by title or genre**
- **Add a new movie** (Admin only)
- **Update an existing movie** (Admin only)
- **Delete a movie** (Admin only)

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for API routing.
- **MongoDB**: NoSQL database for storing movie data.
- **Mongoose**: ODM library for MongoDB.
- **TypeScript**: Static typing for JavaScript.
- **Jest**: Testing framework for running unit tests.
- **Supertest**: HTTP assertions library for testing endpoints.
- **CORS**: Middleware for enabling cross-origin requests.
- **dotenv**: Environment variables management.

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/chaitu1969/DAZN.git
```

### 2. Install Dependencies
Navigate to the project directory and run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=mongodbURL
PORT=5000
```

### 4. Install TypeScript globally (if not installed)
```bash
npm install -g typescript
```

## Setup

1. **Database Setup**:
   - Ensure that you have MongoDB running locally or on a remote server.
   - Update the `MONGO_URI` in the `.env` file if you're using a remote database.

2. **Create Admin Role for Authentication**:
   - The API requires users with the "admin" role to perform certain actions like adding, updating, and deleting movies. You can simulate this by sending the `role` header as `admin` when making requests.

## Run the Application

To run the application in development mode:

```bash
npm run dev
```

This will compile the TypeScript files and start the server on the port specified in your `.env` file.

## API Endpoints

### 1. List All Movies

**Endpoint**: `GET /api/movies`

- **Description**: Retrieves a list of all movies.
- **Response**: Returns an array of movie objects.
  
  **Example**:
  ```json
  [
    {
      "title": "Movie Title",
      "genre": "Genre",
      "rating": 8,
      "streamingLink": "http://example.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

### 2. Search Movies

**Endpoint**: `GET /api/search?q=<search-term>`

- **Description**: Searches for movies by title or genre.
- **Query Parameters**: 
  - `q`: The search term.
  
  **Example**:
  ```json
  [
    {
      "title": "Action Movie",
      "genre": "Action",
      "rating": 9,
      "streamingLink": "http://example.com",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
  ```

### 3. Add a Movie (Admin only)

**Endpoint**: `POST /api/movies`

- **Description**: Adds a new movie (Admin only).
- **Request Body**: 
  ```json
  {
    "title": "New Movie",
    "genre": "Action",
    "rating": 7,
    "streamingLink": "http://newmovie.com"
  }
  ```

- **Response**: Returns the added movie object with a 201 status.
  
  **Example**:
  ```json
  {
    "title": "New Movie",
    "genre": "Action",
    "rating": 7,
    "streamingLink": "http://newmovie.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
  ```

### 4. Update a Movie (Admin only)

**Endpoint**: `PUT /api/movies/:id`

- **Description**: Updates an existing movie by its ID (Admin only).
- **Request Body**:
  ```json
  {
    "title": "Updated Movie Title"
  }
  ```

- **Response**: Returns the updated movie object.

### 5. Delete a Movie (Admin only)

**Endpoint**: `DELETE /api/movies/:id`

- **Description**: Deletes a movie by its ID (Admin only).
- **Response**: Returns a success message.

  **Example**:
  ```json
  {
    "message": "Movie deleted successfully"
  }
  ```

## Middleware

### Admin Authentication (`adminAuth`)

- **Description**: Ensures that only users with the "admin" role can perform certain actions like adding, updating, and deleting movies.
- **Usage**: Applied to `POST`, `PUT`, and `DELETE` endpoints.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
