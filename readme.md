<h1 align="center">Set Variable<br />
<div align="center">
  
  [![Build](https://github.com/action-pack/set-variable/actions/workflows/build.yml/badge.svg)](https://github.com/action-pack/set-variable/)
  [![Version](https://img.shields.io/github/v/tag/action-pack/set-variable?label=version&sort=semver&color=066da5)](https://github.com/marketplace/actions/set-repository-variable)
  [![Size](https://img.shields.io/github/size/action-pack/set-variable/dist/index.js?branch=release/v1.12&label=size&color=066da5)](https://github.com/action-pack/set-variable/)
  
</div></h1>

Action to set a repository variable.

## Usage 🚀

```YAML
uses: action-pack/set-variable@v1
with:
  name: 'MY_VARIABLE'
  value: 'Lorem ipsun dolor simit'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

## Inputs 📝

### name

**Required** `String` Variable name.

### value

**Required** `String` Value to store.

### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### owner

**Optional** `String` Owners name.

### repository

**Optional** `String` Repository name.

### org

**Optional** `Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations).

## FAQ 💬

  * ### Why do I get the error '*Resource not accessible by integration*'?

    This will happen if you use ```secrets.GITHUB_TOKEN```.

    You need to create a [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead.

    Go to your Github settings, select 'Developer settings' --> 'Personal access tokens' --> 'Tokens (classic)' and create a new token. Store its value in a secret, for example ```MY_TOKEN```.

    Then refer to it like this:
    
    ```yaml
    token: ${{ secrets.MY_TOKEN }}
    ```

## Stars 🌟
[![Stars](https://starchart.cc/action-pack/set-variable.svg?variant=adaptive)](https://starchart.cc/action-pack/set-variable)
