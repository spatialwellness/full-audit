export interface LayoutExample {
  id: string;
  name: string;
  tagline: string;
  description: string;
  whenToUse: string[];
  benefits: string[];
  svgDiagram: string;
}

export const layoutExamples: LayoutExample[] = [
  {
    id: "zonering",
    name: "De Zonering",
    tagline: "Focus and collaboration - clearly separated",
    description:
      "The space is divided into distinct zones: a quiet focus area on one side and a collaborative zone on the other. A buffer zone (plants, shelving, acoustic panels) sits between them to prevent sound bleed. Each zone has its own visual identity to signal the expected behaviour.",
    whenToUse: [
      "Open-plan offices with mixed work types",
      "Teams that need both deep focus and frequent collaboration",
      "Environments where noise complaints are common",
      "Organisations transitioning to activity-based working",
    ],
    benefits: [
      "Reduces context-switching noise distraction by up to 40%",
      "Gives employees agency over their environment",
      "Supports neurodiverse employees with predictable zones",
      "Natural acoustic separation without full walls",
    ],
    svgDiagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <!-- Background -->
  <rect width="400" height="280" fill="#f6f2f0" rx="8"/>
  <!-- Room outline -->
  <rect x="20" y="20" width="360" height="240" fill="none" stroke="#44242b" stroke-width="2" rx="4"/>
  <!-- Focus Zone -->
  <rect x="30" y="30" width="155" height="220" fill="#dde8d8" rx="4" opacity="0.8"/>
  <text x="107" y="55" text-anchor="middle" font-family="serif" font-size="11" fill="#556c23" font-weight="bold">FOCUS ZONE</text>
  <!-- Desks in focus zone -->
  <rect x="45" y="65" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="45" y="110" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="45" y="155" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="45" y="200" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="120" y="65" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="120" y="110" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="120" y="155" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="120" y="200" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <!-- Buffer Zone -->
  <rect x="188" y="30" width="25" height="220" fill="#cbb8b2" rx="3" opacity="0.6"/>
  <text x="200" y="145" text-anchor="middle" font-family="serif" font-size="8" fill="#44242b" transform="rotate(-90 200 145)">BUFFER</text>
  <!-- Collab Zone -->
  <rect x="216" y="30" width="154" height="220" fill="#f8e8d8" rx="4" opacity="0.8"/>
  <text x="293" y="55" text-anchor="middle" font-family="serif" font-size="11" fill="#F17F05" font-weight="bold">COLLAB ZONE</text>
  <!-- Meeting table -->
  <ellipse cx="293" cy="130" rx="60" ry="45" fill="#fff" stroke="#cbb8b2" stroke-width="1.5"/>
  <!-- Chairs around table -->
  <circle cx="293" cy="80" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="293" cy="180" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="237" cy="130" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="349" cy="130" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="250" cy="97" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="336" cy="97" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1.5"/>
  <!-- Whiteboard -->
  <rect x="225" y="200" width="120" height="40" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="285" y="224" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b">Whiteboard</text>
  <!-- Door -->
  <rect x="170" y="255" width="60" height="5" fill="#44242b" rx="2"/>
  <text x="200" y="275" text-anchor="middle" font-family="serif" font-size="8" fill="#44242b">entrance</text>
</svg>`,
  },
  {
    id: "raamprincipe",
    name: "Het Raamprincipe",
    tagline: "All workstations facing natural light",
    description:
      "Every primary workstation is positioned to take advantage of natural daylight. Desks run parallel to windows rather than facing them directly (which causes glare) or with windows behind (which causes screen reflections). Circulation routes and less critical tasks sit in the darker interior areas.",
    whenToUse: [
      "Spaces with good window access",
      "Any office aiming to reduce eye strain and fatigue",
      "Organisations where alertness and mood matter",
      "Spaces where lighting complaints are common",
    ],
    benefits: [
      "Natural daylight improves alertness and reduces fatigue",
      "Prevents glare and screen reflections",
      "Supports circadian rhythm regulation",
      "Reduces dependency on artificial lighting",
    ],
    svgDiagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <!-- Background -->
  <rect width="400" height="280" fill="#f6f2f0" rx="8"/>
  <!-- Room outline -->
  <rect x="20" y="20" width="360" height="240" fill="none" stroke="#44242b" stroke-width="2" rx="4"/>
  <!-- Windows on top wall -->
  <rect x="50" y="15" width="80" height="12" fill="#cddde4" stroke="#44242b" stroke-width="1.5" rx="2"/>
  <rect x="160" y="15" width="80" height="12" fill="#cddde4" stroke="#44242b" stroke-width="1.5" rx="2"/>
  <rect x="270" y="15" width="80" height="12" fill="#cddde4" stroke="#44242b" stroke-width="1.5" rx="2"/>
  <text x="200" y="12" text-anchor="middle" font-family="serif" font-size="9" fill="#556c23">WINDOWS - NATURAL LIGHT</text>
  <!-- Light rays -->
  <line x1="90" y1="27" x2="90" y2="70" stroke="#F17F05" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.6"/>
  <line x1="200" y1="27" x2="200" y2="70" stroke="#F17F05" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.6"/>
  <line x1="310" y1="27" x2="310" y2="70" stroke="#F17F05" stroke-width="0.5" stroke-dasharray="3,3" opacity="0.6"/>
  <!-- Desks parallel to windows, first row -->
  <rect x="40" y="65" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="75" y="87" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">desk</text>
  <rect x="125" y="65" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="160" y="87" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">desk</text>
  <rect x="210" y="65" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="245" y="87" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">desk</text>
  <rect x="295" y="65" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="330" y="87" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">desk</text>
  <!-- Second row -->
  <rect x="40" y="120" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="125" y="120" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="210" y="120" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="295" y="120" width="70" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <!-- Interior area label -->
  <rect x="40" y="175" width="320" height="70" fill="#f0ebe7" rx="4" opacity="0.8"/>
  <text x="200" y="200" text-anchor="middle" font-family="serif" font-size="11" fill="#44242b">Interior Zone</text>
  <text x="200" y="218" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b">Storage, printing, informal meeting</text>
  <!-- Arrow showing person orientation -->
  <text x="200" y="50" text-anchor="middle" font-family="serif" font-size="9" fill="#F17F05" font-weight="bold">Light falls from the side - no glare</text>
</svg>`,
  },
  {
    id: "stille-hoek",
    name: "De Stille Hoek",
    tagline: "A dedicated low-stimulus refuge",
    description:
      "A dedicated prikkelarme (low-stimulus) zone in a corner or alcove of the office. This area has reduced lighting levels, acoustic absorption on all available surfaces, minimal visual clutter, and clear signage that it is a quiet space. Not a meeting room - a true refuge for focus and sensory recovery.",
    whenToUse: [
      "Offices with neurodiverse employees",
      "High-stimulus open-plan environments",
      "Teams with high rates of reported burnout or fatigue",
      "Any office where employees struggle to concentrate",
    ],
    benefits: [
      "Essential for autistic and ADHD employees",
      "Reduces stress hormones measurably",
      "Increases productivity for focus tasks",
      "Demonstrates genuine inclusion commitment",
    ],
    svgDiagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <!-- Background room -->
  <rect width="400" height="280" fill="#f6f2f0" rx="8"/>
  <!-- Main room -->
  <rect x="20" y="20" width="360" height="240" fill="none" stroke="#44242b" stroke-width="2" rx="4"/>
  <!-- Open plan area -->
  <rect x="30" y="30" width="220" height="220" fill="#f6f2f0" rx="4" opacity="0.5"/>
  <!-- Desks in main area -->
  <rect x="50" y="50" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="115" y="50" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="50" y="95" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="115" y="95" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="50" y="140" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="115" y="140" width="50" height="30" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="50" y="185" width="115" height="50" fill="#f0ebe7" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="107" y="214" text-anchor="middle" font-family="serif" font-size="8" fill="#44242b">Team table</text>
  <!-- Open plan label -->
  <text x="127" y="47" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b">Open plan area</text>
  <!-- Acoustic partition -->
  <rect x="250" y="30" width="10" height="220" fill="#cbb8b2" rx="3" opacity="0.8"/>
  <!-- Quiet zone -->
  <rect x="263" y="30" width="107" height="220" fill="#dde8d8" rx="4" opacity="0.85"/>
  <text x="316" y="55" text-anchor="middle" font-family="serif" font-size="10" fill="#556c23" font-weight="bold">QUIET ZONE</text>
  <!-- Sound waves crossed out -->
  <text x="316" y="72" text-anchor="middle" font-size="14">🔇</text>
  <!-- Focus pod desks -->
  <rect x="273" y="90" width="90" height="40" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="318" y="114" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">focus desk</text>
  <rect x="273" y="145" width="90" height="40" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="318" y="169" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">focus desk</text>
  <!-- Plant -->
  <circle cx="316" cy="220" r="20" fill="#556c23" opacity="0.4"/>
  <circle cx="316" cy="210" r="14" fill="#556c23" opacity="0.6"/>
  <text x="316" y="240" text-anchor="middle" font-family="serif" font-size="8" fill="#556c23">plant buffer</text>
  <!-- Acoustic panels shown on walls -->
  <rect x="263" y="32" width="15" height="50" fill="#9aada0" rx="2" opacity="0.7"/>
  <rect x="263" y="90" width="8" height="50" fill="#9aada0" rx="2" opacity="0.7"/>
  <text x="275" y="160" font-family="serif" font-size="7" fill="#44242b" transform="rotate(-90 275 155)">acoustic</text>
</svg>`,
  },
  {
    id: "flexibele-route",
    name: "De Flexibele Route",
    tagline: "Activity-based working with clear circulation",
    description:
      "A fluid layout organised around a clear central circulation route. Different activity settings are arranged around the edges and in clusters: focus booths, collaboration tables, phone zones and social spaces. Employees choose their setting based on the task at hand. The route makes navigation intuitive and prevents the confusion that activity-based working can create.",
    whenToUse: [
      "Organisations with genuine flexible or hybrid working",
      "Offices with varied task types throughout the day",
      "Teams that have moved beyond fixed desks",
      "Spaces being redesigned from scratch",
    ],
    benefits: [
      "Maximises use of every square metre",
      "Supports natural movement throughout the day",
      "Reduces the monotony of fixed-desk working",
      "Each zone can be acoustically tuned to its purpose",
    ],
    svgDiagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <!-- Background -->
  <rect width="400" height="280" fill="#f6f2f0" rx="8"/>
  <!-- Room outline -->
  <rect x="20" y="20" width="360" height="240" fill="none" stroke="#44242b" stroke-width="2" rx="4"/>
  <!-- Central route -->
  <rect x="165" y="20" width="70" height="240" fill="#e8e4e0" rx="0" opacity="0.6"/>
  <text x="200" y="145" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b" transform="rotate(-90 200 140)">CIRCULATION ROUTE</text>
  <!-- Top left - Focus booths -->
  <rect x="30" y="30" width="125" height="100" fill="#dde8d8" rx="6" opacity="0.8"/>
  <text x="92" y="50" text-anchor="middle" font-family="serif" font-size="9" fill="#556c23" font-weight="bold">Focus Booths</text>
  <rect x="40" y="58" width="30" height="55" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="80" y="58" width="30" height="55" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="120" y="58" width="27" height="55" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <!-- Top right - Collab tables -->
  <rect x="245" y="30" width="125" height="100" fill="#f8e8d8" rx="6" opacity="0.8"/>
  <text x="307" y="50" text-anchor="middle" font-family="serif" font-size="9" fill="#F17F05" font-weight="bold">Collaboration</text>
  <ellipse cx="307" cy="85" rx="45" ry="32" fill="#fff" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="307" cy="50" r="7" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="307" cy="120" r="7" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="258" cy="85" r="7" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="356" cy="85" r="7" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <!-- Bottom left - Phone zone -->
  <rect x="30" y="150" width="125" height="100" fill="#f0ebe7" rx="6" opacity="0.8"/>
  <text x="92" y="170" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b" font-weight="bold">Phone Zone</text>
  <rect x="40" y="178" width="35" height="60" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="85" y="178" width="35" height="60" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="57" y="212" text-anchor="middle" font-family="serif" font-size="7" fill="#44242b">call</text>
  <text x="102" y="212" text-anchor="middle" font-family="serif" font-size="7" fill="#44242b">call</text>
  <!-- Bottom right - Social -->
  <rect x="245" y="150" width="125" height="100" fill="#f8e8d8" rx="6" opacity="0.7"/>
  <text x="307" y="170" text-anchor="middle" font-family="serif" font-size="9" fill="#F17F05" font-weight="bold">Social + Kitchen</text>
  <rect x="255" y="178" width="105" height="60" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <text x="307" y="212" text-anchor="middle" font-family="serif" font-size="8" fill="#44242b">informal seating</text>
  <!-- Arrows on route -->
  <text x="200" y="35" text-anchor="middle" font-family="serif" font-size="14" fill="#44242b">↕</text>
  <text x="200" y="255" text-anchor="middle" font-family="serif" font-size="14" fill="#44242b">↕</text>
</svg>`,
  },
  {
    id: "groene-lint",
    name: "Het Groene Lint",
    tagline: "Biophilia as the organising principle",
    description:
      "A continuous ribbon of plant life runs through the office as a structural and wayfinding element. This green spine serves multiple functions: acoustic absorption, biophilic stimulation, visual softening, and natural zone definition. The plants signal where the collaborative zone ends and the focus zone begins without the need for hard partitions.",
    whenToUse: [
      "Offices prioritising employee wellbeing",
      "Open-plan spaces needing visual and acoustic separation",
      "Organisations communicating sustainability values",
      "Spaces where hard partitions are not possible or desirable",
    ],
    benefits: [
      "Proven stress reduction through biophilic contact",
      "Soft acoustic absorption from foliage and planters",
      "Improves air quality and humidity",
      "Creates visual identity and clear wayfinding",
    ],
    svgDiagram: `<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
  <!-- Background -->
  <rect width="400" height="280" fill="#f6f2f0" rx="8"/>
  <!-- Room outline -->
  <rect x="20" y="20" width="360" height="240" fill="none" stroke="#44242b" stroke-width="2" rx="4"/>
  <!-- Left desk area -->
  <rect x="30" y="30" width="135" height="220" fill="#f6f2f0" rx="4" opacity="0.5"/>
  <!-- Desks left -->
  <rect x="40" y="45" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="40" y="92" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="40" y="139" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="40" y="186" width="55" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="110" y="45" width="45" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="110" y="92" width="45" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="110" y="139" width="45" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <rect x="110" y="186" width="45" height="35" fill="#fff" stroke="#cbb8b2" stroke-width="1.5" rx="3"/>
  <!-- Green ribbon (the spine) -->
  <rect x="168" y="22" width="40" height="236" fill="#556c23" rx="4" opacity="0.15"/>
  <!-- Individual plants along the spine -->
  <circle cx="188" cy="45" r="14" fill="#556c23" opacity="0.7"/>
  <circle cx="188" cy="45" r="9" fill="#9aada0" opacity="0.6"/>
  <circle cx="188" cy="90" r="14" fill="#556c23" opacity="0.7"/>
  <circle cx="188" cy="90" r="9" fill="#9aada0" opacity="0.6"/>
  <circle cx="188" cy="135" r="14" fill="#556c23" opacity="0.7"/>
  <circle cx="188" cy="135" r="9" fill="#9aada0" opacity="0.6"/>
  <circle cx="188" cy="180" r="14" fill="#556c23" opacity="0.7"/>
  <circle cx="188" cy="180" r="9" fill="#9aada0" opacity="0.6"/>
  <circle cx="188" cy="225" r="14" fill="#556c23" opacity="0.7"/>
  <circle cx="188" cy="225" r="9" fill="#9aada0" opacity="0.6"/>
  <!-- Label -->
  <text x="188" y="15" text-anchor="middle" font-family="serif" font-size="9" fill="#556c23" font-weight="bold">Green Spine</text>
  <!-- Right area - collab -->
  <rect x="215" y="30" width="155" height="220" fill="#f8e8d8" rx="4" opacity="0.6"/>
  <text x="293" y="52" text-anchor="middle" font-family="serif" font-size="9" fill="#F17F05" font-weight="bold">Collaborative Zone</text>
  <!-- Meeting table right -->
  <ellipse cx="293" cy="130" rx="60" ry="50" fill="#fff" stroke="#cbb8b2" stroke-width="1.5"/>
  <circle cx="293" cy="76" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="293" cy="184" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="229" cy="130" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="357" cy="130" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="244" cy="96" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <circle cx="342" cy="96" r="8" fill="#f6f2f0" stroke="#cbb8b2" stroke-width="1"/>
  <!-- Plants at corners -->
  <circle cx="225" cy="45" r="12" fill="#556c23" opacity="0.5"/>
  <circle cx="357" cy="45" r="12" fill="#556c23" opacity="0.5"/>
  <circle cx="225" cy="235" r="10" fill="#556c23" opacity="0.5"/>
  <circle cx="357" cy="235" r="10" fill="#556c23" opacity="0.5"/>
  <!-- Left zone label -->
  <text x="82" y="270" text-anchor="middle" font-family="serif" font-size="9" fill="#44242b">Focus Zone</text>
</svg>`,
  },
];

export function getLayoutById(id: string): LayoutExample | undefined {
  return layoutExamples.find((l) => l.id === id);
}
