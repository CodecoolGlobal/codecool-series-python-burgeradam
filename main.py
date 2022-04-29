from flask import Flask, render_template, url_for
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


@app.route('/topactors')
def top_actors():
    top_actors_list = queries.get_first10_actors()
    roles = 0
    for _ in top_actors_list:
        roles += top_actors_list[0]['roles']
    return render_template('top10actors.html', actor_list=top_actors_list, roles=roles)


def main():
    app.run(debug=False)


if __name__ == '__main__':
    main()
