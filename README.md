# Vendor and Purchase Management App

This application effectively manages vendors and purchase orders, ensuring seamless procurement operations.

Key Features:

Vendor Management:
Create, view, update, and delete vendors.
Track vendor performance metrics:
Average response time
Fulfillment rate
On-time delivery rate
Average quality rating
Purchase Order Management:
Create, view, update, and delete purchase orders.
Assign purchase orders to vendors.
Track order status (pending, acknowledged, rejected, completed, canceled).
Rate completed orders for quality.
User Authentication:
Login for both vendors and regular users.
Role-Based Authorization:
Vendors can only view and manage their own purchase orders.
Admin users can view and manage all purchase orders and vendors.
Technology Stack:

Backend: Django, Django REST Framework, Django Signals
Frontend: React, Bootstrap
Installation:

Clone the repository: git clone https://github.com/<your-username>/<repo-name>
Create a virtual environment and activate it.
Install dependencies: pip install -r requirements.txt
Migrate the database: python manage.py migrate
Run the development server: python manage.py runserver
Install frontend dependencies: cd frontend && npm install
Start the frontend development server: npm start
Usage:

Access the application at http://127.0.0.1:8000/.
Login as a vendor or admin user to access relevant features.