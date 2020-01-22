# Fetch some god damn Strings from POEditor

Need to fetch your Strings from POEditor? Hate their API? Join us and get your Strings in preffered format while using single function!

## CLI

```bash
# JSON in key-value pairs
npx fetch-poeditor ./strings-folder -p project-id -t poedtior-token
```

```bash
# Apple Strings
npx fetch-poeditor ./strings-folder -p project-id -t poedtior-token --APPLE
```

You can also use environment variables instead of arguments:
* **FETCH_POEDITOR_PATH**=/src/translations
* **FETCH_POEDITOR_PROJECT**=3254656
* **FETCH_POEDITOR_TOKEN**=5478a767c568a879f765c6457a975654
* **FETCH_POEDITOR_PERCENTAGE**=30
* **FETCH_POEDITOR_APPLE**=true

```bash
# Envirnment variables
FETCH_POEDITOR_PATH=./strings-folder FETCH_POEDITOR_PROJECT=project-id FETCH_POEDITOR_TOKEN=poedtior-token npx fetch-poeditor
```

## TODO

- [ ] [Create tests after Jest implements .mjs support](https://github.com/facebook/jest/issues/4842)
- [ ] Create preset
- [ ] CLI improvements
