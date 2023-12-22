# Vendor and Purchase Management App

**A comprehensive web application for managing vendors and purchase orders, built with Django REST API, Django signals, React frontend, and Bootstrap for styling.**

## Features

- **Vendor management:**
    - Create, view, update, and delete vendors
    - Track vendor performance metrics:
        - Average response time
        - Fulfillment rate
        - On-time delivery rate
        - Quality rating average
- **Purchase order management:**
    - Create, view, update, and delete purchase orders
    - Assign purchase orders to vendors
    - Track purchase order status (pending, acknowledged, rejected, completed, canceled)
    - Rate completed orders for quality
- **User authentication and authorization:**
    - Separate views for vendors and admins
    - Secure login and token-based authentication
- **Real-time statistics updates:**
    - Vendor statistics automatically updated using Django signals

## Technologies Used

- **Backend:**
    - Django
    - Django REST Framework
    - Django signals
- **Frontend:**
    - React
    - Bootstrap

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/vendormanagement.git
   ```
2. Create a virtual environment and activate it.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply any necessary database migrations:
   ```bash
   cd vendormanage
   python manage.py migrate
   ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
6. In a separate terminal, navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
7. Start the React development server:
   ```bash
   npm start
   ```

## Usage

- Access the application in your browser at `http://127.0.0.1:8000/`.
- Create a user account or log in as an existing user.
- Navigate to the vendor and purchase order management sections to perform various tasks.



