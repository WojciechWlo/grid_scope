#!/bin/sh
# entrypoint.sh

case "$MODE" in
  development)
    MARKER_FILE="/markers/django_init_migrations_dev"
    ;;
  production)
    MARKER_FILE="/markers/django_init_migrations_prod"
    ;;
  *)
    echo "Unknown MODE='$MODE', defaulting to development."
    MARKER_FILE="/markers/django_init_migrations_dev"
    ;;
esac

if [ ! -f "$MARKER_FILE" ]; then
    echo "Running Django migrations for MODE='$MODE'..."
    
    python manage.py makemigrations
    python manage.py migrate
    
    ./drop-token-constraint.sh
    python manage.py migrate
    ./generate-token-constraint.sh
    ./create-super-user.sh

    touch "$MARKER_FILE"
    echo "Migrations and initialization completed for MODE='$MODE'."
else
    echo "Marker file exists for MODE='$MODE' – skipping migrations."
fi

exec "$@"
