# grid_scope



# Run

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

# Note

Remember to change any secrets from .env both after clonning repository and after creating containers!

Django Secret key Generate:
```
python -c "from django.core.management.utils import get_random_secret_key; print('django-insecure-' + get_random_secret_key())"
```