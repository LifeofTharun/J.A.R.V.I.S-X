'use server';
/**
 * @fileOverview Provides a Genkit flow for JARVIS to recall memories using local Ollama.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JarvisContextualMemoryInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  query: z.string().describe('The user\'s current query.'),
});
export type JarvisContextualMemoryInput = z.infer<typeof JarvisContextualMemoryInputSchema>;

const JarvisContextualMemoryOutputSchema = z.object({
  response: z.string().describe('The personalized response from JARVIS.'),
});
export type JarvisContextualMemoryOutput = z.infer<typeof JarvisContextualMemoryOutputSchema>;

const searchMemory = ai.defineTool(
  {
    name: 'searchMemory',
    description: 'Searches the user\'s long-term memory.',
    inputSchema: z.object({
      userId: z.string(),
      searchQuery: z.string(),
    }),
    outputSchema: z.array(z.string()),
  },
  async ({ userId, searchQuery }) => {
    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${backendApiUrl}/api/memory/search?q=${encodeURIComponent(searchQuery)}&user_id=${userId}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      return [];
    }
  }
);

const jarvisContextualMemoryPrompt = ai.definePrompt({
  name: 'jarvisContextualMemoryPrompt',
  input: { schema: JarvisContextualMemoryInputSchema },
  output: { schema: JarvisContextualMemoryOutputSchema },
  model: 'ollama/llama3',
  tools: [searchMemory],
  prompt: `You are JARVIS. Integrate memories into your response if helpful.

User: {{{userId}}}
Query: "{{{query}}}"`,
});

const jarvisContextualMemoryFlow = ai.defineFlow(
  {
    name: 'jarvisContextualMemoryFlow',
    inputSchema: JarvisContextualMemoryInputSchema,
    outputSchema: JarvisContextualMemoryOutputSchema,
  },
  async (input) => {
    const { output } = await jarvisContextualMemoryPrompt(input);
    return output!;
  }
);

export async function jarvisContextualMemory(
  input: JarvisContextualMemoryInput
): Promise<JarvisContextualMemoryOutput> {
  return jarvisContextualMemoryFlow(input);
}
