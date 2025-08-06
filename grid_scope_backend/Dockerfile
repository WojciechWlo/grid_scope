FROM python:3.11

RUN apt-get update && \
    apt-get install -y curl gnupg apt-transport-https netcat-openbsd && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18 unixodbc-dev && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools && \
    apt-get clean

ENV PATH="$PATH:/opt/mssql-tools/bin"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x wait-for-it.sh entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]