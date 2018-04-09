<div align="center">
	<img src="https://i.imgur.com/aAxk4n8.png" width="500"/>
	<h1>Seery</h1>
	<p>
		<b>A service integration telegram robot</b>
		<br>
		<i><a href="http://t.me/SeeryBot">Start Using</a></i>
	</p>
	<a href="https://circleci.com/gh/ctxhou/seery/tree/master"><img src="https://circleci.com/gh/ctxhou/seery/tree/master.svg?style=svg"/></a>	
	<a href="https://codecov.io/gh/ctxhou/seery"><img src="https://codecov.io/gh/ctxhou/seery/branch/master/graph/badge.svg"/></a>
	<br>
	<br>
</div>

## Command list

* `/pocket`: get pocket article
* `/nba`: get nba scores
* `/mlb`: get mlb scores
* `/hn`: get top 20 hacker news articles
* `/wakatime`: get wakatime summary
* `/shorturl`: get short url

## Service List

### Pocket

**`/pocket`**

* Get a random article from last week
* Get all articles from last week

### NBA

**`/nba`**

> nba command helper

**`/nba y`**

> get yesterday's scores

**`/nba t`**

> get today's scores

**`/nba tmr`**

> get tomorrow schedule

**`/nba [YYYYMMDD]`**

> get scores/schedule of some day

### MLB

**`/mlb`**

> mlb command helper

**`/mlb y`**

> get yesterday's scores

**`/mlb t`**

> get today's scores

**`/mlb tmr`**

> get tomorrow schedule

**`/mlb [YYYYMMDD]`**

> get scores/schedule of some day

### Hacker News

**`/hn`**

> get top 20 hacker news articles

### Wakatime

**`/wakatime`**

> get wakatime report

**`/wakatime_auth [secret_key]`**

> To let Seery get your wakatime data, user needs to input `secret_key` to make bot query data

### short url

**`/shorturl`**

> get short url helper message

**`/shorturl [url]`**

> short `url` and Seery will return the shorted url

## Development

### Install dependencies

```bash
yarn install
```

### Update config

Look up `env/` folder, and change all `**.sample.js` to your setting.

For example:

**bot.config.development.sample.js** → **bot.config.development.js**

Then, use your development telegram, pocket token.

### Running local server

**Open ngrok**

I suggest to use `ngrok` to create a tunnel to localhost, and use this url to link to telegram.

You can look up the [document](https://ngrok.com/) to install `ngrok`.

After installing, open ngrok:

```bash
ngrok http 5000
```

**Open dev server**

Open mongodb, and run development server

```
npm run dev
```

### Test your bot

After finishing above steps, try type something in your dev bot.

You should get the proper response.

<hr/>

Any PR and idea are welcome.

## License

MIT [@ctxhou](https://github.com/ctxhou)