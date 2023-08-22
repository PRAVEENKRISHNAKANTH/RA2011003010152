#!/usr/bin/env python
# coding: utf-8

# In[ ]:


from flask import Flask, request, jsonify
import requests
import time

app = Flask(__name__)

def fetch_numbers(url):
    try:
        response = requests.get(url, timeout=0.5)
        if response.status_code == 200:
            data = response.json()
            return data.get("numbers", [])
    except requests.Timeout:
        pass
    return []

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    all_numbers = []

    for url in urls:
        numbers = fetch_numbers(url)
        all_numbers.extend(numbers)

    merged_unique_numbers = list(set(all_numbers))
    merged_unique_numbers.sort()

    return jsonify({"numbers": merged_unique_numbers})

if __name__ == '__main__':
    app.run(port=8008)

