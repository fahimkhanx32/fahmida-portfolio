How to Open the Fahmida Portfolio Website
You only need to follow these simple steps.

Step 1: Install 2 programs
First, install these programs on your computer:

Node.js: https://nodejs.org 

MongoDB: https://www.mongodb.com/try/download/community 

You only need to install them once.

Step 2: Open the project
Find the fahmida-portfolio folder on your computer.

Open that folder.

Right-click inside the folder and select Open in Terminal.

Step 3: Install the project
Copy this command:


bash
npm run install:all
Paste it into the terminal and press Enter.

Wait until it finishes.

Step 4: Create your login account
Copy and run these commands one by one:


bash
cd server

bash
npm run seed:admin
Your admin account is now created!

Step 5: Start the server
Go back to the main project folder and open Terminal.

Run:


bash
npm run dev:server
Keep this window open.

Step 6: Start the website
Open another Terminal in the fahmida-portfolio folder.

Run:


bash
npm run dev:client
Keep this window open too.

Step 7: Open your website!
Open Chrome and visit:

http://localhost:5173 
Your website is ready! 🎉

Your Login Details
Email: bristy@gmail.com

Password: Bristy123

Click the Login button to enter your Dashboard.

Next time, what should you do?
You don't need to repeat everything!

Just open two terminals and run these two commands:

Terminal 1

Terminal 2

npm run dev:server

npm run dev:client

Then open your website.

One important thing: MongoDB must also be running.