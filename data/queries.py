from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_genres(show_count=3):
    return data_manager.execute_select('''
        SELECT genres.id, genres.name
        FROM genres
        INNER JOIN show_genres sg ON genres.id = sg.genre_id
        GROUP BY genres.id, genres.name
        HAVING COUNT (sg.show_id) > %(shows_count)s
        ORDER BY genres.name''', {'shows_count': show_count})


def get_shows_with_filter(user_input):
    return data_manager.execute_select('''
        SELECT title, EXTRACT (YEAR FROM year), ROUND(rating, 1) AS rating
        FROM shows
        INNER JOIN show_genres sg ON shows.id = sg.show_id
        WHERE sg.genre_id = %(user_input)s''', {'user_input': user_input})
