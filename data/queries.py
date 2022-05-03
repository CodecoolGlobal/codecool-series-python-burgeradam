from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_shows_with_genres():
    return data_manager.execute_select('''
            SELECT shows.id,
            shows.title,
            ROUND (shows.rating) AS rating,
            COUNT ( DISTINCT show_characters.actor_id) AS number_of_actors
            FROM shows
            INNER JOIN show_genres ON shows.id = show_genres.show_id
            INNER JOIN show_characters ON shows.id = show_characters.show_id
            GROUP BY shows.id
            ORDER BY COUNT( DISTINCT show_genres.genre_id) DESC
            LIMIT 10''')


def filtered_actors(input):
    return data_manager.execute_select('''
            SELECT actors.name,
            EXTRACT(YEAR FROM AGE(COALESCE( actors.death, NOW()),
            actors.birthday) ) AS age,
            COUNT (sc.id) AS num_of_chars
            FROM actors
            INNER JOIN show_characters sc ON actors.id = sc.actor_id
            WHERE sc.show_id = %(input)s
            GROUP BY actors.id''', {'input': input})
