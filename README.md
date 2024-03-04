# Currency converter

Convert between different currencies, display exchange rates between currencies.

### Main arhitecture decisions

The main design goal of this application is for `understandability` - it should be easy for a new developer to get to know the codease. Functions are therefore kept simple, duplication is avoided, and no "exotic" libraries (except for Material UI) are used.

There is a localStorage-based caching mechanism which only fetches from the external API if the data is older than hour (or if it does not exist in the user's localStorage, e.g. the initial fetch).

There are some simple unit-tests for ensuring that the components works as expected, run in a CI/CD pipeline giving developer's confidence when refactoring for example.

### Defining API key

API key is defined in `.env` file (not included in this repo). Add your API key like so:

```
VITE_API_KEY=your-api-key
```

### Running the application

```
npm install
npm run dev
```
