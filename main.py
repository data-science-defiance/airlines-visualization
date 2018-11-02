import os
# from pprint import pprint
import pandas as pd
import psycopg2

conn = psycopg2.connect(
    dbname=os.getenv('AIRLINES_VISUALIZATION_DB_NAME'),
    user=os.getenv('AIRLINES_VISUALIZATION_DB_USER'),
    password=os.getenv('AIRLINES_VISUALIZATION_DB_PASS'),
    host=os.getenv('AIRLINES_VISUALIZATION_DB_HOST'),
    port=os.getenv('AIRLINES_VISUALIZATION_DB_PORT'),
)
cur = conn.cursor()
# cur.execute('''
#     SELECT * 
#     FROM ics484.routes
# ''')

# Query to get all flights in Hawaii
cur.execute('''
    SELECT SUM(passengers) as TOTAL_PASSENGERS, SUM(departures_performed) AS DEPARTURES, ORIGIN, DEST
    FROM ics484.routes
    WHERE (ORIGIN_STATE_ABR = 'HI' OR DEST_STATE_ABR = 'HI') AND passengers > 0
    GROUP BY ORIGIN, DEST
    ORDER BY ORIGIN;
''')
df = pd.DataFrame(cur.fetchall())
df.columns = [desc[0] for desc in cur.description]
# df = df[df['departures'] > 10]
print(df)
print(df.columns)
df.to_json('data/HawaiiFlights.json')

# Getting Airports
cur.execute('''
    SELECT iata, latitude, longitude
    FROM ics484.airports
''')
df_airports = pd.DataFrame(cur.fetchall())
df_airports.columns = [desc[0] for desc in cur.description]
print(df_airports)
print(df_airports.columns)

# df = df.set_index('origin').join(df_airports.set_index('iata')).reset_index().rename(columns={'index': 'origin'})
# print(df)


