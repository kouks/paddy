
<!-- omit in toc -->
# Paddy

- [Local development](#local-development)

## Local development

If you wish to contribute to Paddy development, first fork the repository. In
order to run the app localy, you will need to install dependencies via:

```bash
npm install
```

To run the application, you need to create a `.env` file in the root directory
and provide some required environment variables:

`.env`
```
DISCORD_BOT_TOKEN=<your_development_token>
PRIMARY_COMMAND_TRIGGER=~
API_GATEWAY_URL=https://4ifkcmljog.execute-api.eu-west-2.amazonaws.com/prod/v1
```

All that is left to do to test your local version of Paddy is to run:

```
npm run build && node .
```

After you are done with your changes, should you wish to submit them to the main
codebase, feel free to open a well-described pull request to the `master`
branch.

**Happy coding!**
