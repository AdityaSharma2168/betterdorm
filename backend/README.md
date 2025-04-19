# dorm-finder-backend

## Overview
The Dorm Finder Backend is a web application designed to help users find available dorms and roommates. It allows users to create posts about open dorms, search for potential roommates, and includes an AI chatbot for natural language processing (NLP) filtering of dorm offerings.

## Features
- User authentication and profile management
- Create and manage dorm listings
- Search for roommates and roommate requests
- Google Maps integration for location services
- AI chatbot for filtering and querying dorm listings

## Technologies Used
- FastAPI: A modern web framework for building APIs with Python 3.6+ based on standard Python type hints.
- MongoDB: A NoSQL database for storing user and dorm information.
- Pydantic: Data validation and settings management using Python type annotations.
- Uvicorn: A lightning-fast ASGI server for serving FastAPI applications.

## Project Structure
```
dorm-finder-backend
├── app
│   ├── main.py
│   ├── core
│   ├── api
│   ├── models
│   ├── schemas
│   ├── services
│   └── utils
├── tests
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd dorm-finder-backend
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up the environment variables:
   Copy `.env.example` to `.env` and fill in the required values.

5. Run the application:
   ```
   uvicorn app.main:app --reload
   ```

## Testing
To run the tests, use:
```
pytest
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.