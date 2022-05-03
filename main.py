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


@app.route('/genres')
def genres():
    query = queries.get_shows_with_genres()
    return render_template('genres.html', query=query)


@app.route('/api/actors/<show_id>')
def get_actors_by_show_id(show_id):
    return jsonify(queries.filtered_actors(show_id))



def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
