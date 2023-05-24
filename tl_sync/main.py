from dataclasses import dataclass
import psycopg2
import requests
import time
from datetime import datetime
import os

@dataclass
class Show:
    id: int
    play: str
    date_time: datetime
    link: str
    scene_id: int

    def to_show_row(self) -> str:
        return f"({self.id}, 1, 1, '{self.date_time}', '{self.link}')"

    def to_show_play_link_row(self) -> str:
        return "INSERT INTO shows_play_links (show_id, play_id)" +  \
            f"SELECT {self.id}, id FROM plays WHERE upper(title) = upper('{self.play}') ON CONFLICT (show_id, play_id) DO NOTHING;"



def zal_to_sceneId(zal: str) -> int:
    if zal == "Большой зал": return 1
    elif zal == "Малый зал": return 2
    else: return 3



GATEWAY_URL = os.getenv("GATEWAY_URL")

def get_shows_json():
    try:
        response = requests.get(GATEWAY_URL)
        return response.json()['message']
    except Exception as e:
        print(e)
        return []

def selectNulls() -> str:
    return """
           SELECT s.id FROM shows s
           LEFT JOIN shows_play_links pl
           ON s.id = pl.show_id
           WHERE pl.play_id IS NULL;"""


def to_show(show_json) -> Show:
    return Show(
        id=show_json['performance_id'],
        play=show_json['show_name'],
        date_time=show_json['start_date'],
        link=show_json['performance_full_url'],
        scene_id= zal_to_sceneId(show_json['hall_name'])
    )


DB_NAME     = os.getenv("POSTGRES_DB")
DB_USER     = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_PORT     = os.getenv("POSTGRES_PORT")


connection = None

try:
    time.sleep(10)

    connection = psycopg2.connect(
        user=DB_USER,
        password=DB_PASSWORD,
        host="backendDB",
        port=DB_PORT,
        database=DB_NAME
    )

    with connection.cursor() as cursor:
        while True:
            cursor.execute("DELETE FROM shows WHERE datetime < (SELECT NOW());")
            statement = "INSERT INTO shows (id, created_by_id, updated_by_id, datetime, tickets_link) VALUES"

            shows_json = get_shows_json()
            if shows_json == []:
                time.sleep(60)
                continue

            shows = [to_show(show) for show in shows_json]
            statement += ',\n'.join([show.to_show_row() for show in shows])
            statement += "ON CONFLICT (id) DO NOTHING;"
            statement += '\n'.join([show.to_show_play_link_row() for show in shows])
            # execute statement
            cursor.execute(statement)
            # commit the transaction
            connection.commit()
            time.sleep(60*20)


except psycopg2.DatabaseError as error:
    print(error)
finally:
    if connection is not None:
        connection.close()
