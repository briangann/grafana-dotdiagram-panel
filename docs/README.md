# Grafana DOT Diagram Panel Plugin
[![CircleCI](https://circleci.com/gh/briangann/grafana-dotdiagram-panel.svg?style=svg)](https://circleci.com/gh/briangann/grafana-dotdiagram-panel)
[![David Dependency Status](https://david-dm.org/briangann/grafana-dotdiagram-panel.svg)](https://david-dm.org/briangann/grafana-dotdiagram-panel)
[![David Dev Dependency Status](https://david-dm.org/briangann/grafana-dotdiagram-panel/dev-status.svg)](https://david-dm.org/briangann/grafana-dotdiagram-panel/?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/briangann/grafana-dotdiagram-panel/badge.svg)](https://snyk.io/test/github/briangann/grafana-dotdiagram-panel)
[![Maintainability](https://api.codeclimate.com/v1/badges/fb9a3c26c28fbfea7da4/maintainability)](https://codeclimate.com/github/briangann/grafana-dotdiagram-panel/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fb9a3c26c28fbfea7da4/test_coverage)](https://codeclimate.com/github/briangann/grafana-dotdiagram-panel/test_coverage)

NOTE: this is not ready for use!
# Screenshots

![Panel Example](https://raw.githubusercontent.com/briangann/grafana-dotdiagram-panel/master/src/screenshots/panel-example.png)

# Configuration Editor

# Overrides

# Composites

# Link Notation

### Docker Support

A docker-compose.yml file is include for easy development and testing, just run
```
docker-compose up
```

Then browse to http://localhost:3000

## External Dependencies

* Grafana 6.5.x

## TODO

- [ ] Remove Angular

## Build Dependencies

* yarn
* Node v12

## Building

This plugin relies on @grafana/toolkit, typical build sequence:

```
yarn
yarn build
```

For development, you can run:
```
yarn watch
```

## Acknowledgements

- This plugin is based on another excellent D3 example by Mike Bostock [Graph-o-Matic](https://beta.observablehq.com/@mbostock/graph-o-matic)
- React integration is based on this tutorial by [Oliver Caldwell](https://oli.me.uk/d3-within-react-the-right-way/)
- Addition React ideas derived from this example by [Thibaut Tiberghien](https://codesandbox.io/s/github/tibotiber/rfd-animate-example/tree/master/)
