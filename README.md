# Invidious CLI
A command line Invidious RSS reader/player. It consists of a subscription/channel feed and lets you create a playlist of the videos you want to watch. A playlist is automatically created of all videos that has been uploaded since the last video you watched.

## Installation
```
$ npm i -g invidious-cli
```

### Setup
An rss feed and a videoplayer is required to use invidious-cli.
```
$ termtube set feed "https://invidio.us/feed/channel/UC4Je3NiGWBA29x0jVeNmA2Q"
$ termtube set player mpv
```

## Usage
```
$ invidious
$ invidious --help
Usage: invidious [options] [command]

Options:
  -V, --version         output the version number
  -p, --player <player> Player to use when playing videos
  -h, --help            output usage information

Commands:
  set <options> <value>
```

## Keyboard shortcuts
```
<space>: Select/deselect video
      p: Play selected videos
      o: Play video on active row without setting is as last watched video
      n: Set last watched to current date and time
      r: Fetch videos
      q: Quit
```

