App Name: J.A.R.V.I.S X

Overview:
J.A.R.V.I.S X (Joint Autonomous Reactive Virtual Intelligence System) is a production-grade neural AI Operating System interface built with Next.js 15 and powered entirely by local large language models via Ollama. It is designed for maximum privacy and high-performance cognitive augmentation, requiring no external cloud APIs. The system functions as a command-center for human-machine intelligence, exposing a modular multi-agent architecture through a futuristic, glassmorphism-styled dashboard.

Core Features:

1. Neural Terminal (Central Messaging Interface)
   A real-time conversational command center that streams WebSocket token output directly from the local LLM. The terminal renders structured agent feedback cycles alongside free-form conversation. It uses a glassmorphism card layout with backdrop-filter depth, monospace typography for AI output, and smooth animated message entry. The interface supports both typed commands and voice-initiated sessions.

2. Agent Mesh (Multi-Agent Orchestration Panel)
   A Master Agent acts as a cognitive router, intelligently decomposing complex tasks and delegating them to a mesh of specialist agents: Researcher, Developer, Automator, Memory Manager, Vision Analyst, and Planner. The dashboard displays each agent node in real-time — showing its active status, current task, completion percentage, and live log output. Agent communication flows are visualized as an animated node graph.

3. Holographic Voice Interface (Voice Orb)
   A full-duplex voice interaction system featuring an animated, pulse-state Voice Orb rendered in the primary periwinkle blue. It uses Faster-Whisper for sub-second speech-to-text transcription and Piper TTS for ultra-natural audio synthesis. The orb responds visually to audio amplitude — expanding, contracting, and glowing during active listening and speaking states, powered by Framer Motion.

4. Recursive Memory Core (Long-Term Memory Vault)
   A semantic memory system backed by ChromaDB and pgvector. It stores and retrieves context from past conversations, user preferences, and learned facts using vector embeddings. The UI displays memory entries as a searchable, filterable vault with relevance scores, timestamps, and source tags. New memories are auto-extracted from each conversation by the Memory Agent.

5. Spatial Vision Recognition (Vision Layer)
   A vision-enabled intelligence module that captures screenshots of the user's active workspace and processes them through a LLaVA-based visual reasoning model (llava via Ollama). The system can describe, annotate, and act on what it sees — enabling screen-aware automation. Results are displayed inline in the Neural Terminal with annotated bounding references.

6. Autonomous Automation Engine
   Native integration with Playwright for browser automation (open URLs, fill forms, extract data, navigate pages) and PyAutoGUI for local computer control (mouse, keyboard, window management, file operations). All automation actions are shown in a live action log with step-by-step status indicators. Dangerous actions (file deletion, form submission) require explicit user confirmation.

7. System Health Matrix (Monitoring Dashboard)
   A high-fidelity real-time telemetrics panel built with Recharts. It displays: VRAM utilization per active model, GPU load and temperature, CPU and RAM usage, active agent count, inference latency per request, and task queue depth. All metrics update via WebSocket at 1-second intervals. The layout uses a modular grid of metric cards and live sparkline charts.

8. Document Archive (RAG Vault)
   A secure local vault for indexing documents (PDF, TXT, MD, DOCX) into the retrieval-augmented generation pipeline. Uploaded documents are chunked, embedded, and stored in ChromaDB. The UI shows each document with its chunk count, embedding status, and last-queried timestamp. Users can query across all documents from the Neural Terminal.

Pages / Views:
- /chat → Neural Terminal (main conversational interface)
- /agents → Agent Mesh dashboard with live node status
- /memory → Recursive Memory Core vault and search
- /files → Document Archive with upload and RAG index status
- /monitor → System Health Matrix with live telemetrics
- /settings → Model selection, voice config, plugin toggles, API keys

Technology Stack:
- Framework: Next.js 15 with App Router
- UI: React 19, Tailwind CSS, ShadCN UI (Radix UI primitives), Lucide Icons
- AI Orchestration: Genkit 1.x
- Local Inference: Ollama running llama3 (chat/reasoning), llava (vision), gemma2 (fast responses)
- Voice STT: Faster-Whisper (base model, CUDA)
- Voice TTS: Piper TTS (en_US-lessac-medium)
- Wake Word: openWakeWord ("hey jarvis" trigger model)
- Memory / RAG: ChromaDB vector store, pgvector on PostgreSQL 16
- Charts: Recharts (sparklines, gauges, area charts)
- Animations: Framer Motion (boot sequences, orb pulse states, layout transitions)
- Backend: FastAPI (Python 3.11, async), WebSockets, SQLAlchemy 2.0
- Automation: Playwright (browser), PyAutoGUI (computer control)
- Infrastructure: Docker Compose, Nginx, Redis 7, PostgreSQL 16

Style Guidelines:
- Color palette: Primary electric Periwinkle Blue (#8282F2), background dense Charcoal Carbon (#14141F), accent Sapphire (#1769CC) for interactive elements, muted silver (#A0A0B8) for secondary text.
- Typography: 'Space Grotesk' (sans-serif, 500 weight) for headlines and module titles. 'Inter' (sans-serif, 400 weight) for body text, chat history, and dense interface data. Monospace font (JetBrains Mono or Fira Code) for LLM output, code blocks, and agent logs.
- Icons: Technical wireframe-style linear icons, 1px stroke weight, consistent with engineering software aesthetics. Use Lucide Icons throughout — never filled variants.
- Layout: Command-center modular grid. Glassmorphism cards with semi-transparent backdrop-filter (blur: 12px, bg: rgba(20,20,31,0.7)), 1px border in rgba(130,130,242,0.2). No solid-color panels — all surfaces are layered and translucent.
- Animations: Framer Motion. Boot sequence on first load (scanline sweep, module fade-in stagger). Voice Orb: idle (slow 3s pulse), listening (rapid 0.4s expand-contract), speaking (wave-form ripple). Page transitions: 200ms logarithmic ease. Agent status changes: smooth scale + opacity.
- Data density: High. Prefer compact metric cards and inline badges over verbose text. Every panel should show maximum useful data with minimum visual noise.
- No external API keys required. All inference runs locally through Ollama at http://localhost:11434.

Local Setup Requirement Note:
Users must install Ollama and pull the following models before first launch:
  ollama pull llama3
  ollama pull llava
Ollama must be running at http://localhost:11434. The app will display a system status indicator in the Health Matrix confirming model availability on startup.
