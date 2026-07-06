window.COHESITY_QUESTION_BANK = [
  {
    "id": "arch-01",
    "domain": "Architecture",
    "question": "What is the primary architectural role of SpanFS in the Cohesity platform?",
    "choices": [
      "It is the distributed file system that underpins Cohesity data services.",
      "It is the SaaS dashboard used for multi-cluster administration.",
      "It is the cloud archive tier used for long-term retention only.",
      "It is the hardware sizing calculator for node selection."
    ],
    "correctAnswerIndex": 0,
    "explanation": "SpanFS is the core distributed data platform in Cohesity and supports the platform services that architects design around.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-02",
    "domain": "Architecture",
    "question": "Which Cohesity component is primarily focused on policy-based backup and recovery for supported workloads?",
    "choices": [
      "SmartFiles",
      "DataProtect",
      "CloudArchive",
      "Siren"
    ],
    "correctAnswerIndex": 1,
    "explanation": "DataProtect is the Cohesity capability aligned to protecting workloads through policies, protection groups, and recovery workflows.",
    "citationTitle": "Cohesity Documentation - DataProtect",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/DataProtection.htm"
  },
  {
    "id": "arch-03",
    "domain": "Architecture",
    "question": "A customer wants to consolidate NAS-style file shares and object services onto the Cohesity platform. Which product area is most relevant?",
    "choices": [
      "FortKnox",
      "SmartFiles",
      "Organizations",
      "DataLock"
    ],
    "correctAnswerIndex": 1,
    "explanation": "SmartFiles is the Cohesity offering for file and object data services on the platform.",
    "citationTitle": "Cohesity Documentation - SmartFiles",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/SmartFiles.htm"
  },
  {
    "id": "arch-04",
    "domain": "Architecture",
    "question": "Which statement best describes an appropriate use of Cohesity Helios in an architecture discussion?",
    "choices": [
      "It replaces the need for any on-cluster management interfaces.",
      "It provides centralized visibility and management across multiple clusters.",
      "It is the protocol used for east-west node communication.",
      "It is the backup target format for third-party products."
    ],
    "correctAnswerIndex": 1,
    "explanation": "Helios is used for centralized visibility, operations, and management across clusters.",
    "citationTitle": "Cohesity Documentation - Helios",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/Helios.htm"
  },
  {
    "id": "arch-05",
    "domain": "Architecture",
    "question": "When a design calls for deploying Cohesity software on customer-managed virtualization rather than branded appliances, which platform form factor best matches that requirement?",
    "choices": [
      "VE",
      "FortKnox",
      "DataLock",
      "Siren"
    ],
    "correctAnswerIndex": 0,
    "explanation": "VE is the virtual edition option and fits software-defined deployments on virtualization platforms.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-06",
    "domain": "Architecture",
    "question": "What is the main reason an architect would use Cohesity replication between sites?",
    "choices": [
      "To provide a secondary copy for disaster recovery and site resiliency.",
      "To replace MFA for administrative access.",
      "To convert backups into file shares.",
      "To eliminate the need for capacity planning."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Replication is used to maintain copies in another location so recovery can continue if the primary site is unavailable.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-07",
    "domain": "Architecture",
    "question": "Which design goal is most closely aligned with using Cohesity CloudArchive?",
    "choices": [
      "Providing long-term retention in a cloud location",
      "Serving SMB and NFS shares from the cluster",
      "Enforcing role-based access control",
      "Collecting health-check diagnostics"
    ],
    "correctAnswerIndex": 0,
    "explanation": "CloudArchive is typically chosen when architects need durable long-term retention in the cloud.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-08",
    "domain": "Architecture",
    "question": "Which statement best distinguishes CloudTier from CloudArchive in an architecture conversation?",
    "choices": [
      "CloudTier is used to encrypt backups, while CloudArchive is used to monitor alerts.",
      "CloudTier extends usable capacity with cloud-backed tiering, while CloudArchive is commonly discussed for retention copies in cloud storage.",
      "CloudTier is a multitenancy feature, while CloudArchive is a sizing tool.",
      "There is no practical difference between them."
    ],
    "correctAnswerIndex": 1,
    "explanation": "Architects separate cloud capacity tiering use cases from archive/retention use cases when designing cloud-connected solutions.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-09",
    "domain": "Architecture",
    "question": "What Cohesity feature is specifically intended to create tenant boundaries in shared environments?",
    "choices": [
      "Organizations",
      "SpanFS",
      "Siren",
      "CloudTier"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Organizations are used for multitenancy and help separate administrative and tenant experiences.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-10",
    "domain": "Architecture",
    "question": "Which network design principle is most important for a Cohesity cluster?",
    "choices": [
      "Use resilient, well-planned connectivity that supports both client access and cluster communication needs.",
      "Place every node on an isolated consumer Wi-Fi network.",
      "Avoid any integration with cloud networking.",
      "Use only a single interface per cluster regardless of workload."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Architects should plan resilient networking that supports the cluster design, workload access, and any cloud integration requirements.",
    "citationTitle": "Cohesity Documentation Home",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/home.htm"
  },
  {
    "id": "arch-11",
    "domain": "Architecture",
    "question": "Why might a customer use the Cohesity platform as a backup target for third-party protection tools?",
    "choices": [
      "To consolidate protected copies on the Cohesity data platform when native workload protection is not the only requirement.",
      "To disable cloud integrations automatically.",
      "To avoid documenting recovery procedures.",
      "To eliminate retention policies."
    ],
    "correctAnswerIndex": 0,
    "explanation": "The exam overview explicitly includes the Cohesity data platform as a backup target, which is relevant when consolidating protected data.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "arch-12",
    "domain": "Architecture",
    "question": "Which design decision best aligns with the exam domain focus on Cohesity product limitations?",
    "choices": [
      "Documenting where a proposed solution does not meet a required workload SLA or support boundary",
      "Assuming every workload can use the same protection method",
      "Skipping dependency mapping during discovery",
      "Ignoring current retention requirements"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Architects must understand use cases and limitations so they can identify gaps and avoid recommending unsupported designs.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-01",
    "domain": "Discovery & Design",
    "question": "Which input set is most useful when sizing a Cohesity solution?",
    "choices": [
      "Source capacity, change rate, retention requirements, and growth expectations",
      "Only the number of administrators",
      "Only the number of racks in the data center",
      "Only the number of cloud subscriptions"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Sizing decisions depend on data volume, data change characteristics, retention, and expected growth.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-02",
    "domain": "Discovery & Design",
    "question": "A workload requires aggressive RPOs and application-aware recovery. What should drive the protection design choice?",
    "choices": [
      "The workload's SLA, consistency requirements, and recovery objectives",
      "The administrator's favorite interface color",
      "Only the size of the legal team",
      "Whether the customer owns a tape library"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Protection techniques should be chosen based on workload requirements such as RPO, RTO, and application consistency.",
    "citationTitle": "Cohesity Documentation - DataProtect",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/DataProtection.htm"
  },
  {
    "id": "design-03",
    "domain": "Discovery & Design",
    "question": "Which design approach best supports a hybrid-cloud protection strategy?",
    "choices": [
      "Use local protection for operational recovery and add cloud-connected copies for offsite resilience or retention.",
      "Keep all copies only on one on-premises node.",
      "Archive everything immediately and avoid local recovery copies.",
      "Rely exclusively on manual exports."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Hybrid designs balance fast local recovery with cloud-connected resilience or retention options.",
    "citationTitle": "Cohesity Documentation - DataProtect",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/DataProtection.htm"
  },
  {
    "id": "design-04",
    "domain": "Discovery & Design",
    "question": "When is Helios Self-Managed most relevant to an architecture conversation?",
    "choices": [
      "When the environment requires dark-site management without depending on SaaS connectivity",
      "When the customer wants to replace every backup policy with file shares",
      "When only third-party security tools are allowed to connect to the cluster",
      "When a customer wants to disable all reporting"
    ],
    "correctAnswerIndex": 0,
    "explanation": "The exam overview specifically calls out using Helios Self-Managed for dark sites.",
    "citationTitle": "Cohesity Documentation - Helios",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/Helios.htm"
  },
  {
    "id": "design-05",
    "domain": "Discovery & Design",
    "question": "During discovery, which question most directly aligns Cohesity technical design to a business problem?",
    "choices": [
      "What business outcomes, recovery objectives, and risks must the solution address?",
      "Which keyboard layout does the operator use?",
      "What is the cafeteria schedule at the primary site?",
      "How many unrelated SaaS products are in use?"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Architectural discovery should connect business drivers and risk tolerance to technical design decisions.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-06",
    "domain": "Discovery & Design",
    "question": "Which finding most clearly indicates a protection-strategy gap?",
    "choices": [
      "Critical workloads lack an immutable or offsite recovery copy.",
      "The customer has named their cluster.",
      "The customer documents recovery testing.",
      "The customer tracks growth trends quarterly."
    ],
    "correctAnswerIndex": 0,
    "explanation": "A missing resilient recovery copy is a significant protection gap, especially for ransomware and DR planning.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "design-07",
    "domain": "Discovery & Design",
    "question": "How should an architect use capacity and performance data during an expansion discussion?",
    "choices": [
      "Compare current usage trends with the original design assumptions and future growth expectations.",
      "Ignore existing usage because sizing never changes after day 1.",
      "Use only last week's administrator notes.",
      "Base the expansion only on rack color and available floor space."
    ],
    "correctAnswerIndex": 0,
    "explanation": "As-built versus as-used analysis helps determine whether expansion is needed and how large it should be.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-08",
    "domain": "Discovery & Design",
    "question": "Which design choice is generally best when a customer needs rapid site-level failover capability?",
    "choices": [
      "Replication to a secondary location",
      "Removing all secondary copies",
      "Disabling cloud integration",
      "Using only manual exports to USB media"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Replication is the more direct design answer when site-level DR recovery is a core requirement.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-09",
    "domain": "Discovery & Design",
    "question": "What is the most appropriate first step before choosing hardware, VE, CE, or NGCE options?",
    "choices": [
      "Gather workload, growth, SLA, and environmental requirements.",
      "Turn on every optional security feature without discussion.",
      "Archive all data to the cloud immediately.",
      "Decide the answer based only on branding preference."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Platform form factor should be selected only after the architect understands the requirements and constraints.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "design-10",
    "domain": "Discovery & Design",
    "question": "Why is retention policy design important during solution architecture?",
    "choices": [
      "Retention affects required capacity, compliance alignment, and the usefulness of recovery points.",
      "Retention has no impact on capacity or recovery.",
      "Retention matters only for file-sharing workloads.",
      "Retention only changes the login screen."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Retention policy is a core design input because it changes both storage needs and recovery outcomes.",
    "citationTitle": "Cohesity Documentation - DataProtect",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/DataProtection.htm"
  },
  {
    "id": "design-11",
    "domain": "Discovery & Design",
    "question": "Which option best supports a customer that wants centralized management across many clusters but also has some disconnected environments?",
    "choices": [
      "Use Helios where connectivity is available and evaluate Self-Managed management patterns for dark sites.",
      "Avoid any centralized visibility across the estate.",
      "Keep every cluster undocumented and unmanaged.",
      "Use replication as a replacement for management tooling."
    ],
    "correctAnswerIndex": 0,
    "explanation": "The exam blueprint includes both centralized management and special handling for dark-site environments.",
    "citationTitle": "Cohesity Documentation - Helios",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/Helios.htm"
  },
  {
    "id": "design-12",
    "domain": "Discovery & Design",
    "question": "What should an architect do when a required workload is outside a tested or supported design boundary?",
    "choices": [
      "Identify the limitation clearly and adjust the design or expectations before implementation.",
      "Hide the limitation so the project can start sooner.",
      "Assume supportability will be granted later.",
      "Ignore it if the workload is important enough."
    ],
    "correctAnswerIndex": 0,
    "explanation": "A core architect skill is recognizing limitations and preventing unsupported solutions from being positioned as valid.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "security-01",
    "domain": "Security-focused Solutions",
    "question": "Which Cohesity capability is most directly associated with immutable backup data retention?",
    "choices": [
      "DataLock",
      "Siren",
      "SmartFiles",
      "Organizations"
    ],
    "correctAnswerIndex": 0,
    "explanation": "DataLock is the Cohesity feature commonly associated with immutability and WORM-style protection for backup data.",
    "citationTitle": "Introducing DataLock",
    "citationUrl": "https://www.cohesity.com/blog/introducing-datalock/"
  },
  {
    "id": "security-02",
    "domain": "Security-focused Solutions",
    "question": "Which combination best reflects layered administrative access hardening on the Cohesity platform?",
    "choices": [
      "MFA, SSO, and RBAC",
      "CloudArchive, SmartFiles, and Siren",
      "Replication, FortKnox, and NFS",
      "Helios, SMTP, and rack rails"
    ],
    "correctAnswerIndex": 0,
    "explanation": "MFA, SSO, and RBAC are all called out in the exam outline as security-hardening controls.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-03",
    "domain": "Security-focused Solutions",
    "question": "What is the main cyber-resiliency value of Cohesity FortKnox?",
    "choices": [
      "It creates an isolated cyber-vaulted copy intended to strengthen recovery from destructive events.",
      "It replaces the need for any backup policies.",
      "It converts every workload into object storage.",
      "It eliminates all network planning."
    ],
    "correctAnswerIndex": 0,
    "explanation": "FortKnox is positioned around cyber vaulting and protected recovery copies.",
    "citationTitle": "Cohesity FortKnox",
    "citationUrl": "https://www.cohesity.com/products/fortknox/"
  },
  {
    "id": "security-04",
    "domain": "Security-focused Solutions",
    "question": "Which statement best describes why anomaly detection matters in backup security?",
    "choices": [
      "It can highlight unusual data-change patterns that may indicate ransomware or other malicious activity.",
      "It permanently disables backups during high change rates.",
      "It automatically replaces MFA.",
      "It removes the need for recovery testing."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Anomaly detection is valuable because it helps surface suspicious behavior before or during recovery decision-making.",
    "citationTitle": "Cohesity AI-Powered Anomaly Detection",
    "citationUrl": "https://www.cohesity.com/resource-assets/solution-brief/cohesity-ai-powered-anomaly-detection.pdf"
  },
  {
    "id": "security-05",
    "domain": "Security-focused Solutions",
    "question": "What is the purpose of data classification in a Cohesity security design?",
    "choices": [
      "To help identify and prioritize sensitive data for governance and recovery decisions",
      "To size rack power distribution units",
      "To create VLANs automatically",
      "To replace backup retention policies"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Data classification helps teams understand where sensitive data lives so they can make better protection and governance decisions.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-06",
    "domain": "Security-focused Solutions",
    "question": "How do third-party security integrations generally help a Cohesity deployment?",
    "choices": [
      "They help extend visibility and response by sharing signals with the broader security ecosystem.",
      "They eliminate the need for any Cohesity-native security features.",
      "They prevent administrators from using APIs.",
      "They convert all backups into archive-only copies."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Third-party integrations complement the platform by connecting Cohesity events and context with existing security tooling.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "security-07",
    "domain": "Security-focused Solutions",
    "question": "Which recovery design decision is most important after a suspected ransomware incident?",
    "choices": [
      "Choose a known-good recovery point and validate that the restore path is isolated and trustworthy.",
      "Delete every backup immediately.",
      "Disable all security controls before recovery.",
      "Recover without checking the integrity of the target copy."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Ransomware recovery planning should focus on restoring from a trusted copy using a controlled recovery process.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-08",
    "domain": "Security-focused Solutions",
    "question": "What does RBAC primarily help enforce in a Cohesity environment?",
    "choices": [
      "Least-privilege access based on role responsibilities",
      "Faster cloud archive retrieval times",
      "Automatic capacity expansion",
      "Hardware node deduplication"
    ],
    "correctAnswerIndex": 0,
    "explanation": "RBAC helps ensure users and administrators receive only the permissions needed for their role.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-09",
    "domain": "Security-focused Solutions",
    "question": "Which statement best reflects a strong cyber-resiliency design?",
    "choices": [
      "Use multiple recovery layers such as immutable copies, offsite copies, and practiced recovery workflows.",
      "Rely on a single backup copy at the primary site.",
      "Avoid documenting recovery procedures.",
      "Disable monitoring to reduce alert noise."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Cyber resiliency depends on layered protection and recoverability rather than on a single defensive measure.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-10",
    "domain": "Security-focused Solutions",
    "question": "Which feature set is most aligned with pre-restore investigation of suspicious backups?",
    "choices": [
      "Threat hunting, scanning, and detection capabilities",
      "Rack mounting accessories",
      "Cloud cost calculators",
      "Basic DNS settings only"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Threat hunting and scanning features help teams inspect backup content and signals before deciding what to restore.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-11",
    "domain": "Security-focused Solutions",
    "question": "Why is MFA especially relevant for privileged Cohesity access?",
    "choices": [
      "It reduces the risk that a stolen password alone can be used to administer or damage the environment.",
      "It increases the size of every backup copy.",
      "It replaces the need for retention policies.",
      "It removes the need for audit trails."
    ],
    "correctAnswerIndex": 0,
    "explanation": "MFA strengthens privileged access by adding another factor beyond the password.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "security-12",
    "domain": "Security-focused Solutions",
    "question": "Which statement best distinguishes FortKnox from standard replication?",
    "choices": [
      "FortKnox emphasizes cyber-vault isolation, while replication is generally discussed as a secondary site-copy workflow.",
      "FortKnox is only for file shares, while replication is only for APIs.",
      "There is no meaningful difference between them.",
      "Replication is a user authentication feature."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Both create additional copies, but FortKnox is positioned around cyber-vaulting and isolation, while replication addresses DR copy workflows more broadly.",
    "citationTitle": "Cohesity FortKnox",
    "citationUrl": "https://www.cohesity.com/products/fortknox/"
  },
  {
    "id": "integrations-01",
    "domain": "Third-party Integrations",
    "question": "Which Cohesity resource should an architect reference first when planning custom automation?",
    "choices": [
      "The Cohesity Developer Portal and API documentation",
      "A third-party wallpaper site",
      "Only the cluster login page",
      "A generic networking textbook with no API content"
    ],
    "correctAnswerIndex": 0,
    "explanation": "The developer portal is the official starting point for understanding available APIs and supported automation patterns.",
    "citationTitle": "Cohesity Developer Portal",
    "citationUrl": "https://developer.cohesity.com/"
  },
  {
    "id": "integrations-02",
    "domain": "Third-party Integrations",
    "question": "Which task is a good candidate for Cohesity API automation?",
    "choices": [
      "Repeating administrative or reporting workflows that benefit from standardization",
      "Replacing every backup with manual screenshots",
      "Avoiding all integrations with existing tools",
      "Disabling auditability"
    ],
    "correctAnswerIndex": 0,
    "explanation": "APIs are well suited for repeatable processes such as inventory, reporting, orchestration, and policy-driven automation.",
    "citationTitle": "Cohesity Developer Portal",
    "citationUrl": "https://developer.cohesity.com/"
  },
  {
    "id": "integrations-03",
    "domain": "Third-party Integrations",
    "question": "What is the main architectural benefit of integrating Cohesity with external orchestration or ITSM tools?",
    "choices": [
      "It helps embed protection and recovery workflows into broader operational processes.",
      "It removes the need for any recovery planning.",
      "It converts object storage into block storage.",
      "It reduces every workload to the same SLA."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Third-party integrations are valuable when they connect Cohesity tasks and data to wider operations and response workflows.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "integrations-04",
    "domain": "Third-party Integrations",
    "question": "Which statement best reflects good practice before implementing a custom Cohesity integration?",
    "choices": [
      "Review the official API documentation, authentication approach, and target workflow requirements.",
      "Assume any undocumented endpoint is safe for production use.",
      "Skip error handling because backup APIs never fail.",
      "Use production credentials in public sample code."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Architects should validate documented APIs, auth flows, and operational requirements before coding against the platform.",
    "citationTitle": "Cohesity Developer Portal",
    "citationUrl": "https://developer.cohesity.com/"
  },
  {
    "id": "integrations-05",
    "domain": "Third-party Integrations",
    "question": "Why might a security team integrate Cohesity signals with SIEM or SOAR tooling?",
    "choices": [
      "To improve visibility and coordinated response across the security stack",
      "To disable all backup policies automatically",
      "To eliminate the need for backup retention",
      "To remove the need for administrators"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Sharing security-relevant information with SIEM and SOAR platforms can help operations teams respond more effectively.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "integrations-06",
    "domain": "Third-party Integrations",
    "question": "Which statement best aligns with the exam objective for third-party integrations?",
    "choices": [
      "An architect should know when Cohesity should participate in a larger ecosystem instead of operating in isolation.",
      "An architect should avoid all external integrations by default.",
      "Only storage capacity matters; ecosystem fit never matters.",
      "Integrations are only useful for screen themes."
    ],
    "correctAnswerIndex": 0,
    "explanation": "The exam expects architects to understand how Cohesity fits into broader environments and workflows.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "integrations-07",
    "domain": "Third-party Integrations",
    "question": "A customer wants custom reporting that spans multiple clusters. Which approach is most aligned with the exam topics?",
    "choices": [
      "Use Cohesity APIs and centralized management data sources where appropriate.",
      "Rely only on handwritten notes gathered monthly.",
      "Disable centralized management first.",
      "Avoid authentication to simplify scripting."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Custom reporting is a common API and centralized-management use case.",
    "citationTitle": "Cohesity Developer Portal",
    "citationUrl": "https://developer.cohesity.com/"
  },
  {
    "id": "integrations-08",
    "domain": "Third-party Integrations",
    "question": "What is the most important reason to keep API-based automations documented and controlled?",
    "choices": [
      "They can affect protection, recovery, and security operations at scale.",
      "Documentation always slows teams down.",
      "Undocumented automations are easier to audit.",
      "It guarantees that no future version changes will matter."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Automations should be governed because they can make broad changes quickly and must remain supportable and understandable.",
    "citationTitle": "Cohesity Developer Portal",
    "citationUrl": "https://developer.cohesity.com/"
  },
  {
    "id": "integrations-09",
    "domain": "Third-party Integrations",
    "question": "Which source is most appropriate for looking up supported Cohesity integration patterns and examples?",
    "choices": [
      "Official Cohesity developer and integration resources",
      "An unrelated social media thread",
      "A hardware vendor's power calculator",
      "Only a public search engine result with no official source"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Official developer and integration resources are the best primary sources for supported patterns.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "integrations-10",
    "domain": "Third-party Integrations",
    "question": "What should an architect confirm before integrating Cohesity with cloud or security services?",
    "choices": [
      "Authentication, network connectivity, operational ownership, and the business outcome of the integration",
      "Only the wallpaper setting in the UI",
      "That no one will ever need logs",
      "That the environment has no change-control process"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Successful integrations depend on connectivity, auth, ownership, and a clear reason the integration exists.",
    "citationTitle": "Cohesity Developer Portal - Integrations",
    "citationUrl": "https://developer.cohesity.com/page/integrations"
  },
  {
    "id": "troubleshooting-01",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which Cohesity tool is specifically called out in the exam topics for troubleshooting and pre-checks?",
    "choices": [
      "Siren",
      "FortKnox",
      "DataLock",
      "CloudArchive"
    ],
    "correctAnswerIndex": 0,
    "explanation": "The certification overview explicitly names Siren for troubleshooting and pre-check usage.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-02",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "What is the primary goal of comparing as-built versus as-used cluster data?",
    "choices": [
      "To determine whether the current deployment still matches workload reality and future expansion needs",
      "To choose a logo color",
      "To remove the need for backup policies",
      "To avoid documenting customer assumptions"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Comparing design assumptions with actual usage helps identify growth pressure, drift, and upgrade needs.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-03",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which data is most useful when evaluating whether a cluster may need expansion soon?",
    "choices": [
      "Capacity consumption trends, performance usage, and forecasted growth",
      "Only the number of help-desk tickets last month",
      "Only the total number of user accounts",
      "Only the physical height of the rack"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Capacity and performance trends, combined with growth expectations, are central to expansion planning.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-04",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which discovery finding most clearly reveals a customer protection gap?",
    "choices": [
      "Important workloads have undefined recovery objectives and no tested recovery process.",
      "The cluster name follows a standard naming convention.",
      "The operations team reviews reports.",
      "The environment has documented subnets."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Undefined objectives and untested recovery paths indicate a meaningful gap in strategy and preparedness.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-05",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Why is recovery testing part of a strong gap-analysis process?",
    "choices": [
      "It proves whether documented recovery expectations can actually be met.",
      "It makes capacity planning unnecessary.",
      "It permanently archives all workloads.",
      "It removes the need for monitoring."
    ],
    "correctAnswerIndex": 0,
    "explanation": "A strategy is incomplete if the team cannot verify that recovery works as expected.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-06",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "A customer is experiencing slower-than-expected backup windows. What should an architect review first?",
    "choices": [
      "Actual workload behavior, cluster performance metrics, and whether the design assumptions still hold",
      "Only the office seating chart",
      "Only the UI theme",
      "Whether the legal team changed retention policy wording"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Troubleshooting starts with workload behavior and observed performance against the original assumptions.",
    "citationTitle": "Cohesity Documentation Home",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/home.htm"
  },
  {
    "id": "troubleshooting-07",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which statement best reflects good health-check practice in a Cohesity environment?",
    "choices": [
      "Review alerts, capacity, performance, and overall platform health regularly.",
      "Only log in when a full outage occurs.",
      "Ignore trend data unless a node has failed completely.",
      "Avoid documenting recurring findings."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Routine health checks help architects and operators spot developing issues before they become outages or design risks.",
    "citationTitle": "Cohesity Documentation Home",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/home.htm"
  },
  {
    "id": "troubleshooting-08",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "How should cloud restore expectations be handled during solution design and troubleshooting?",
    "choices": [
      "Architects should communicate that cloud-connected recovery options can have different performance and retrieval characteristics than local copies.",
      "Cloud restores always behave exactly like local flash restores.",
      "Cloud-connected copies never require planning.",
      "Retrieval behavior is irrelevant to recovery design."
    ],
    "correctAnswerIndex": 0,
    "explanation": "Recovery expectations should reflect the medium and architecture involved, including any cloud retrieval considerations.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-09",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which gap-analysis question is most important for ransomware preparedness?",
    "choices": [
      "Can the customer identify, protect, and recover critical systems from a trusted copy?",
      "What color are the rack screws?",
      "How many PDF manuals were printed?",
      "Which administrator has the longest username?"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Ransomware preparedness depends on identifying critical systems and validating trusted recovery paths.",
    "citationTitle": "Cohesity Security Center",
    "citationUrl": "https://www.cohesity.com/products/helios/security-center/"
  },
  {
    "id": "troubleshooting-10",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "What is the best reason to review workload onboarding coverage during discovery?",
    "choices": [
      "To find workloads that are not yet protected or not protected in the right way",
      "To reduce the need for any recovery points",
      "To eliminate security controls",
      "To avoid future documentation"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Architects need to identify both unprotected workloads and workloads that are protected with the wrong method or SLA.",
    "citationTitle": "Cohesity Documentation - DataProtect",
    "citationUrl": "https://docs.cohesity.com/HomePage/Content/products/DataProtection.htm"
  },
  {
    "id": "troubleshooting-11",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "If a shared environment is creating operational confusion between tenants, which design area should be revisited?",
    "choices": [
      "Organizations and multitenancy boundaries",
      "CloudArchive retrieval policies only",
      "Rack rail installation",
      "API rate limiting only"
    ],
    "correctAnswerIndex": 0,
    "explanation": "When tenants are not clearly separated operationally, the multitenancy design should be reviewed.",
    "citationTopic": "Cohesity certification overview / study topic"
  },
  {
    "id": "troubleshooting-12",
    "domain": "Gap Analysis & Troubleshooting",
    "question": "Which statement best captures the architect's role in troubleshooting conversations?",
    "choices": [
      "Translate observed behavior into design, capacity, workflow, or protection-strategy findings that can be acted on.",
      "Only collect logs and avoid all design interpretation.",
      "Focus exclusively on cosmetic UI issues.",
      "Assume the original design is always correct."
    ],
    "correctAnswerIndex": 0,
    "explanation": "The architect should connect technical findings back to design assumptions, workflows, and business requirements.",
    "citationTopic": "Cohesity certification overview / study topic"
  }
];
