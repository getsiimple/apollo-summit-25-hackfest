import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import {experimental_createMCPClient, streamText, convertToModelMessages, type UIMessage } from "ai";
// @ts-ignore
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
let mcpClient: Awaited<ReturnType<typeof experimental_createMCPClient>> | null = null;

async function getMCPClient() {
  if (mcpClient) return mcpClient;

  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:5000/mcp")
  );

  mcpClient = await experimental_createMCPClient({
    transport,
  });

  return mcpClient;
}

export const action = async function handler({
  request,
}: {
  request: Request;
}) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const client = await getMCPClient();

    const mcpTools = await client.tools();

    const result = streamText({
      model: openrouter("anthropic/claude-sonnet-4"),
      messages: convertToModelMessages(messages),
      tools: mcpTools,
      maxSteps: 5,
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "none",
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};
