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
# df = pd.DataFrame(cur.fetchall())
# df.columns = [desc[0] for desc in cur.description]
# print(df)
# print(df.columns)
# df.to_json('data/AllFlights.json', orient='columns')

# Query to get all flights in Hawaii
cur.execute('''
    SELECT SUM(departures_performed) as departures, 
        SUM(passengers) as pass_sum, 
        origin, 
        oa.latitude as origin_lat, 
        oa.longitude as origin_long, 
        dest, 
        da.latitude as dest_lat, 
        da.longitude as dest_long
    FROM ics484.routes
    JOIN ics484.airports as oa on origin=oa.iata
    JOIN ics484.airports as da on dest=da.iata
    WHERE (ORIGIN_STATE_ABR = 'HI' OR DEST_STATE_ABR = 'HI') AND passengers > 0 AND departures_performed > 10
    GROUP BY origin, dest, oa.latitude, oa.longitude, da.latitude, da.longitude
    ORDER BY departures desc
''')
df = pd.DataFrame(cur.fetchall())
df.columns = [desc[0] for desc in cur.description]
print(df)
print(df.columns)
df.to_json('data/HawaiiFlights.json', orient='records')

# Getting Airports
cur.execute('''
    SELECT iata, latitude, longitude
    FROM ics484.airports
''')
df_airports = pd.DataFrame(cur.fetchall())
df_airports.columns = [desc[0] for desc in cur.description]
# print(df_airports)
# print(df_airports.columns)

df = df.loc[df['origin'] == 'HNL']
df.to_json('data/HNLFlights.json', orient='records')

# df = df.set_index('origin').join(df_airports.set_index('iata')).reset_index().rename(columns={'index': 'origin'})
# print(df)


