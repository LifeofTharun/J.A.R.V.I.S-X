'use server';
/**
 * @fileOverview This file implements a Genkit flow for orchestrating browser and computer automation tasks via the JARVIS backend.
 *
 * - runAutomationTask - A function that handles the automation task execution process.
 * - RunAutomationTaskInput - The input type for the runAutomationTask function.
 * - RunAutomationTaskOutput - The return type for the runAutomationTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AGENT_TYPES = [
  'research',
  'coding',
  'automation',
  'memory',
  'vision',
  'planning',
  'file',
] as const; // Define agent types from the JARVIS architecture

const RunAutomationTaskInputSchema = z.object({
  userId: z.string().describe('The ID of the user initiating the task.'),
  command: z.string().describe('The natural language command for the automation task (e.g., "open YouTube and search for latest AI news").'),
});
export type RunAutomationTaskInput = z.infer<typeof RunAutomationTaskInputSchema>;

const RunAutomationTaskOutputSchema = z.object({
  taskId: z.string().describe('The ID of the initiated automation task in the backend.'),
  status: z.string().describe('The initial status of the automation task (e.g., "pending").'),
  message: z.string().optional().describe('Any immediate feedback or message from the agent.'),
});
export type RunAutomationTaskOutput = z.infer<typeof RunAutomationTaskOutputSchema>;

// Define a Genkit tool to interact with the JARVIS backend's agent API
const callJarvisAgentEndpoint = ai.defineTool(
  {
    name: 'callJarvisAgentEndpoint',
    description: 'Calls the JARVIS backend\'s /api/agents/run endpoint to execute a task using a specified agent type. This tool is used by the LLM to delegate tasks to the appropriate JARVIS specialist agent.',
    inputSchema: z.object({
      agentType: z.enum(AGENT_TYPES).describe('The type of JARVIS agent to run (e.g., "automation", "research", "coding").'),
      query: z.string().describe('The natural language query or instruction for the agent to process.'),
      userId: z.string().describe('The ID of the user for whom the agent task is being executed.'),
    }),
    outputSchema: z.object({
      taskId: z.string().describe('The ID of the initiated task.'),
      status: z.string().describe('The initial status of the task.'),
      message: z.string().optional().describe('Any initial message or error from the agent.'),
    }),
  },
  async ({ agentType, query, userId }) => {
    const backendApiUrl = process.env.BACKEND_API_URL;
    if (!backendApiUrl) {
      throw new Error('BACKEND_API_URL environment variable is not set. Please configure it to point to your JARVIS backend.');
    }

    try {
      const response = await fetch(`${backendApiUrl}/api/agents/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed for the backend API, e.g.:
          // 'Authorization': `Bearer ${process.env.JARVIS_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          user_id: userId,
          agent_type: agentType,
          query: query,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Backend API call failed with status ${response.status}: ${errorData.message || JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      // The backend example shows a 'tasks' table with 'id' and 'status'.
      // Assuming the /api/agents/run endpoint returns an object like { id: "task-uuid", status: "pending", message?: "..." }
      return {
        taskId: data.id || data.taskId, // Handle potential key differences like 'id' vs 'taskId'
        status: data.status || 'pending', // Default to 'pending' if status is not explicitly returned
        message: data.message || undefined,
      };
    } catch (error: any) {
      console.error('Error calling JARVIS agent endpoint:', error);
      return {
        taskId: 'error-' + Date.now().toString(), // Provide a unique ID for error cases
        status: 'failed',
        message: `Failed to initiate agent task: ${error.message || 'Unknown error'}`,
      };
    }
  }
);

// Define a Genkit prompt that instructs the LLM to use the defined tool
const automationAgentPrompt = ai.definePrompt({
  name: 'automationAgentPrompt',
  tools: [callJarvisAgentEndpoint],
  input: { schema: RunAutomationTaskInputSchema },
  output: { schema: RunAutomationTaskOutputSchema }, // The output schema matches the tool's output, as the flow's primary action is tool invocation.
  system: `You are an intelligent assistant designed to help users automate browser and computer tasks.
Your primary function in this flow is to identify automation-related commands and delegate them to the JARVIS backend's 'automation' agent.
If the user's request clearly describes an action that involves controlling the browser or interacting with the computer (e.g., opening a website, searching, clicking elements, file operations), you MUST use the 'callJarvisAgentEndpoint' tool.
Set the 'agentType' parameter of the tool to 'automation'.
The 'query' parameter for the tool should be the exact natural language instruction provided by the user, formatted for the automation agent to understand.
Do NOT attempt to perform the action yourself or generate an answer; only trigger the automation tool.
If the request is not related to automation, respond by stating that you are designed for automation tasks.
`,
  prompt: `User's command: {{{command}}}`,
});

// Define the Genkit flow that orchestrates the automation task
const runAutomationTaskFlow = ai.defineFlow(
  {
    name: 'runAutomationTaskFlow',
    inputSchema: RunAutomationTaskInputSchema,
    outputSchema: RunAutomationTaskOutputSchema,
  },
  async (input) => {
    // Execute the prompt. The LLM will decide whether to call the tool based on the system instructions and user command.
    const { output } = await automationAgentPrompt(input);

    // If the LLM successfully called the tool, 'output' will contain the tool's return value,
    // which conforms to RunAutomationTaskOutputSchema.
    if (!output) {
      // This case should ideally not happen if the prompt is correctly designed to always trigger the tool for automation commands.
      // However, as a fallback, we can return a generic error or a message indicating no tool was called.
      console.warn('LLM did not trigger the automation tool or returned empty output.');
      return {
        taskId: 'no-tool-called-' + Date.now().toString(),
        status: 'failed',
        message: 'Could not process the automation command. The AI did not trigger the automation agent.',
      };
    }

    return output as RunAutomationTaskOutput;
  }
);

// Export a wrapper function to easily call the Genkit flow from other parts of the application
export async function runAutomationTask(input: RunAutomationTaskInput): Promise<RunAutomationTaskOutput> {
  return runAutomationTaskFlow(input);
}
