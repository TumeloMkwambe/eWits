const { app } = require('@azure/functions');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection string and database name 
const uri = "mongodb+srv://clemyjele:bHUCUu09EVsJNEC1@cluster0.79zpfwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "WitsEvents";
const collectionName = "users";

app.http('signup', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            // Parse the request body to get user signup data (e.g., name, email, password)
            const data = await request.json();
            const { name, email, password } = data;

            // Ensure all required fields are present
            if (!name || !email || !password) {
                return {
                    status: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',  // Allow all origins for CORS
                        'Content-Type': 'application/json'   // Return content as JSON
                    },
                    body: JSON.stringify({ message: 'Missing required fields: name, email, and password.' })
                };
            }

            // Connect to MongoDB
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db(dbName);
            const usersCollection = db.collection(collectionName);

            // Check if the user already exists
            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) {
                return {
                    status: 409,  // Conflict
                    headers: {
                        'Access-Control-Allow-Origin': '*',  // Allow all origins for CORS
                        'Content-Type': 'application/json'   // Return content as JSON
                    },
                    body: JSON.stringify({ message: 'User with this email already exists.' })
                };
            }

            // Hash the password using bcrypt
            const salt = await bcrypt.genSalt(10); // Generate a salt
            const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

            // Insert new user into the database
            const result = await usersCollection.insertOne({
                name,
                email,
                password: hashedPassword,  // Store the hashed password
                createdAt: new Date()
            });

            // Close the connection
            await client.close();

            return {
                status: 201,  // Created
                headers: {
                    'Access-Control-Allow-Origin': '*',  // Allow all origins for CORS
                    'Content-Type': 'application/json'   // Return content as JSON
                },
                body: JSON.stringify({ message: `User ${name} signed up successfully!` })
            };
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',  // Allow all origins for CORS
                    'Content-Type': 'application/json'   // Return content as JSON
                },
                body: JSON.stringify({ message: 'Internal server error.' })
            };
        }
    }
});
