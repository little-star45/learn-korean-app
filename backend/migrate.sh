#!/bin/bash
echo "Autogenerating migration..."
docker compose exec backend flask --app app.main:create_app db revision --autogenerate -m "$1"
echo "Applying migration..."
docker compose exec backend flask --app app.main:create_app db upgrade
echo "Done."