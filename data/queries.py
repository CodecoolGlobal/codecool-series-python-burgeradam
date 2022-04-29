from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_first10_actors():
    return data_manager.execute_select('''SELECT actors.name, COUNT(sc.actor_id) AS roles 
                                        FROM actors
                                        LEFT JOIN show_characters sc ON actors.id = sc.actor_id
                                        GROUP BY actors.name
                                        ORDER BY COUNT(sc.actor_id) DESC
                                        LIMIT 10
                                        ''')
