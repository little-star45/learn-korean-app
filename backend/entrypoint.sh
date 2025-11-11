#!/bin/sh
# entrypoint.sh — czeka na bazę danych zanim odpali backend
echo "Starting backend container..."

echo "Waiting for PostgreSQL to be ready..."
until nc -z db 5432; do
  echo "   Database not ready yet, retrying in 2s..."
  sleep 2
done

echo "PostgreSQL is ready, starting Flask..."
exec python run.py