# Siimple MCP - Apollo Summit Hackfest 2025

## Requirements

To run this project, you'll need:

1. **For the chat UI** - Add to `agent/.env`:
```
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

2. **For the MCP server** - Set the Intercom access token:
```bash
# Option 1: Set in your shell
export INTERCOM_ACCESS_TOKEN=your_intercom_token_here

# Option 2: Pass when starting rover
INTERCOM_ACCESS_TOKEN=your_token rover dev --supergraph-config ./mcp/supergraph.yaml --router-config ./mcp/router.yaml --mcp ./mcp/mcp.local.yaml
```
*Note: We can provide a read-only Intercom access token if needed.*

## What We Built

We created an MCP server that gives AI agents direct access to Siimple's template catalog and help documentation. When users interact with the provided chat UI, the AI can intelligently search for website templates and answer questions about customizing their sites.

## Core Functionality

### Template Discovery
- **Search by Business Type**: Users can ask "are there templates for locksmiths?" and get relevant results
- **Template Details**: Returns template names, descriptions, and IDs that can be used to generate signup links
- **Browse All**: Users can explore the full catalog when they're just looking for inspiration

### Help & Documentation
- **Proactive Support**: When users ask "how do I change my site's colors?" the AI automatically searches help articles
- **Comprehensive Results**: Returns article titles, descriptions, and content to answer user questions
- **No Manual Search Required**: The AI determines when to search based on the user's intent

## Business Value

### Customer Acquisition
- **Reduced Friction**: Potential customers can discover the perfect template through natural conversation
- **Direct Path to Signup**: Template IDs can be used to generate signup links (https://app.getsiimple.com/signup?demo={objectID})
- **Better Template Discovery**: Users find templates they might have missed browsing manually

### Support Efficiency  
- **Self-Service First**: Common questions get answered instantly without support tickets
- **24/7 Availability**: Help articles are accessible anytime through the chat interface
- **Reduced Support Load**: Documentation answers provided before users need to contact support

## Implementation Details

We connected two key APIs through Apollo Connectors:
- **Algolia**: Powers template search with fast, relevant results
- **Intercom**: Provides access to our complete help documentation

The MCP exposes five operations that the AI can choose from based on user intent:
- `SearchTemplates` - Find templates by keyword
- `GetTemplates` - List all available templates  
- `SearchArticles` - Find help articles by topic
- `ListArticles` - Browse all documentation
- `GetArticle` - Retrieve specific article details

## Future Opportunities

This foundation enables:
- **Customer Showcases**: Extend to search actual customer sites ("Find landscapers in San Diego using Siimple")
- **Intelligent Onboarding**: Guide new users through setup based on their business type
- **Proactive Recommendations**: Suggest features and customizations based on user questions
- **Analytics Integration**: Track what users search for to inform product decisions

## The Result

We've created a conversational front door to Siimple that helps users find the right template and get the help they need - all through natural language interaction in the hackfest chat UI.

## What's Next

Our original vision was ambitious: create an MCP that could answer questions like "Show me landscapers in San Diego" by searching through actual Siimple customer websites. This would have transformed our platform into a discovery engine where potential customers could find inspiration from real businesses using our templates.

The hackfest timeline meant pivoting to something achievable - but we're thrilled with what we learned. We now understand:
- How Apollo Connectors transforms REST APIs into GraphQL
- How MCP exposes operations as AI-friendly tools
- How to structure operations for optimal AI agent selection

Post-conference, we're excited to build the full vision:
- **Customer Site Search**: Index and search actual customer websites
- **Geographic Discovery**: "Restaurants in Austin" returns real Siimple sites
- **Industry Showcases**: Let users explore success stories in their field
- **Template Recommendations**: "Sites like this one" based on real examples

The framework is powerful. We can't wait to build what we originally imagined - turning every Siimple customer site into a discoverable inspiration for the next business owner looking to get online.