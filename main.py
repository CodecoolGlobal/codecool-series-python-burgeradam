from flask import Flask, render_template, url_for, jsonify
from data import queries
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


@app.route('/show-info')
def test():
    titles = queries.get_shows_with_genre_filter()
    return render_template('show-info.html', titles=titles)


@app.route('/api/show-info/<show_id>')
def get_show_info(show_id):
    query = queries.get_show_info(show_id)
    return jsonify(query)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
