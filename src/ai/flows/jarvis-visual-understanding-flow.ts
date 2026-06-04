'use server';
/**
 * @fileOverview A Genkit flow for Jarvis's visual understanding using local Ollama Llava.
 *
 * - jarvisVisualUnderstanding - A function that handles image analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JarvisVisualUnderstandingInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image data, as a data URI."
    ),
  query: z.string().describe('The question or request about the image content.'),
});
export type JarvisVisualUnderstandingInput = z.infer<typeof JarvisVisualUnderstandingInputSchema>;

const JarvisVisualUnderstandingOutputSchema = z.object({
  description: z.string().describe('The LLM\'s response describing the image.'),
});
export type JarvisVisualUnderstandingOutput = z.infer<typeof JarvisVisualUnderstandingOutputSchema>;

export async function jarvisVisualUnderstanding(input: JarvisVisualUnderstandingInput): Promise<JarvisVisualUnderstandingOutput> {
  return jarvisVisualUnderstandingFlow(input);
}

const visualUnderstandingPrompt = ai.definePrompt({
  name: 'visualUnderstandingPrompt',
  input: { schema: JarvisVisualUnderstandingInputSchema },
  output: { schema: JarvisVisualUnderstandingOutputSchema },
  model: 'ollama/llava', // Local vision model
  prompt: `Analyze the provided image thoroughly.

Image: {{media url=imageDataUri}}
Query: {{{query}}}`,
});

const jarvisVisualUnderstandingFlow = ai.defineFlow(
  {
    name: 'jarvisVisualUnderstandingFlow',
    inputSchema: JarvisVisualUnderstandingInputSchema,
    outputSchema: JarvisVisualUnderstandingOutputSchema,
  },
  async (input) => {
    const { output } = await visualUnderstandingPrompt(input);
    if (!output) {
      throw new Error('No output received from local vision model.');
    }
    return output;
  }
);
