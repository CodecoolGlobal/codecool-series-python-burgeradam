from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_all_actors():
    return data_manager.execute_select('''
                                        SELECT actors.name,
                                        EXTRACT(YEAR FROM AGE(COALESCE(actors.death, now()), actors.birthday)) AS age,
                                        COUNT(sc.id) AS number_of_shows,
                                        (case 
                                        WHEN actors.death IS NULL AND actors.birthday IS NULL THEN 'fictional'
                                        WHEN actors.death IS NULL THEN 'alive'
                                        ELSE 'deceased' END) AS dead_or_alive 
                                        FROM actors
                                        LEFT JOIN show_characters sc ON actors.id = sc.actor_id
                                        INNER JOIN shows ON sc.show_id = shows.id
                                        GROUP BY actors.id
                                        LIMIT 500''')
