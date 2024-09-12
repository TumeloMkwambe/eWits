const { app } = require('@azure/functions');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection string and database name (replace with your actual values)
const uri = "mongodb+srv://clemyjele:bHUCUu09EVsJNEC1@cluster0.79zpfwz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "WitsEvents";
const collectionName = "users";

app.http('login', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        try {
            // Parse the request body to get login data (e.g., email, password)
            const data = await request.json();
            const { email, password } = data;

            // Ensure email and password are provided
            if (!email || !password) {
                return {
                    status: 400,
                    body: 'Missing required fields: email and password.'
                };
            }

            // Connect to MongoDB
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db(dbName);
            const usersCollection = db.collection(collectionName);

            // Find the user by email
            const user = await usersCollection.findOne({ email });
            if (!user) {
                return {
                    status: 404, // Not Found
                    body: 'User not found.'
                };
            }

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    status: 401, // Unauthorized
                    body: 'Invalid password.'
                };
            }

            // Close the connection
            await client.close();

            // Return a success message (you might want to return a token in production)
            return {
                status: 200, // OK
                body: `Login successful! Welcome back, ${user.name}.`
            };
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return {
                status: 500,
                body: 'Internal server error.'
            };
        }
    }
});
