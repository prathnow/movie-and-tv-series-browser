# Movie Browser

I'm creating this project to practice my Vanilla JS skills.

A simple movie browser project that utilizes The Movie Database (TMDb) API to fetch and display movie information.

## Table of Contents

- [Movie Browser](#movie-browser)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Not working yet](#not-working-yet)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)
  - [Contributing](#contributing)

## Description

Movie Browser is a web application that allows users to search for movies, view details about specific movies, and discover popular and trending movies using The Movie Database (TMDb) API.

## Features

- View detailed information about a specific movie
- Discover new and popular movies
- Discover latest trailers

## Not working yet

- Searching for movies by title
- View information about a specific actor or staff
- Displaying a trailers on popup
- Adding and removing to bookmarks
- Sharing options
- Categories
- More

## Installation

1. Clone the repository:

```bash
git clone https://github.com/prathnow/movie-browser.git
cd movie-browser
```

2. Install dependencies:

```bash
npm install
```

3. Create a TMDb API key:

- Visit TMDb website and create an account.
- Generate an API key.

4. Configure your API key:

- Add your TMDb API key to the config.js file:

```bash
export const API_KEY = 'YourApiKey';
```

## Usage

To start the development server:

```bash
npm run start
```

Visit http://localhost:1234 in your web browser to use the Movie Browser.

## Documentation

For detailed information on using the Movie Browser API, refer to the [API Documentation](https://linktodocumentation)

## Contributing

Feel free to contribute by reporting issues, suggesting features, or submitting pull requests.
