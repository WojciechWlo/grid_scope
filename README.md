# grid_scope



# Run

Go to project folder and run in console:
```
docker compose -f docker-compose.dev.yaml --env-file .env.dev up --build
```

# Note

Remember to change any secrets from .env both after clonning repository and after creating containers!

Django Secret key Generate:
```
python -c "from django.core.management.utils import get_random_secret_key; print('django-insecure-' + get_random_secret_key())"
```