from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_shows_with_genre_filter(show_count=5):
    return data_manager.execute_select('''
                        SELECT shows.id, shows.title
                        FROM shows
                        LEFT JOIN show_genres sg on shows.id = sg.show_id
                        GROUP BY shows.id, shows.year
                        HAVING COUNT(sg.genre_id) > %(show_count)s
                        ORDER BY shows.year''', {'show_count': show_count})


def get_show_info(show_id):
    return data_manager.execute_select('''
                        SELECT
                        EXTRACT(YEAR FROM shows.year) AS year,
                        CASE WHEN AGE(NOW(), shows.year) > AGE('2000-01-01', '1975-01-01') THEN true ELSE false END AS anniversary,
                        COUNT(s.season_number) AS num_of_seasons,
                        CEIL(shows.rating) AS rating
                        FROM shows
                        INNER JOIN seasons s on shows.id = s.show_id
                        WHERE shows.id = %(show_id)s AND s.title != 'Specials'
                        GROUP BY shows.id, year
                        ''', {'show_id': show_id})
