from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def top10_shows_by_runtime():
    return data_manager.execute_select('''
                                        SELECT shows.title,
                                        (shows.runtime * COUNT(e.episode_number)) AS runtime
                                        FROM shows
                                        LEFT JOIN seasons s on shows.id = s.show_id
                                        LEFT OUTER JOIN episodes e on s.id = e.season_id
                                        GROUP BY shows.title, shows.runtime
                                        ORDER BY runtime DESC
                                        LIMIT 10''')


def actors_in_top10_shows():
    return data_manager.execute_select('''
                                        SELECT
                                        (SELECT STRING_AGG(actors.name, ', ' ORDER BY actors.name)
                                        FROM show_characters
                                        LEFT JOIN actors on show_characters.actor_id = actors.id
                                        WHERE shows.id = show_characters.show_id) AS actors
                                        FROM shows
                                        LEFT JOIN seasons s on shows.id = s.show_id
                                        LEFT OUTER JOIN episodes e on s.id = e.season_id
                                        GROUP BY shows.id, shows.runtime
                                        ORDER BY (shows.runtime * COUNT(e.episode_number)) DESC
                                        LIMIT 10''')
