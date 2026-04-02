Volunteer Event Manager
This project is a full‑stack web application for managing community volunteer events. It allows users to browse upcoming events and administrators to create, update, and delete events through a secure interface.

Features
User authentication with protected routes for logged‑in users.

Volunteer event listing with key details (title, location, date/time, description, status).

Admin panel to create, edit, and delete events (full CRUD over events).

REST API built with Node.js and Express, backed by MongoDB.

Continuous integration pipeline configured with GitHub workflows.

Tech Stack
Frontend: React, React Router, CSS

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Tools: npm, GitHub, GitHub Actions

Running the application locally
1. Clone the repository
bash
git clone <your-repo-url>
cd ifn636-volunteer-event-manager
2. Start the backend
bash
cd backend
npm install
npm start
By default the API will run on http://localhost:5001.

3. Start the frontend
In a new terminal:

bash
cd frontend
npm install
npm start
The React application will be available at http://localhost:3000.

Available scripts (frontend)
From the frontend directory, you can run:

npm start – Run the React app in development mode.

npm test – Run the frontend test suite (if configured).

npm run build – Build the production bundle.

API overview
Main event‑related endpoints (backend):

GET /api/events – List all events.

POST /api/events – Create a new event.

PUT /api/events/:id – Update an existing event.

DELETE /api/events/:id – Delete an event.

All admin operations require an authenticated user.

Continuous Integration
This repository includes a GitHub workflow under .github/workflows/ci.yml which runs automated checks on each push. The workflow installs dependencies, runs tests, and ensures the build succeeds before changes are merged.