export interface AfscProfile {
  label: string;
  tasks: string[];
}

// Keyed by first 3 characters of AFSC (e.g. "3D1" matches 3D1X1, 3D1X2, etc.)
export const AFSC_PROFILES: Record<string, AfscProfile> = {
  "1A1": {
    label: "Flight Engineer",
    tasks: [
      "Conduct pre-flight, in-flight, and post-flight inspections",
      "Monitor aircraft systems and fuel management during flight",
      "Complete aircraft forms and document discrepancies",
      "Coordinate with maintenance on write-ups and cleared items",
      "Brief crew on aircraft status and system limitations",
    ],
  },
  "1A2": {
    label: "Aircraft Loadmaster",
    tasks: [
      "Plan and compute aircraft weight, balance, and cargo loads",
      "Load, restrain, and document cargo and passengers",
      "Brief passengers on emergency procedures and safety",
      "Perform airdrop computations and coordinate with drop zone",
      "Complete AFTO 781 and cargo documentation after each mission",
    ],
  },
  "1N0": {
    label: "All Source Intelligence",
    tasks: [
      "Analyze threat reporting and update current intelligence assessments",
      "Produce and brief intelligence products for leadership",
      "Draft OPSUMs and threat environment updates",
      "Coordinate intelligence requirements with supported units",
      "Maintain situational awareness databases and map products",
    ],
  },
  "2A3": {
    label: "Avionics Systems",
    tasks: [
      "Troubleshoot and repair avionics systems using technical orders",
      "Perform bench and on-equipment maintenance on LRUs",
      "Document all maintenance actions in G081/IMDS",
      "Track and manage time change items and bench stock",
      "Coordinate with production superintendent on job priority",
    ],
  },
  "2A5": {
    label: "Aerospace Ground Equipment",
    tasks: [
      "Inspect, service, and repair AGE assets per technical orders",
      "Perform scheduled periodic inspections",
      "Document maintenance actions and discrepancies in IMDS",
      "Coordinate equipment delivery to flight line and units",
      "Track equipment availability and report status to section chief",
    ],
  },
  "2A6": {
    label: "Aerospace Propulsion",
    tasks: [
      "Inspect, remove, and install aircraft engines per T.O.",
      "Perform engine runs, functional checks, and troubleshoot faults",
      "Document all maintenance actions in G081/IMDS",
      "Track time change items and manage engine historical records",
      "Brief production superintendent on engine status and write-ups",
    ],
  },
  "2A7": {
    label: "Aircraft Metals Technology",
    tasks: [
      "Perform structural repairs on aircraft per technical orders",
      "Fabricate replacement parts and brackets",
      "Inspect aircraft structure for corrosion, cracks, and damage",
      "Document repairs and submit engineering disposition requests",
      "Coordinate with QA on non-standard repair approvals",
    ],
  },
  "2M0": {
    label: "Missile and Space Systems Maintenance",
    tasks: [
      "Perform scheduled maintenance on missile systems",
      "Document maintenance actions and discrepancies",
      "Coordinate with command post on system status",
      "Complete post-maintenance operational checks",
      "Maintain strict technical order compliance during all tasks",
    ],
  },
  "2S0": {
    label: "Materiel Management",
    tasks: [
      "Process supply requests and issue items through SBSS",
      "Manage equipment accountability and custodian records",
      "Receive, store, and issue supplies and repair parts",
      "Conduct bench stock reviews and supply point inventories",
      "Coordinate with maintenance on parts priority and requisitions",
    ],
  },
  "2T1": {
    label: "Vehicle Operations",
    tasks: [
      "Operate the vehicle dispatch center and assign vehicles to missions",
      "Perform operator maintenance checks before and after each trip",
      "Document vehicle discrepancies in OLVIMS",
      "Brief drivers on route conditions, hazards, and safety",
      "Coordinate special mission vehicle requests and scheduling",
    ],
  },
  "2W0": {
    label: "Munitions Systems",
    tasks: [
      "Inspect, assemble, and properly store munitions assets",
      "Maintain accountability records in MICAS",
      "Deliver and pick up munitions from the flight line",
      "Conduct periodic inventories and reconcile discrepancies",
      "Brief section chief on daily production status and mission load",
    ],
  },
  "3D0": {
    label: "Cyber Transport Systems",
    tasks: [
      "Configure and maintain routers, switches, and firewalls",
      "Monitor network performance and troubleshoot connectivity",
      "Implement and verify network security configurations",
      "Document network topology changes and maintain diagrams",
      "Coordinate circuit outages, service restoration, and change windows",
    ],
  },
  "3D1": {
    label: "Cyber Systems Operations",
    tasks: [
      "Manage user accounts, permissions, and access control in AD",
      "Process help desk tickets and troubleshoot workstation issues",
      "Apply OS patches, security updates, and STIG remediations",
      "Monitor system health dashboards and respond to alerts",
      "Brief the flight chief on overnight incidents and open tickets",
    ],
  },
  "3P0": {
    label: "Security Forces",
    tasks: [
      "Conduct entry control point operations and verify base access",
      "Perform law enforcement patrols and respond to incidents",
      "Complete BlueTeam incident reports and shift journals",
      "Brief oncoming shift on area activity and threat updates",
      "Execute Random Antiterrorism Measures (RAMs) per the plan",
    ],
  },
  "3S0": {
    label: "Personnel",
    tasks: [
      "Process personnel actions and updates in MilPDS",
      "Manage in-processing and out-processing for unit members",
      "Handle promotion, assignment, and separation actions",
      "Answer customer inquiries at the MPF service desk",
      "Audit personnel records and correct discrepancies",
    ],
  },
  "3S2": {
    label: "Education & Training",
    tasks: [
      "Manage unit training records in TTMS and myLearning",
      "Schedule and track ancillary and ancillary CBT completions",
      "Process Professional Military Education nominations and orders",
      "Brief leadership on training completion rates and gaps",
      "Coordinate with AFPC on assignment eligibility and training requirements",
    ],
  },
  "4N0": {
    label: "Aerospace Medical Service",
    tasks: [
      "Provide patient care and triage walk-in appointments",
      "Manage medical records, documentation, and AHLTA entries",
      "Schedule and process aerospace physical exams",
      "Administer immunizations and track individual readiness",
      "Coordinate medical readiness for deploying and TDY personnel",
    ],
  },
  "6F0": {
    label: "Financial Management",
    tasks: [
      "Process DTS travel vouchers, advances, and authorization amendments",
      "Manage unit GPC reconciliation and spending compliance",
      "Execute and track budget documents and obligation status",
      "Resolve pay discrepancies and entitlement issues for Airmen",
      "Brief resource advisor on budget execution and burn rate",
    ],
  },
};

export interface AdditionalDuty {
  id: string;
  label: string;
  description: string;
}

export const COMMON_ADDITIONAL_DUTIES: AdditionalDuty[] = [
  {
    id: "ctk",
    label: "CTK / Tool Room",
    description: "Composite Tool Kit accountability and tool control program",
  },
  {
    id: "pmel",
    label: "PMEL / TMDE",
    description: "Precision measurement equipment scheduling and tracking",
  },
  {
    id: "hazmat",
    label: "HAZMAT Monitor",
    description: "Hazardous materials program management and inventory tracking",
  },
  {
    id: "lps",
    label: "LPS Monitor",
    description: "Lightning Protection System inspection and documentation",
  },
  {
    id: "lmr",
    label: "LMR Monitor",
    description: "Land Mobile Radio accountability and serviceability tracking",
  },
  {
    id: "extinguisher",
    label: "Fire Extinguisher Monitor",
    description: "Fire extinguisher inspection, serviceability, and replacement coordination",
  },
  {
    id: "records",
    label: "Records Management",
    description: "Unit records custodian — disposition scheduling and file plan maintenance",
  },
  {
    id: "gpc",
    label: "GPC Cardholder",
    description: "Government Purchase Card spending, reconciliation, and compliance",
  },
  {
    id: "safety",
    label: "Unit Safety Rep",
    description: "Safety inspections, mishap reporting, and ORM program management",
  },
  {
    id: "training",
    label: "Training Monitor",
    description: "TTMS, ancillary CBT tracking, and ADLS program management",
  },
  {
    id: "equipment",
    label: "Equipment Custodian",
    description: "Property book accountability, transfers, and annual inventory",
  },
  {
    id: "dts",
    label: "Defense Travel Admin",
    description: "DTS order processing, voucher review, and traveler support",
  },
  {
    id: "security",
    label: "Unit Security Manager",
    description: "Clearance monitoring, SF86s, DISS/JPAS management",
  },
  {
    id: "adpe",
    label: "ADPE Custodian",
    description: "IT equipment accountability, turn-ins, and hardware lifecycle",
  },
  {
    id: "vcnco",
    label: "Vehicle Control NCO",
    description: "Unit vehicle program, operator records, and accident reporting",
  },
  {
    id: "ufpm",
    label: "Fitness Program Manager",
    description: "PT test scheduling, waivers, failures, and fitness reporting",
  },
];

export function getAfscProfile(afsc: string): AfscProfile | null {
  if (!afsc) return null;
  const key = afsc.trim().toUpperCase().substring(0, 3);
  return AFSC_PROFILES[key] ?? null;
}
