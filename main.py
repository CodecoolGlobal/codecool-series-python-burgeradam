from flask import Flask, render_template, url_for
from data import queries
from flask import jsonify
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/episodes')
def count_episodes():
    return render_template('episodes.html')


@app.route('/api/episodes')
def get_episodes():
    a = queries.get_all_shows_plus_episode_count()
    return jsonify(a)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
