# Welcome to 2025 Summit Agent Party Hackathon 🎉

This is a joint hack between Apollo GraphQL and goose and we are excited to see what you build.  In this readme is everything you need to know about the hackathon including a template to get you started and all the rules for submission. If you have any questions please visit the Apollo Lounge on Level 3 near the atrium/hotel lobby or the `hackathon` channel in [Discord](https://discord.com/invite/apollo-labs).

Contents:
 1. [Hackathon Rules](#hackathon-rules)
 2. [Judging Criteria](#judging-criteria)
 3. [How to use the starter template](#how-to-use-the-starter-template)
 4. [Side Quests!](#side-quests)
 5. [How to Submit](#how-to-submit-your-hackathon-project)
 6. [I need help!](#i-need-help)

## Hackathon Rules 📜

In this challenge, your goal is to build an agentic experience using any APIs of your choice. The best agents have purpose built tools making them specialists that can be invoked by anyone, even other agents!

While there are some requirements listed below, the theme of this hack is purposefully broad. We want you to bring your own creativity and angle to this hackathon. 

- Submissions are due by **noon PST, Wednesday October 8th**.

---

### Required Technology 💻

This section outlines the technology you must use to have a valid submission.  How you use the tech is up to you! Make sure you show us in your submission.

1. [Apollo REST Connectors](https://www.apollographql.com/docs/graphos/connectors) or any GraphQL api
2. [Apollo MCP Server](https://www.apollographql.com/docs/apollo-mcp-server)
3. [goose](https://block.github.io/goose/docs/category/guides)

**Optional / Encouraged:**  
- goose with **GraphOS MCP Tools** enabled  
  - Tools include connectors and Apollo docs search  
- [goose Recipes](https://block.github.io/goose/docs/guides/recipes/)  
- [MCP UI](https://mcpui.dev/) 

---

### Who Can Participate
- Open to **all in-person attendees** of GraphQL Summit.    
- Block and Apollo employees **can participate** but are not eligible for prizes.  

---

## Judging Criteria ⚖️

### 🥇 Most Complete & Impactful Agent Experience  
*Awarded to the project that delivers the strongest end-to-end agentic experience.*  

**Judging Criteria:**  
- **Innovation**: Is this a novel or unexpected solution powered by agents?  
- **Cohesiveness**: Does it feel polished and usable as a complete experience? 
- **Usefulness / Impact**: Does it solve a real-world problem or create real value for users?  
- **Execution Quality**: Stability, clarity of presentation or documentation, and effective use of required tech.  

---

### 🛠️ Best-in-Class Tool  
*Awarded to the team or individual that builds the standout agent tool.*  

**Judging Criteria:**  
- **Design**: Is the tool intuitive, well-scoped, and easy to integrate into an agent workflow?  
- **Shape / Solution Fit**: Does it address a clear problem or unlock a valuable capability?  
- **Technical Implementation**: Code quality, thoughtful use of APIs, or protocols.  
- **Reusability**: Could other devs or agents easily adopt and extend this tool?  
- **Documentation / Explanation**: Is it clearly explained and easy to understand?  

---

### 🎨 Most Creative / Experimental Hack  
*Awarded to the project that takes the boldest or weirdest swing... think meme generators, unexpected mashups, or agents behaving in surprising ways.*  

**Judging Criteria:**  
- **Originality**: Is it fun, unexpected, or unconventional in its approach?  
- **Exploration of Agent Capability**: Does it push the boundaries of what agents can accomplish?  
- **Effort / Hackathon Spirit**: Even if it’s messy, does it show risk-taking, enthusiasm, and "go for it" energy?  
- **Delight Factor**: Does it make people smile, laugh, or say “whoa, I didn’t think you could do that”?  

---

### ⚡️ Additional Prizes  
- **Social Media Side Quest Completion** – open to all participants  
  - [See details here](#social-media-side-quest)  

## How to use the optional starter template

This section has all the steps to run the example template and see all the required technology in action. You **don’t have to use it**—it’s for inspiration or guidance. 

<details>

  <summary>🟢 Expand to get started 🟢</summary>

### Prerequisites

1. Clone this repository and open in your preferred IDE
2. You will need an API key to access an Anthropic model via the OpenRouter provider. For this hackathon, you’ll receive credits to use Claude Sonnet 4. You may also use personal accounts or other models—there are no restrictions.

   * Navigate to [goose credits portal](https://get-goose-credits.vercel.app/)
   * Enter your email
   * Copy or download the generated API key
   * [Install goose](https://block.github.io/goose/docs/getting-started/installation)
   * Configure [OpenRouter as your provider](https://block.github.io/goose/docs/getting-started/providers#configure-provider)
   * Recommended: select [anthropic/claude-sonnet-4](https://openrouter.ai/anthropic/claude-sonnet-4)
3. Add your OPENROUTER_API_KEY to `agent/.env`
4. **Install Rover CLI**  
   ```bash
   curl -sSL https://rover.apollo.dev/nix/latest | sh
   ```


<details>
 
<summary> How to run this project </summary>

---

1. Run 
```bash
rover dev --supergraph-config ./mcp/supergraph.yaml --router-config ./mcp/router.yaml --mcp ./mcp/mcp.local.yaml
```
2. (Optional) Open a second terminal and run: 
```bash
npx @modelcontextprotocol/inspector
```
  - In MCP Inspector: click **Connect → List Tools**
  - You should see: `GetProducts`, `introspect`,`search`, `validate`
3. click + to open an new terminal and type 
```bash
cd agent
npm install
npm run dev
```
4. in the chat interface ask what tools are available and you should see the same tools as you saw in the inspector output

</details>

<details>
 
<summary> How to add a new tool to the project</summary>
This project comes with one example tool called `GetProducts` in addition to default tools provided by Apollo MCP Server. This section will show you how to generate a new tool in the operations folder here `mcp/operations`. 

### Vibe coding a new REST API Connector and MCP tool

#### Step 1: Configure the Connectors Extension
1. Open a new terminal in your IDE and run:
   ```bash
   goose configure
   ```
2. Select **`add extension`**
   > 💡 **Tip:** Extensions in goose are your MCP servers
3. Select **Streaming HTTP**, name your extension apollo, then provide this URL:
   ```
   https://mcp.apollographql.com/
   ```
   This tool generates REST connectors.

#### Step 2: Generate a New Connector
4. Start goose:
   ```bash
   goose
   ```
5. Prompt goose with:
   ```
   I need to create a new connector for the https://airlock-listings.demo-api.apollo.dev/listings endpoint and add it to my current graph, put everything in the existing ./mcp/schema.graphql file. You can test the endpoint for the response to use in the connector.
   ```
6. Validate your schema is working on localhost.

#### Step 4: Generate Operations with a Recipe
7. Exit goose (`Ctrl + C`), then run:
   ```bash
   goose configure
   ```
   - Toggle the connectors MCP **off**
   - Add your Apollo MCP Server as a new extension (if you haven't already)

8. Start goose and run the pre-made recipe:
   ```bash
   goose
   goose run --recipe .goose/generate_operation.yaml --interactive
   ```

9. When prompted:
    - **What to do with the listings graph:** Enter something like:
      `I need to get the listings with cost and amenities`
    - **Extension name:** Enter the name you gave to your Apollo MCP Server Extension
    - Press Enter and the recipe will generate a valid MCP tool in the operations folder

#### Step 5: Verify Your New Tool
10. Check your MCP Inspector or React app—you should now see the new listings tool!
     > 💡 **Tip:** You may need to restart your dev server for your react app or clear/list tools in the mcp inspector to see the changes.

</details>

<details>

 <summary> How to use goose recipes</summary>
 
### How to make a new goose Recipe

goose recipes are reusable workflows that combine extensions, prompts, and settings. You can generate a recipe directly from your current working session and then modify it as needed. To do so, follow the steps in the [recipe guide](https://block.github.io/goose/docs/guides/recipes/session-recipes#create-recipe).

</details>

</details>

## Side Quests ✨

This section has some bonus activities you can complete as part of your hack.

### Deploy your MCP Tools with Railway

If you are ready to deploy your MCP Tools, we have deployment templates set up for you in Railway that are easy to use.

1. You can sign up and get free $20 in Railway credits using https://railway.com/?referralCode=apollo
2. You can use the [Apollo Runtime Template](https://github.com/apollographql/router-template) to host the Apollo Router and Apollo MCP Server. You can [1-click deploy](https://railway.com/deploy/apollo-router) for Railway or fork the template and connect a new Railway service to the repo
   - If you need a `router.yaml` for additional configuration, you should fork the [template](https://github.com/apollographql/router-template) because you'll need the `router.yaml` in the docker image (see `mcp.Dockerfile` in the template).

If you only need to deploy the MCP server because you're using an existing Apollo Router or GraphQL endpoint, you can use the [Apollo MCP Server Template](https://github.com/apollographql/mcp-server-template). You can [1-click deploy](https://railway.com/deploy/apollo-mcp-server) the MCP server and any of the `mcp.yaml` configuration needed can be set as environment variables

Once you have your resources deployed, you can use a [Railway-Provided Domain](https://docs.railway.com/guides/public-networking#railway-provided-domain) for your submission. 

### Social media side quest

Tag @goose_oss and @ApolloGraphQL with a screenshot of your hackathon project for a chance to win [$50 coupon to our swag shop](https://www.gooseswag.xyz/)

## How to submit your hackathon project 🤝

Submit your project in [Discord](https://discord.com/invite/apollo-labs) in the `hackathon-submission` channel

Submissions are due by 12:00pm PST on Wednesday October 8th. If you have any trouble with your submission please visit us in the Lounge on Level 3 near the atrium/hotel lobby.

Include in  your submission:

**REQUIRED**

1. A link to your public github repo (be careful not to expose keys or sensitive information)
   * your repo should have a readme describing your project and how to run
     
**OPTIONAL - but reccomended**

2. video submission - stop by the lounge and we'll record a high-quality <60s video of you showing off your work. You'll get a copy that you can share in your network and potentially have your work highlighted by Apollo (with your permission of course!)
3. a link to your social post for the social media side quest
4. If you deployed your tools, a link to your staging or production tools

## I need help!

If you need any help with your project please visit the Lounge on Level 3 near the atrium/hotel lobby or the `hackathon` channel in the [Apollo Discord server](https://discord.com/invite/apollo-labs).

For questions specific to using goose, you may also visit the [goose Discord server](https://discord.gg/block-opensource)


