# Grid Scope

## 🚀 Summary
Grid Scope is a web application that allow user load data from any number of google spreadsheets, transform them using SQL scripts and then upload them into another google spreadsheet. Everything is simple and straightforward. Try it yourself!

## 📊 Project Stats

issues | pull requests | activity | contributors | stars | forks | licence
-------|---------------|----------|--------------|-------|-------|--------
![GitHub issues](https://img.shields.io/github/issues/WojciechWlo/grid_scope?logo=github) | ![GitHub pull requests](https://img.shields.io/github/issues-pr/WojciechWlo/grid_scope?logo=github) | ![GitHub last commit](https://img.shields.io/github/last-commit/WojciechWlo/grid_scope?logo=github) | ![GitHub contributors](https://img.shields.io/github/contributors/WojciechWlo/grid_scope?logo=github) |![GitHub stars](https://img.shields.io/github/stars/WojciechWlo/grid_scope?logo=github) | ![GitHub forks](https://img.shields.io/github/forks/WojciechWlo/grid_scope?logo=github) |  [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-blue)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## 🌐 Tested Browsers

![Chrome](https://img.shields.io/badge/Chrome-No-4285F4?logo=google-chrome&logoColor=white&style=for-the-badge)
![Firefox](https://img.shields.io/badge/Firefox-No-FF7139?logo=firefox&logoColor=white&style=for-the-badge)
![Edge](https://img.shields.io/badge/Edge-Yes-0078D7?logo=microsoft-edge&logoColor=white&style=for-the-badge)
![Safari](https://img.shields.io/badge/Safari-No-0DBEFF?logo=safari&logoColor=white&style=for-the-badge)




## 📑 Table of Contents
- [🚀 About](#about)
- [🏛️ Architecture](#architecture)
- [🧰 Techstack](#techstack)
- [📝 Prerequisites](#prerequisites)
- [⚙️ Setup](#setup)
- [⚡ Getting Started](#getting-started)
- [🗒️ Note](#note)
- [⏳ Future Work](#future-work)
- [🤝 Feedback and Contributions](#feedback-and-contributions)
- [📄 License](#license)
- [🗨️ Contact](#contact)



## 🚀 About
Grid Scope is a web application that allow user load data from any number of google spreadsheets, transform them using SQL scripts and then upload them into another google spreadsheet. Such ETL process is really simple. User just need to:
1. recover its Google Cloud Console key (which is considered the most difficult in entire process :) )
1. provide it in the **Keys form**
1. provide spreadsheet data in the **Spreadsheets form**
1. provide input ranges in the spreadsheets (specified in the previous step) in the **Inputs form**
1. provide output cell in the spreadsheets (specified in the previous step) in the **Outputs form**
1. define process by providing list of input ranges, providing SQL query transforming them and then choosing the output spreadsheets in the **Processes form**

All data (specifically the processes) are preserved and may be quickly executed just by clicking the button!



## 🏛️ Architecture
Here is architecture of Grid Scope
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                🌐 USER BROWSER                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     ⚛️ REACT FRONTEND (frontend container)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   Keys Form     │  │ Spreadsheets    │  │   Processes     │                  │
│  │   Management    │  │   Management    │  │   Management    │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ SpreadsheetIn   │  │ SpreadsheetOut  │  │   Redux Store   │                  │
│  │   Management    │  │   Management    │  │   (State Mgmt)  │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ REST API Calls
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🐍 DJANGO BACKEND (backend container)                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   Views/APIs    │  │   Models/ORM    │  │  Google Sheets  │                  │
│  │   (REST API)    │  │   (Data Layer)  │  │   Integration   │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  SQL Engine     │  │   ETL Logic     │  │   Encryption    │                  │
│  │  (Pandasql)     │  │   (Process)     │  │   (API Keys)    │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ ORM Queries
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        🗃️ MS SQL SERVER (mssql container)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │      User       │  │   Key (Encrypted│  │   Spreadsheet   │                  │
│  │   (Auth Data)   │  │  Google Creds)  │  │   (GSheet URLs) │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ SpreadsheetIn   │  │ SpreadsheetOut  │  │    Process      │                  │
│  │ (Input Ranges)  │  │(Output Cells)   │  │  (SQL Queries)  │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐                                       │
│  │ProcessSpreadsheetIn│ProcessSpreadsheetOut│                                   │
│  │(Many-to-Many)   │  │ (Many-to-Many)  │                                       │
│  └─────────────────┘  └─────────────────┘                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ Google Sheets API v4
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           📊 GOOGLE SHEETS ECOSYSTEM                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  Input Sheets   │  │  Output Sheets  │  │ Google Cloud    │                  │
│  │   (Data Source) │  │  (Destination)  │  │   Console       │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘

                        🔄 ETL DATA FLOW & OBJECT CREATION ORDER

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              📋 SETUP PHASE                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
      1️⃣ User          2️⃣ Key           3️⃣ Spreadsheet     4️⃣ SpreadsheetIn
   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
   │   Register   │─>│ Google Cloud │─>│ Define GSheet│─>│ Input Ranges │
   │   Login      │  │ Credentials  │  │ URLs & Labels│  │ A1:Z100, etc │
   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
               ┌───────────────────────────────────────────────┘
               │        5️⃣ SpreadsheetOut   6️⃣ Process        7️⃣ Process Relations
               │     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
               └────>│ Output Cells │─>│  SQL Query   │─>│ Link Inputs  │
                     │ B1, C5, etc  │  │ Transform    │  │ & Outputs    │
                     └──────────────┘  └──────────────┘  └──────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              🔄 EXECUTION PHASE                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

📥 EXTRACT        🔧 TRANSFORM      📤 LOAD           ✅ COMPLETE
┌─────────────┐   ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
│Fetch data   │──>│Execute SQL  │──>│Upload results|──>│Process      │
│from Google  │   │query on     │   │to target     │   │execution    │
│Sheets via   │   │temp tables  │   │Google Sheet  │   │complete     │
│API v4       │   │             │   │via API       │   │             │
└─────────────┘   └─────────────┘   └──────────────┘   └─────────────┘
      │                  │                 │
      ▼                  ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│Multiple     │   │SQL operates │   │Data written │
│SpreadsheetIn│   │on combined  │   │to specific  │
│ranges read  │   │dataframes   │   │cell ranges  │
│             │   │as tables    │   │             │
└─────────────┘   └─────────────┘   └─────────────┘ 

                        🔗 MODEL RELATIONSHIPS
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                           │
│  User ──┬──<Key───<Spreadsheet───┬──<SpreadsheetIn───<ProcessSpreadsheetIn>──┐            │
│         │                        └──<SpreadsheetOut───<ProcessSpreadsheetOut>┼─<Process   │
│         └────────────────────────────────────────────────────────────────────┘            │
│                                                                                           │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

## 🧰 Techstack
![Python](https://img.shields.io/badge/python-3776AB?style=flat&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/django-092E20?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/react-20232A?style=flat&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white)
![MS SQL Server](https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=flat&logo=microsoftsqlserver&logoColor=white)

### Backend
- **[Python](https://www.python.org/)** - The core programming language for backend development.
- **[Django](https://www.djangoproject.com/)** - A high-level Python web framework used to build RESTful APIs and handle server-side logic.
- **[MsSQL Server](https://www.microsoft.com/en-us/sql-server/)** - Relational database management system used to store and manage application data.

### Frontend
- **[React](https://reactjs.org/)** - A JavaScript library for building interactive and responsive user interfaces.
- **[Redux](https://redux.js.org/)** - A predictable state management library for managing application state across React components.






## 📝 Prerequisites
For Windows
- **[Docker Desktop](https://docs.docker.com/desktop/)** (tested with v4.25.2)

For Linux
- **[Docker](https://www.docker.com/)**

## ⚙️ Setup
Environment variable | Description | Example value
---------------------|-------------|--------------
PYTHONUNBUFFERED | If set then Python logs are printed in realtime in docker logs | 1
PYTHONDONTWRITEBYTECODE | If set then Python doesn't generate .pyc files and __pycache__ dirs | 1
CHOKIDAR_USEPOLLING | | true
WATCHPACK_POLLING | | true
ACCEPT_EULA | Flag used for accepting (or refusing) EULA of mssql server | Y
MSSQL_PID | Tells SQL Server which edition or product key to use when starting up. | Express
DB_ENGINE | Used by Django backend to recognize what sql server it will be using | mssql
DB_NAME | Used by Django backend to recognize what is the name of db it will be using | grid_scope_db
DB_USER | SQL user username used by Django backend to connect to sql server | sa
DB_PASSWORD | SQL user password used by Django backend to connect to sql server | YourStrong!Passw0rd
DB_HOST | Url to the database Django backend should connect to and use | mssql
DB_DRIVER | DB driver Django backend should connect with to the db server | ODBC Driver 18 for SQL Server
DB_EXTRA_PARAMS | Extra parameters Django backend should connect with to the db server | yes
DJANGO_SUPERUSER_USERNAME | Username of Django superuser | admin
DJANGO_SUPERUSER_EMAIL | Email address of Django superuser | admin@example.com
DJANGO_SUPERUSER_PASSWORD | Password of Django superuser | adminpass
SECRET_KEY | Fernet key used by Django to provide security | SECRET_KEY=
DJANGO_ENCRYPTION_KEY | Fernet key used by Django backend to encrypt some data | DJANGO_ENCRYPTION_KEY=
BACKEND_PORT | Port the backend service will be visible on host | 8000
FRONTEND_PORT | Port the frontend service will be visible on host | 3000
DB_PORT | Port the mssql service will be visible on host | 1433
FRONTEND_ADDRESS | Comma separated urls of microservices to be allowed by Django CORS to use API | "http://localhost:3000"
BACKEND_ADDRESS | Url of the backend visible from the browser (not from the containers!) | "http://localhost:8000"


## ⚡ Getting Started

Go to project folder and run in console:
```
docker compose up --build
```
Next, in backend container run:
```
./entrypoint.sh
```
To run Django app, at the end run:
```
python manage.py runserver 0.0.0.0:8000
```

## 🗒️ Note

Remember to change any secrets from .env both after clonning repository and after creating containers!

Django Secret key Generate:
```
python -c "from django.core.management.utils import get_random_secret_key; print('django-insecure-' + get_random_secret_key())"
```

## ⏳ Future Work
This is not the end of the project. There is still a lot stuffs to add!
Feature | Description | Status
-|-|-
HTTPS management | For better security | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)
REST API for processes execution | It would allow automization of the processes execution | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)
metrics endpoint | For monitoring certain metrices via Prometheus and Grafana | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)
healtcheck endpoint | For microservices status monitoring | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)
ACL | For some groups/organizations purposes | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)
Kubernetes configs | Better scalability than docker compose | ![TODO](https://img.shields.io/badge/status-TODO-lightgrey)



## 🤝 Feedback and Contributions
Please feel free to contribute by submitting an issue or [reaching me out](#contact).

## 📃 License
This project is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).


## 🗨️ Contact
Feel free to reach out to me.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wojciech-wlodarczak/)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail&logoColor=white)](mailto:vojciechandre@gmail.com)



