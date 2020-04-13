# Ticket-booking-system
This project is the part of Hyperverge assignment.


## PROBLEM STATEMENT
To Setup a NodeJS server on EC2 to handle ticketing for a bus company.
Context:
1 bus, 40 seats. One ticket per seat.
### Features from the server:
* Update the ticket status (open/close + adding user details)
* View Ticket Status
* View all closed tickets
* View all open tickets
* View Details of the person owning the ticket.
* Additional API for admin to reset the server (opens up all the tickets)

Use an appropriate database to handle the problem. The server needs to expose the features via APIs
based on REST principles and event driven logic to be implemented in every possible situation.
Additionally, write appropriate test cases to simulate practical scenarios that you would want to test the
system for. Maintain the code through the course of the development on a version control system.

## Installation
1. Install node from nvm.
2. Install mongodb and redis.
3. Clone the repository.
4. Run `npm install` inside the directory.
5. Make `.env` file and put it in base directory.
6. Run `npm test` to test and `npm start` to deploy.

## Documentation

### /user
1. Add User (POST /add)<br />
It will take name, email and mobile number from the body.
2. List all users (GET /search)
3. Search the user (GET /search/:ID)
4. Delete the user (DELETE /delete/:ID)

### /bus
1. Add Bus (POST /add) <br />
It will take noofseats, start_time, end_time, start_station and end_station from the body.
2. List all buses (GET /search)
3. Search bus (GET /search/:ID)
4. Delete bus (DELETE /delete/:ID)

### /ticket
1. Book a ticket (POST /book) <br />
It will take busID and userID from body. busID and userID can be passed through frontend as the user has logged in to book the ticket and then will select the bus.
2. Cancel a ticket (PUT /cancel/:ID)<br />
It will take ticketID in parameters.
3. Search a ticket (GET /search/:Id)<br />
It will take ticketID in parameters.
4. Search ticket with given status (GET /Ticketstatus)<br />
It will take status from query parameters.

### /admin
1. Reset the server/opens up all the tickets (PUT /bus/reset)<br />
It will take busid from body.