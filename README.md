# phrase-prompt 🦕
Interactive [Phrase.com](https://phrase.com) CLI - build with Deno

> The Leanest, Fastest, and Most Reliable Localization Platform

`phrase-prompt` is an alternative frontend to the [phrase](https://help.phrase.com/help/configuration) command-line client.

## Search Translation Keys
![search keys](https://raw.githubusercontent.com/aleks/phrase-prompt/main/readme/search.png)

## Create Translation Keys
![create keys](https://raw.githubusercontent.com/aleks/phrase-prompt/main/readme/create-key.png)

## Create Branch
![create keys](https://raw.githubusercontent.com/aleks/phrase-prompt/main/readme/create-branch.png)

## Requirements

To use `phrase-prompt` you need to install [deno](https://deno.land/) first:

### Deno

```
brew install deno
```
Not on macOS? [Deno install guide](https://deno.land/#installation)

### Phrase Client

`phrase-prompt` will read the phrase config from your current path (while in a phrase-enabled project). The config file (`.phrase.yml` or `.phraseapp.yml`) usually lives in your project root. If you have a phrase config in your current path, you will not have to do anything.

If you want to be independent from a specific path, you can also provide `phrase-prompt` an access token via a flag:
- `--token <access token>` - [Don't have an access token?](https://help.phrase.com/help/access-tokens)

You also need to have a Phrase config file (`.phrase.yml` or `.phraseapp.yml`) in your current path.

## Install

```
deno install --unstable --allow-net --allow-read -n phrase-prompt https://raw.githubusercontent.com/aleks/phrase-prompt/main/phrase-prompt.ts
```

What do these flags mean?
- `--unstable` is required since `phrase-prompt` uses some unstable features from Deno.
- `--allow-net` is required to request data from the [phrase](https://phrase.com) API.
- `--allow-read` is required to be able to read your Phrase config (`.phrase.yml` or `.phraseapp.yml`)
- `-n` defines the name of the executable. Feel free to change it to your liking.

Note: Once you've run the install command, Deno will notify you to update your `$PATH` to be able to access Deno-installed tools from everywhere in your terminal.

## Usage

Just execute `phrase-prompt` and follow the instructions.

## Features

- [x] Search for Translation Keys and view their Translations
- [x] Create Translation Keys
- [x] Create Branches

### Missing features i would like to add:

- [ ] Tests 🙃
- [ ] Editing Translation Keys
- [ ] Editing Translations
- [ ] Compare Branches
- [ ] Merge Branches
- [ ] Deleting Branches

---

![phrase deno](https://raw.githubusercontent.com/aleks/phrase-prompt/main/readme/phrase-deno.png)

[Phrase on GitHub](https://github.com/phrase/) | [Deno](https://deno.land/)
