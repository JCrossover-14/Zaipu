# Zaipu

Zaipu is a full-stack financial transaction analysis and forecasting application. It allows users to visualize their past financial transactions and provides future expense forecasting using machine learning techniques.

# Tech Stack

## Frontend

- React.js
- Google Material-UI (MUI)
- Graph.js
- Axios

## Backend

- Flask (Python)
- MongoDB
- Express.js
- Mongoose
- Bcrypt
- pmdarmia

# Middleware
- CORS

# Features

Transaction Dashboard: Displays historical financial transactions in a user-friendly interface.

Expense Forecasting: Uses predictive modeling to estimate future expenses.

Data Visualization: Graphical representation of spending trends.

Secure User Authentication: (Optional) Secure login and authentication.

Responsive UI: Mobile-friendly interface with Google MUI components.

# Installation & Setup

## Prerequisites

Ensure you have the following installed:

Node.js & npm (for frontend)

Python 3 & pip (for backend)

MongoDB (for database)

# Backend Setup

Clone the repository:

- git clone https://github.com/yourusername/zaipu.git cd zaipu/backend

Install dependencies:

- pip install flask
- pip install pmdarima
- pip install pandas
  
Start the Flask server:

- python app.py

# Frontend Setup

Navigate to the frontend folder:

- cd ../frontend

Install dependencies:

- npm install
- Might need to do npm install --force (some dependencies clash)

Start the React app:

- npm run dev

