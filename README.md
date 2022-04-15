# Saifu Plugin Template

A template to get you started building plugins for Saifu, the extensible Solana wallet. Includes:

- Ready-to-go rollup config
- Tailwind setup
- TypeScript compilation
- Handling of externals
- Prettier & Eslint

## Usage

Clone this repository and install dependencies through yarn

```
yarn install
```

### Running and developing

Follow instructions at [How to load external plugins for development](https://github.com/saifuwallet/docs/blob/master/How%20to%20load%20external%20plugins%20for%20development.md) on how to load this plugin into Saifu 


To run an automatic rebuild on change, start rollup in watch mode:

```
yarn dev
```

on mac, you can use something like `fswatch` to directly copy the resulting files from `dist/` into the plugin folder

```
fswatch  . | xargs -n1 -I{} cp {} /path/to/saifu/plugins/myplugin/
```

## Notes

- When adding dependencies, add them as `devDependencies`. This is important so your resulting javascript bundle includes only the resulting compiled js, and doesn't add dependencies to the NPM dep tree
- React and a few other dependencies (check the `externals` key of rollup.config.js) are injected by the wallet so you don't need to install those. This is due to React requiring the same version in the entire app, so if you were to ship your own React, your plugin would not load
