#!/bin/sh
# entrypoint.sh

MARKER_FILE="/markers/django_init_migrations_dev"
if [ ! -f "$MARKER_FILE" ]; then
    echo "Running Django migrations for MODE='$MODE'..."
    
    python manage.py makemigrations
    python manage.py migrate
    
    ./drop-token-constraint.sh
    python manage.py migrate
    ./generate-token-constraint.sh
    ./create-super-user.sh

    if [ "$MODE" = "development" ]; then
        touch "$MARKER_FILE"
        echo "Marker created for MODE='$MODE'."
    fi

    echo "Migrations and initialization completed for MODE='$MODE'."
else
    echo "Marker file exists – skipping migrations."
fi

exec "$@"
