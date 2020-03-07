# Screeps AI NodeJS

This is an AI for Screeps built in NodeJS. This circumvents some of the limitations imposed by the Screeps engine, such as a flat file hierarchy and the inability to write tests, by using Grunt to package local code into flattened output.

## Setup

### Credentials

From the Gruntfile, you can see how your authentication is provided:

```javascript
var email = grunt.option("email") || config.email || process.env.email;
const token = process.env.SCREEPS_TOKEN;
```

It's better not to provide these details in the config file, since they are secrets, and committing them to Screeps or Github could be bad. Export these attributes as environment variables in your shell, ex: `.bashrc`, `.bash_profile`, `.zshrc`, etc. If on Windows (and not in Linux Subsystem for Windows), search environment variables in the start menu and set it up in your own way.

### Tools

Install NodeJS v10. I prefer to use Node Version Manager to acquire this. Then install Grunt with `npm install -g grunt`

## Build

`yarn install`

## Test

`yarn test`

## Deploy

`grunt`
