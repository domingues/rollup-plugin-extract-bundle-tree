# rollup-plugin-extract-bundle-tree

[Rollup](https://github.com/rollup/rollup) plugin to export the rollup bundle tree to a JSON file.

## Installation

```bash
npm install --save-dev rollup-plugin-extract-bundle-tree
```

## Usage

```js
// rollup.config.js
import bundleTree from 'rollup-plugin-extract-bundle-tree';

export default {
  input: 'src/main.js',
  output: {
    dir: 'public',
    format: 'esm'
  },
  plugins: [
    bundleTree({
      file: 'bundle-tree.json'
    })
  ]
}
```

### Output
All fields are optional.
```json
{
  "{file_name}": {
    "isAsset": true,
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "{file_name}",
      "..."
    ],
    "dynamicImports": [
      "{file_name}",
      "..."
    ],
    "assetImports": [
      "{file_name}",
      "..."
    ],
  }
}
```

## Example
```json
{
  "chunk-0afaf479.js": {
    "assetImports": [
      "chunk-8b5a5bc7.css"
    ]
  },
  "contacts.js": {
    "isEntry": true,
    "imports": [
      "chunk-0afaf479.js"
    ],
    "assetImports": [
      "contacts.css"
    ]
  },
  "index.js": {
    "isEntry": true,
    "imports": [
      "chunk-0afaf479.js"
    ],
    "assetImports": [
      "index.css"
    ]
  },
  "chunk-8b5a5bc7.css": {
    "isAsset": true
  },
  "contacts.css": {
    "isAsset": true
  },
  "index.css": {
    "isAsset": true
  }
}
```

## License

MIT
