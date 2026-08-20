# Travlr Getaways — CS 465 Full Stack Development

Travlr Getaways is a full-stack academic project built for **CS 465: Full Stack Development** at Southern New Hampshire University. It demonstrates how a public Express/MVC website, a REST API, a MongoDB database, and an Angular 17 administrator SPA can work together as one application.

## Architecture

The project is split into two user experiences that share the same backend data:

- **Customer site:** Express, Handlebars, routes, controllers, and server-rendered views
- **Administrator SPA:** Angular 17 standalone components and services
- **REST API:** Express routes/controllers returning JSON
- **Database:** MongoDB with Mongoose models
- **Authentication:** salted password hashing, JSON Web Tokens (JWT), and Passport JWT middleware

The administrator SPA supports authenticated trip management while the public travel page retrieves trip information from the REST API.

## Features

- Dynamic public travel listing backed by MongoDB
- REST endpoints to list and retrieve trips
- Administrator registration and login
- JWT-protected create, update, and delete operations
- Angular trip listing with reusable trip cards
- Add, edit, and delete trip workflows
- Route guard for protected Angular pages
- MongoDB seed data for repeatable testing
- Postman-friendly JSON API responses

## API Endpoints

| Method | Endpoint | Purpose | Authentication |
| --- | --- | --- | --- |
| POST | `/api/register` | Register an administrator | Public |
| POST | `/api/login` | Authenticate and return a JWT | Public |
| GET | `/api/trips` | Retrieve all trips | Public |
| GET | `/api/trips/:tripCode` | Retrieve one trip | Public |
| POST | `/api/trips` | Add a trip | Bearer token |
| PUT | `/api/trips/:tripCode` | Update a trip | Bearer token |
| DELETE | `/api/trips/:tripCode` | Delete a trip | Bearer token |

## Run Locally

### 1. Start MongoDB

Run a local MongoDB instance using the default host (`127.0.0.1`) or provide `DB_HOST` in the environment.

### 2. Install and seed the Express application

```bash
npm install
npm run seed
```

For local development, set a JWT secret before starting the server:

```powershell
$env:JWT_SECRET="replace-with-a-long-random-secret"
npm start
```

The Express site and API run at `http://localhost:3000`.

- Customer site: `http://localhost:3000/`
- Dynamic travel page: `http://localhost:3000/travel`
- REST API: `http://localhost:3000/api/trips`

### 3. Start the Angular administrator SPA

In a second terminal:

```bash
cd app_admin
npm install
npm start
```

The admin application runs at `http://localhost:4200`.

## Project Structure

```text
app_server/          Express MVC routes, controllers, and Handlebars views
app_api/             REST API, Mongoose models, JWT/Passport authentication
app_admin/           Angular 17 administrator SPA
data/                MongoDB seed data
public/              Static customer-site assets
bin/www              Express server entry point
app.js               Main Express configuration
```

## Testing

During development, the application was tested through the browser and with Postman. Testing covered registration/login, public GET requests, authenticated POST/PUT/DELETE requests, Angular login and route protection, trip creation/editing/deletion, and database-backed updates.

## Academic Note

This is an academic portfolio project. Course starter assets and the original Travlr website template were provided as part of the class materials. My coursework focused on connecting the application layers, building the REST API and database integration, implementing the Angular administrator experience, and adding authentication and protected trip-management operations.