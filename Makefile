DB_URL=postgresql://root:secret@localhost:5432/test?sslmode=disable

migrateup:
	migrate -path src/server/db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path src/server/db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path src/server/db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path src/server/db/migration -database "$(DB_URL)" -verbose down 1

new_migration:
	migrate create -ext sql -dir src/server/db/migration -seq $(name)