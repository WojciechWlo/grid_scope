# grid_scope_backend/Dockerfile
FROM python:3.11

# Dodaj ODBC Driver (dla SQL Server)
RUN apt-get update && \
    apt-get install -y curl gnupg apt-transport-https netcat-openbsd && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql18 unixodbc-dev && \
    apt-get clean

# Pozostałe jak wcześniej:
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "mssql", "1433", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]