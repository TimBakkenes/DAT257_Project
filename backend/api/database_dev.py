import psycopg2

conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="postgres", port="5432")
cursor = conn.cursor()

query = """ SELECT table_name 
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_type = 'BASE TABLE'; """

cursor.execute(query)
table_names = cursor.fetchall()

for table_name in table_names:
    drop_query = f"DROP TABLE IF EXISTS {table_name[0]} CASCADE;"
    cursor.execute(drop_query)
    print(f"Dropped table {table_name[0]}")


with open("backend/api/tables.sql", "r") as tables_file:
    create_tables = tables_file.read()
    cursor.execute(create_tables)

with open("backend/api/inserts.sql", "r") as inserts_file:
    inserts = inserts_file.read()
    cursor.execute(inserts)

with open("backend/api/views.sql", "r") as views_file:
    views = views_file.read()
    cursor.execute(views)

conn.commit()
cursor.close()
conn.close()
print("done")