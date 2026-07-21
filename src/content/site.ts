/**
 * All site content lives here as typed data. Components render it; they never
 * hardcode it. Updating a role or shipping a new project means editing this
 * file only.
 *
 * Deliberately omitted: phone number and home location. Both appear on the
 * resume but are not published here.
 */

export type Link = {
  label: string
  href: string
}

export type Role = {
  organization: string
  title: string
  period: string
  points: string[]
}

export type Project = {
  name: string
  /** One plain, factual sentence. Not flowery — the metrics carry the weight. */
  description: string
  /** Short outcome fragments, joined with a separator when rendered. */
  metrics: string[]
  stack: string
  period?: string
  href?: string
}

export const profile = {
  name: 'Utsav Agarwal',
  /**
   * With no headline or intro paragraph, this line carries all of the context
   * a reader gets before the work itself. Keep it concrete.
   */
  roleTag: 'AI security research at Faberlens AI · Computer science at Michigan',
}

/** Rendered as a copy-to-clipboard button rather than a mailto link. */
export const email = 'utsava@umich.edu'

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/UAgarwal7' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/utsavagar7' },
  // Resume intentionally absent — a redacted PDF will be added here later.
]

export const projects: Project[] = [
  {
    name: 'MRacing dashboard',
    description:
      'Reverse-engineered a Python driver dashboard and rebuilt it in C++, pulling live telemetry off the vehicle CAN bus for a Formula SAE team.',
    metrics: ['~3× faster', '40% less memory', '60+ FPS on a Raspberry Pi'],
    stack: 'C++, Raspberry Pi, CAN bus',
    period: 'Sept 2025 — present',
  },
  {
    name: 'dashcam-perception',
    description:
      'Fine-tuned YOLOv8 on BDD100K so a dashcam model could detect the classes COCO never covers, and built the evaluation framework to prove it worked.',
    metrics: [
      '+49.7% mAP@0.5',
      'riders and traffic signs learned from zero',
      '10 classes',
    ],
    stack: 'Python, PyTorch, YOLOv8',
  },
  {
    name: 'PUSHbulance',
    description:
      'Led a team of five building an autonomous robot that navigated multiple track layouts using OpenCV and real-time control off an ESP32 camera feed.',
    metrics: ['3 navigation methods', '~60 FPS vision loop'],
    stack: 'Python, OpenCV, ESP32, Arduino',
    period: 'Sept — Dec 2025',
  },
]

export const experience: Role[] = [
  {
    organization: 'Faberlens AI',
    title: 'AI security research intern',
    period: 'May 2026 — present',
    points: [
      'Replicate AI agent vulnerabilities previously confined to sandboxes against production-grade MCP servers, including Notion and Google Workspace, demonstrating real-world exploitability across live agentic pipelines.',
      'Run adversarial behavioral evaluations of agent skills, mapping the security regressions that appear when skills are composed.',
    ],
  },
  {
    organization: 'Audium Health',
    title: 'Software engineer intern',
    period: 'Jan — July 2025',
    points: [
      'Analyzed data from 1,500+ patients by generating spectrograms, using ROC curves and visual metrics to improve model performance.',
      'Automated management of 50k+ audio files to streamline supervised learning workflows, and built a Python visualizer deployed on Azure that gave customers real-time modeling results.',
    ],
  },
]

export const education = {
  school: 'University of Michigan',
  college: 'College of Engineering',
  degree: 'B.S.E. Computer Science',
  graduation: 'May 2028',
  gpa: '3.93 / 4.00',
  coursework: [
    'Data Structures & Algorithms',
    'Computer Organization',
    'Autonomous Electronic Systems',
    'Applied Machine Learning',
    'Mathematics of Blockchains and Cryptocurrencies',
  ],
}

export const skills = [
  { group: 'Languages', items: ['C++', 'C', 'Python', 'Java', 'JavaScript', 'SQL'] },
  {
    group: 'Machine learning',
    items: ['PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas'],
  },
  { group: 'Embedded', items: ['Arduino', 'Raspberry Pi', 'ESP32'] },
  { group: 'Certifications', items: ['Google Cybersecurity Certificate'] },
]
