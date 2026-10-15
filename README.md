# pure-minigames

A repo filled with minigames the team has worked on

This utilises the project-error boilerplate [here](https://github.com/project-error/fivem-react-boilerplate-lua/tree/master)

Current minigames:

## Number Counter

This is a game where the user has to click the numbers in the correct order from 1-x, and while they are clicking the numbers are randomising to make it harder

### How to use:

    local gameData = {
        totalNumbers = 15,
        seconds = 20,
        timesToChangeNumbers = 4,
        amountOfGames = 2,
        incrementByAmount = 5,
    }
    local result = exports['pure-minigames']:numberCounter(gameData)

Or

    -- when you send no data it will use the config data
    local result = exports['pure-minigames']:numberCounter()

This awaits the result and returns true or false

## Practice locally

On Windows, install Node.js (which includes npm), then double-click
`launch-practice.bat` to start the local web app and open the Number Counter
practice page in your default browser. The first launch installs the web app
dependencies if they are not already present, after asking for confirmation.
Choose **Y** to download and install them. The success animation uses the
current `lottie-react` package, which supports React 18 without legacy peer
dependency resolution. Change the round settings on the page and select
**Start practice** to play. Keep the server window open while practicing;
close it to stop the local server. Each launch stops any process using local
port 5173 before starting a fresh server; save work in any app using that port
before launching.

## Publish the practice app with GitHub Pages

Push this project to a GitHub repository on its `main` or `master` branch. In
the repository, open **Settings > Pages** and set the build and deployment
source to **GitHub Actions**. The included workflow installs the web app
dependencies, builds `web/build`, and deploys it to Pages on each push; you can
also run it manually from the **Actions** tab.

The published site provides browser practice for the minigames implemented in
this project. FiveM resource names alone do not include the resources'
minigame logic or interfaces, so Pages cannot use them to discover or reproduce
other servers' minigames.
