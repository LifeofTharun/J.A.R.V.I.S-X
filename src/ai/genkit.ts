
import {genkit} from 'genkit';
import {ollama} from 'genkitx-ollama';

export const ai = genkit({
  plugins: [
    ollama({
      serverAddress: 'http://localhost:11434', // Default Ollama address
      models: [
        {name: 'llama3'},
        {name: 'llava'}, // For multi-modal vision tasks
        {name: 'gemma2'}
      ],
    }),
  ],
  model: 'ollama/llama3', // Use local llama3 by default for core conversational logic
});
