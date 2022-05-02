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


@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/api/search/<usr_input>', methods=['POST'])
def api_search(usr_input):
    return jsonify(queries.search(usr_input))


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
