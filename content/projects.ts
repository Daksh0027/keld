export type Project = {
  id: string                  // e.g. "KLD-0042"
  name: string
  year: number
  district: 'load' | 'surface' | 'proving-ground'
  status: 'ACTIVE' | 'ARCHIVED' | 'EXPERIMENTAL'
  description: string         // one sentence, no adjectives
  stack: string[]
  report: {
    problem: string
    approach: string
    decisions: string[]
    retrospective: string
    outcome: string
    failureType?: string      // proving-ground only
  }
  sourceUrl?: string
  previewUrl?: string         // surface works only
}

export const projects: Project[] = [
  // REPLACE: Add your actual backend/full-stack projects here
  {
    id: 'KLD-0001',
    name: 'Data Pipeline Worker Pool',
    year: 2024,
    district: 'load',
    status: 'ACTIVE',
    description: 'A data pipeline that moves 8k records per second from source to sink.',
    stack: ['TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    report: {
      problem: 'The existing system dropped records under load above 1k/s.',
      approach: 'Replaced the synchronous write path with a queue-backed worker pool.',
      decisions: [
        'Used Redis streams over Kafka — team already operated Redis.',
        'Chose PostgreSQL COPY over INSERT for bulk writes (10x throughput).',
      ],
      retrospective: 'The worker count should be configurable at runtime, not compile time.',
      outcome: 'Sustained 8k records/s in production with zero drops over 90 days.',
    },
    sourceUrl: 'https://github.com/placeholder/project1',
  },
  // REPLACE: Add your actual frontend projects here
  {
    id: 'KLD-0002',
    name: 'Dashboard Interface',
    year: 2023,
    district: 'surface',
    status: 'ACTIVE',
    description: 'A client-side application for visualizing high-frequency trading data.',
    stack: ['React', 'Next.js', 'Tailwind', 'WebSocket'],
    report: {
      problem: 'Previous dashboard had 300ms latency resulting in delayed data reads.',
      approach: 'Implemented WebSocket-driven state with requestAnimationFrame batching.',
      decisions: [
        'Used native WebSockets instead of Socket.io to reduce payload size.',
        'Extracted chart rendering to a separate Web Worker.',
      ],
      retrospective: 'Should have implemented canvas rendering from the start instead of DOM-based charts.',
      outcome: 'Reduced render latency to under 16ms, hitting 60fps consistently.',
    },
    previewUrl: 'https://placeholder-dashboard.com',
  },
  // REPLACE: Add your actual experimental projects here
  {
    id: 'KLD-0003',
    name: 'Distributed Cache Prototype',
    year: 2022,
    district: 'proving-ground',
    status: 'ARCHIVED',
    description: 'An attempt to build a distributed in-memory cache over UDP.',
    stack: ['Go', 'UDP', 'Raft'],
    report: {
      problem: 'TCP overhead was too high for local network micro-caching.',
      approach: 'Wrote a custom UDP protocol with application-level reliability.',
      decisions: [
        'Implemented Raft for leader election.',
        'Used a gossip protocol for node discovery.',
      ],
      retrospective: 'The complexity of implementing reliable UDP outweighed the performance gains.',
      outcome: 'System worked but was difficult to debug and maintain. Abandoned for Memcached.',
      failureType: 'Wrong abstraction',
    },
  }
]
