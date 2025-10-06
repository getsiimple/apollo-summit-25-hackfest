This is an Apollo Connectors project. You should use the apollo connectors spec mcp tool before doing any planning or making any changes to the graphql files in this project. The user will have the `rover` CLI installed that can be used, DO NOT USE HOMEBREW OR UPGRADE THE CLI.

All of the files needed for rover to run things locally are located in the mcp folder and all connectors you build should be created in that folder. 

IMPORTANT:
- ALWAYS USE `rover dev --supergraph-config ./mcp/supergraph.yaml --router-config ./mcp/router.yaml --mcp ./mcp/mcp.local.yaml` to run everything locally.
- You should always use federation_version "=2.12.0-preview.8" - this is for a hackathon where new stuff is being released and can only be used with this latest preview version.
- All schema files should have their `@link` references to using https://specs.apollo.dev/federation/v2.12 and https://specs.apollo.dev/connect/v0.3
- The `./mcp/router.yaml` will require using `preview_connect_v0_3: true` in the `connectors` configuration