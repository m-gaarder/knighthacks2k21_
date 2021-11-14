from flask import Flask, render_template
from flask import jsonify
import random
import praw

reddit_read_only = praw.Reddit(client_id="Fm4kK2WGRQbfd3AWq3gfHg", 
                                client_secret="vGzhXO9uAKIbRscthjYr37um6RqPkw", 
                                user_agent="kh21_redditscraper321")
                            
subreddit = reddit_read_only.subreddit("aww")

media_list = []
app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

@app.route('/generate', methods = ['GET'])
def get_content():
    if not media_list:
        for post in subreddit.top('year', limit = 250):
            if post.is_reddit_media_domain:
                media_list.append(post)
    random.shuffle(media_list)
    if media_list[0].is_video:
        return jsonify({"Content_URL" : media_list[0].media['reddit_video']['fallback_url'], "Video" : media_list[0].is_video})
    else:
        return jsonify({"Content_URL" : media_list[0].url, "Video" : media_list[0].is_video})

if __name__ == "__main__":
    app.run(port=8080)