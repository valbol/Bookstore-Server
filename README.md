# Books Backend Project

This project is a backend application built with Express.js, providing functionality for a web application.

## Getting Started

Clone the repository to your local machine.
Install dependencies using npm install.
Create a .env file in the root directory of the project and add the required environment variables. See the .env.example file for a list of required variables and their descriptions.
Start the server:
`npm start`

Alternatively, you can run the server in development mode using:
`npm run dev`

**Important Notes**
Environment Variables: This project uses environment variables for configuration.
Ensure that you have created a .env file in the root directory of the project and populated it with the required variables.
Redis Caching: The application utilizes Redis for caching.
If Redis is not installed locally on your machine, the server will try once an failover - caching functionality will be disabled.

## Dependencies

"cors": "^2.8.5"
"dotenv": "^16.4.5"
"express": "^4.19.2"
"joi": "^17.12.3"
"mongoose": "^8.3.2"
"object-hash": "^3.0.0"
"pino": "^8.20.0"
"redis": "^4.6.13"

## License

This project is licensed under the MIT License. See the LICENSE file for details.
