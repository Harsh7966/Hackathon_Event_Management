Hackathon Event Management Application

Overview

This web application is designed to streamline the management of Hackathon events for both organizers and participants. It provides a user-friendly interface for participants to browse and register for hackathons, and for organizers to create, manage, and track their events.

Features

Participant

- Signup and Sign In: Participants can sign up and log in to their accounts.
- Browse Hackathons: Participants can view a list of hackathons on various themes.
- Register for Events: On the hackathon detail screen, participants can register for events by providing necessary details such as name, email, phone, total experience, skills, and expertise.
- Registration Confirmation: Participants receive a confirmation screen upon successful registration.
- View Past and Upcoming Hackathons: Participants can see a list of past hackathons they participated in and all upcoming or ongoing hackathons they registered for.
- Hackathon Details: Participants can click on an event to view its details again.

Organizer

- Signup and Sign In: Organizers can sign up and log in to their accounts.
- Create Hackathons: Organizers can create hackathon events with details such as organizer company name, date, and description.
- Manage Events: Organizers can view a list of events they created and filter them by past, in-progress, and upcoming events.
- Edit and Delete Events: Organizers can edit or delete listed events.
- View Participants: Organizers can view a list of participants registered for each hackathon.

Installation

1. Clone the repository:
git clone https://github.com/yourusername/hackathon-event-management.git
cd hackathon-event-management

2. Install dependencies:
npm install

3. Set up environment variables:
Create a `.env` file in the root directory and add the necessary environment variables.

- BackEnd PORT= 8080
- DB_CONNECTION_STRING: "mongodb+srv://HACKATHONEVENTMANAGEMENT:HACKATHONEVENTMANAGEMENT@cluster0.yjcaoze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
- PRIVATE_KEY: HACKATHONEVENTMANAGEMENT

4. Start the application:
npm run dev

Usage

Participant

- Sign up or log in to your account.
- Browse the list of hackathons and select one to view its details.
- Register for a hackathon by filling in the required details.
- View the confirmation screen after successful registration.
- Check your dashboard to see past and upcoming hackathons.
  
Organizer

- Sign up or log in to your account.
- Create a new hackathon event by providing the necessary details.
- View and manage your hackathon events, including editing or deleting events.
- Filter events to see past, in-progress, or upcoming events.
- View the list of participants registered for each hackathon.
  
Technologies Used

- Frontend: HTML, CSS, JavaScript, React, Bootstrap
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

