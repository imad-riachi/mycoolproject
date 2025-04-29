.PHONY: db-up db-down db-clean db-logs db-status

# Start the database and pgAdmin
db-up:
	docker compose up -d

# Stop the database and pgAdmin
db-down:
	docker compose down

# Stop and remove all containers and volumes (this will delete all data)
db-clean:
	docker compose down -v
	docker rm -f saas-starter-postgres saas-starter-pgadmin 2>/dev/null || true
	docker volume rm -f saas-starter-postgres-data saas-starter-pgadmin-data 2>/dev/null || true
	docker network rm saas-starter-network 2>/dev/null || true

# View database logs
db-logs:
	docker compose logs -f

# Check status of database containers
db-status:
	docker compose ps

# Show database connection information
db-info:
	@echo "PostgreSQL:"
	@echo "  Host: localhost"
	@echo "  Port: 5433"
	@echo "  Database: saas_db"
	@echo "  Username: postgres"
	@echo "  Password: postgres"
	@echo ""
	@echo "pgAdmin:"
	@echo "  URL: http://localhost:5051"
	@echo "  Email: admin@admin.com"
	@echo "  Password: admin" 