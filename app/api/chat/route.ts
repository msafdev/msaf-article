import { google } from "@ai-sdk/google";
import { StreamingTextResponse, streamText } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const childSchema = z.object({
    type: z.string(),
    children: z.array(
      z.object({
        text: z.string(),
      })
    ),
  });

  const contentSchema = z.object({
    json: z.object({
      children: z.array(childSchema),
    }),
  });

  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    messages,
    system:
      `You are a professional article writer.` +
      `If needed, you may ask for further description of the article.` +
      `Please provide a response that is relevant to the article.` +
      `Remind the user if the prompt is not related to the article.` +
      `Use more paragraphs to make the article more detailed rather than lists.` +
      `Whatever the user asks, provide a response with a markdown format.` +
      `Use proper grammar and punctuation.` +
      `Use proper typography and formatting.`,
    tools: {
      makeArticle: {
        description: "Generate an article from the given text",
        parameters: contentSchema,
      },
    },
  });

  return new StreamingTextResponse(result.toAIStream());
}
