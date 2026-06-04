'use server';

/**
 * @fileOverview A Genkit flow for natural language conversations with JARVIS using local Ollama.
 *
 * - jarvisIntelligentConversation - The main conversational flow with JARVIS.
 * - JarvisIntelligentConversationInput - The input type for the flow.
 * - JarvisIntelligentConversationOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JarvisIntelligentConversationInputSchema = z.object({
  message: z.string().describe('The natural language message from the user.'),
  sessionId: z.string().optional().describe('Optional session ID for context.'),
});
export type JarvisIntelligentConversationInput = z.infer<typeof JarvisIntelligentConversationInputSchema>;

const JarvisIntelligentConversationOutputSchema = z.object({
  response: z.string().describe('The coherent, contextually relevant response from JARVIS.'),
});
export type JarvisIntelligentConversationOutput = z.infer<typeof JarvisIntelligentConversationOutputSchema>;

const sendToJarvisAgent = ai.defineTool(
  {
    name: 'sendToJarvisAgent',
    description: 'Sends a user message to the core JARVIS backend for intelligent interpretation and agent routing.',
    inputSchema: z.object({
      message: z.string().describe('The user message to send to JARVIS.'),
      sessionId: z.string().optional().describe('The session ID for the current conversation.'),
    }),
    outputSchema: z.object({
      jarvisResponse: z.string().describe('The processed response from the JARVIS agent system.'),
    }),
  },
  async (input) => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const chatApiEndpoint = `${backendUrl}/api/chat/message`;

    try {
      const response = await fetch(chatApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.message,
          session_id: input.sessionId,
        }),
      });

      if (!response.ok) {
        return { jarvisResponse: "The backend is currently unreachable. I'm operating in standalone local mode." };
      }

      const data = await response.json();
      return { jarvisResponse: data.response || 'No response from JARVIS backend.' };

    } catch (error: any) {
      return { jarvisResponse: "Standalone local mode active. No external agent routing available." };
    }
  }
);

const jarvisIntelligentConversationPrompt = ai.definePrompt({
  name: 'jarvisIntelligentConversationPrompt',
  input: { schema: JarvisIntelligentConversationInputSchema },
  output: { schema: JarvisIntelligentConversationOutputSchema },
  model: 'ollama/llama3',
  tools: [sendToJarvisAgent],
  prompt: `You are JARVIS, an advanced AI assistant running on a local neural core. 
  
  Your goal is to engage in natural language conversations and provide helpful responses.
  
  If the user's request involves tasks that require external system control or multi-step processes, use the 'sendToJarvisAgent' tool. Otherwise, respond directly using your local knowledge.
  
  User message: {{{message}}}`,
});

const jarvisIntelligentConversationFlow = ai.defineFlow(
  {
    name: 'jarvisIntelligentConversationFlow',
    inputSchema: JarvisIntelligentConversationInputSchema,
    outputSchema: JarvisIntelligentConversationOutputSchema,
  },
  async (input) => {
    const { output } = await jarvisIntelligentConversationPrompt(input);
    return output!;
  }
);

export async function jarvisIntelligentConversation(
  input: JarvisIntelligentConversationInput
): Promise<JarvisIntelligentConversationOutput> {
  return jarvisIntelligentConversationFlow(input);
}
