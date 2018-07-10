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

## TODO

- [ ] [Create tests after Jest implements .mjs support](https://github.com/facebook/jest/issues/4842)
- [ ] Create preset
- [ ] CLI improvements
