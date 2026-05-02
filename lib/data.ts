export const DATA = {
  archives: { 
    name: 'The Archives', code: 'KLD-D01 · Bureau of Records', 
    desc: 'Personnel file. Founding documents. Timeline of infrastructure decisions. The city does not hide its origins.', 
    tags: ['About', 'Background', 'Timeline', 'Skills registry'],
    specs: { area: '12,000 SQM', clearance: 'Lvl 2', power: 'Offline', status: 'ACTIVE', sec: 'LEVEL 3' },
    connections: ['D02', 'CORE'],
    pos: { x: 108, y: 74 }
  },
  load: { 
    name: 'The Load District', code: 'KLD-D02 · Dept. of Works', 
    desc: 'Where weight is carried. Backend systems, APIs, data pipelines — each filed as an operational report with uptime figures and post-mortems.', 
    tags: ['Backend', 'APIs', 'Databases', 'Infrastructure'],
    specs: { area: '45,000 SQM', clearance: 'Lvl 4', power: 'Optimal', status: 'ACTIVE', cap: '847 UNITS' },
    connections: ['D01', 'D03', 'CORE'],
    pos: { x: 320, y: 74 }
  },
  surface: { 
    name: 'The Surface Works', code: 'KLD-D03 · Public Interface Div.', 
    desc: 'What the public sees. Interfaces built to be used, not admired — though both tend to happen. Every component has a spec and a reason.', 
    tags: ['Frontend', 'UI/UX', 'React', 'Full-stack'],
    specs: { area: '28,000 SQM', clearance: 'Lvl 1', power: 'Nominal', status: 'ACTIVE', node: 'PUBLIC' },
    connections: ['D02'],
    pos: { x: 532, y: 74 }
  },
  proving: { 
    name: 'The Proving Ground', code: 'KLD-D04 · Classified Research', 
    desc: 'Sealed test zone. Projects that did not ship, or shipped strange. Lessons catalogued by failure type. Clearance required.', 
    tags: ['Experiments', 'Open source', 'Side projects', 'Archived'],
    specs: { area: '15,000 SQM', clearance: 'Lvl 5', power: 'Fluctuating', status: 'LOCKED', risk: 'HIGH' },
    connections: ['CORE'],
    pos: { x: 108, y: 362 }
  },
  core: { 
    name: 'Central Core', code: 'KLD-CORE · The Architect\'s Hub', 
    desc: 'Where all systems converge. The singular point of architectural decision-making. One engineer. All roads lead here.', 
    tags: ['Command centre', 'All systems', 'Active'],
    specs: { area: '100,000 SQM', clearance: 'Lvl 0 (Admin)', power: 'Maximum', status: 'OPTIMAL', auth: 'PRIMARY' },
    connections: ['D01', 'D02', 'D04', 'D05'],
    pos: { x: 320, y: 218 }
  },
  transmission: { 
    name: 'Transmission', code: 'KLD-D05 · Official Comms', 
    desc: 'All transmissions enter and exit here. State your purpose, your timeline, your constraints. Response within 48 hours. No small talk required.', 
    tags: ['Contact', 'Email', 'Availability', 'Hire'],
    specs: { area: '8,000 SQM', clearance: 'Lvl 1', power: 'Standby', status: 'LISTENING', freq: '8.4 GHZ' },
    connections: ['CORE'],
    pos: { x: 320, y: 362 }
  },
  classified: { 
    name: 'Sector Pending', code: 'KLD-D06 · Unmapped', 
    desc: 'Access restricted. Area is currently undergoing architectural restructuring. Structural integrity unknown. Proceed with caution.', 
    tags: ['Restricted', 'Under construction', 'No access'],
    specs: { area: '18,000 SQM', clearance: 'Lvl 6', power: 'Offline', status: 'LOCKED', auth: 'DENIED' },
    connections: ['CORE'],
    pos: { x: 532, y: 362 }
  }
};

export type DistrictID = keyof typeof DATA;
