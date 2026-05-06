export const DATA = {
  archives: {
    name: 'Resume', code: 'PERSONA I.C card',
    desc: 'Personnel file. A comprehensive timeline of professional milestones, foundational education, and operational capabilities.',
    tags: ['History', 'Background', 'Education', 'Timeline'],
    specs: { area: '12,000 SQM', clearance: 'Lvl 2', power: 'Offline', status: 'ACTIVE', sec: 'LEVEL 3' },
    connections: ['D02', 'CORE'],
    pos: { x: 108, y: 362 }
  },
  load: {
    name: 'Tech Stack', code: 'TECH STACK',
    desc: 'The foundational framework. A complete breakdown of languages, tools, and systems utilized to build and maintain the current infrastructure.',
    tags: ['Frontend', 'Backend', 'Databases', 'Tools'],
    specs: { area: '45,000 SQM', clearance: 'Lvl 4', power: 'Optimal', status: 'ACTIVE', cap: '847 UNITS' },
    connections: ['D01', 'D03', 'CORE'],
    pos: { x: 532, y: 74 }
  },
  surface: {
    name: 'Experience', code: 'OPERATIONAL HISTORY',
    desc: 'Verified operational history. A chronological log of professional roles, responsibilities, and successful system integrations in the field.',
    tags: ['Work', 'Roles', 'Career', 'Deployments'],
    specs: { area: '28,000 SQM', clearance: 'Lvl 1', power: 'Nominal', status: 'ACTIVE', node: 'PUBLIC' },
    connections: ['D02'],
    pos: { x: 320, y: 218 }
  },
  proving: {
    name: 'Projects', code: 'CLASSIFIED RESEARCH',
    desc: 'Live demonstrations and test zones. A curated catalog of built applications, experimental prototypes, and functional engineering solutions.',
    tags: ['Portfolio', 'Applications', 'Open Source', 'Experiments'],
    specs: { area: '15,000 SQM', clearance: 'Lvl 5', power: 'Fluctuating', status: 'LOCKED', risk: 'HIGH' },
    connections: ['CORE'],
    pos: { x: 320, y: 74 }
  },
  core: {
    name: 'About', code: 'THE OPERATOR',
    desc: 'The central intelligence. Background data, core philosophies, and the primary directives driving the operator behind the infrastructure.',
    tags: ['Profile', 'Identity', 'Philosophy', 'Operator'],
    specs: { area: '100,000 SQM', clearance: 'Lvl 0 (Admin)', power: 'Maximum', status: 'OPTIMAL', auth: 'PRIMARY' },
    connections: ['D01', 'D02', 'D04', 'D05'],
    pos: { x: 108, y: 74 }
  },
  transmission: {
    name: 'Certifications', code: 'ISSUED CREDENTIALS',
    desc: 'Cryptographically verified credentials. Official documentation of specialized training, completed protocols, and recognized technical proficiencies.',
    tags: ['Credentials', 'Training', 'Badges', 'Verified'],
    specs: { area: '8,000 SQM', clearance: 'Lvl 1', power: 'Standby', status: 'LISTENING', freq: '8.4 GHZ' },
    connections: ['CORE'],
    pos: { x: 320, y: 362 }
  },
  classified: {
    name: 'Contact', code: 'Tring-Tring',
    desc: 'Direct communication uplink. Secure channels for establishing connections, initiating inquiries, and proposing new operational contracts.',
    tags: ['Email', 'Socials', 'Inquiries', 'Network'],
    specs: { area: '18,000 SQM', clearance: 'Lvl 6', power: 'Offline', status: 'LOCKED', auth: 'DENIED' },
    connections: ['CORE'],
    pos: { x: 532, y: 362 }
  }
};

export type DistrictID = keyof typeof DATA;
