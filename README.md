# CS465-FullStack

# CS 465 Full Stack Development Portfolio Reflection

## Architecture

In this full stack project, I used multiple types of frontend development. The first customer-facing side of the Travlr Getaways application used Express, HTML, JavaScript, Handlebars templates, and CSS. This version worked like a more traditional web application because the server handled routes, controllers, and views. When a user visited a page, Express controlled the request and rendered the correct Handlebars page with trip data.

The administrative side of the project used an Angular single-page application, or SPA. The SPA was different because it ran more of the frontend logic in the browser. Instead of loading a completely new page for every action, Angular used components, services, routing, and forms to create a more interactive admin experience. The admin SPA allowed an administrator to log in, view trip cards, add trips, edit trips, and update trip information through API requests.

The backend used a NoSQL MongoDB database because the application data was document-based and worked well in JSON-like format. Trip packages contain fields such as code, name, length, start date, resort, price, image, and description. MongoDB stores this kind of data naturally as documents. Mongoose was used to define schemas and models so the Node and Express backend could interact with the database in a structured way. This made it easier to seed trip data, retrieve trips, update trips, and support the RESTful API.

## Functionality

JSON is different from JavaScript because JSON is a data format, while JavaScript is a programming language. JavaScript can contain logic, functions, variables, and behavior. JSON is mainly used to structure and transfer data. In this project, JSON helped connect the frontend and backend because the API returned trip data in JSON format. The Angular SPA could request that JSON data from the Express API, display it in the browser, and send updated JSON data back to the server when adding or editing trips.

Throughout the full stack process, I refactored code to improve functionality and organization. One important refactor was moving trip data access out of the Express customer-facing controller and into a separate REST API layer. This helped separate the public website from the API logic and made the application easier to maintain. I also refactored the frontend by creating reusable Angular components. For example, the trip listing component displays the collection of trips, while the trip card component displays each individual trip. This makes the code cleaner because the same card structure can be reused for every trip instead of repeating the same HTML multiple times.

Reusable UI components are helpful because they reduce duplicate code, make the application easier to update, and improve consistency across the interface. If the design of a trip card needs to change, the change can be made in one component instead of many different places. Services also improved functionality by keeping API calls in one location instead of spreading HTTP logic across multiple components.

## Testing

Testing was an important part of this project because the application depended on communication between the frontend, backend, and database. I tested API endpoints with Postman to verify that requests and responses worked correctly. The GET method was used to retrieve all trips and retrieve one specific trip by trip code. The POST method was used to add a new trip. The PUT method was used to update an existing trip. The DELETE method was used to remove a trip.

Endpoints are the specific API URLs that the frontend or external tools use to communicate with the backend. For example, `/api/trips` returns the trip collection, while `/api/trips/:tripCode` returns or updates a specific trip. Testing these endpoints helped confirm that the Express routes, controller logic, Mongoose model, and MongoDB database were connected properly.

Adding security created another layer that had to be tested. In the final version, the admin side included login authentication and JSON Web Tokens. After logging in, the user receives a token. The Angular application stores the token and sends it with protected API requests. This means that administrative actions such as adding, editing, updating, and deleting trips require authorization. I tested the security by logging in, confirming that a token was returned, and verifying that protected CRUD actions only worked when the request included a valid Bearer token. This helped show how authentication protects the administrative side of a full stack application.

## Reflection

This course helped me understand how a full stack web application is built from multiple connected layers. Before this project, I had a limited understanding of how the frontend, backend, database, and API worked together. Building Travlr Getaways helped me see how the MEAN stack connects MongoDB, Express, Angular, and Node.js into one application.

I developed skills in Express routing, Handlebars templating, MongoDB database setup, Mongoose schemas, RESTful API development, Angular components, Angular services, CRUD functionality, and JWT authentication. I also gained more experience using GitHub branches to track progress through different stages of development. These skills are important because full stack development requires understanding how each part of an application communicates with the others.

This project also helped me become more comfortable troubleshooting errors. I had to test routes, fix API issues, check database connections, handle Angular version compatibility, and verify that security features worked correctly. That process helped me build patience and confidence with debugging. Even though I still consider myself early in my software development skills, this project gave me a stronger foundation and a portfolio example that shows I can work through a full stack application from setup to database integration, frontend development, API testing, and security.

