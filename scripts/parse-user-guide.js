#!/usr/bin/env node
/**
 * parse-user-guide.js
 *
 * Reads 74_UserGuide_extracted.md and produces a structured JSON knowledge
 * file suitable for later embedding/loading by index.html via fetch() or as
 * a JS constant.
 *
 * Usage:
 *   node scripts/parse-user-guide.js
 *   node scripts/parse-user-guide.js --minify
 *   node scripts/parse-user-guide.js --input 74_UserGuide_extracted.md \
 *       --output data/cohesity-user-guide-knowledge.json \
 *       --max-chunk-chars 6000 --overlap-chars 600
 *   node scripts/parse-user-guide.js --index          # include full invertedIndex
 *   node scripts/parse-user-guide.js --jsonl          # write JSONL (one chunk per line)
 *
 * All options:
 *   --input  <path>     Input markdown file (default: 74_UserGuide_extracted.md)
 *   --output <path>     Output JSON/JSONL file (default: data/cohesity-user-guide-knowledge.json)
 *   --max-chunk-chars N Max characters per chunk (default: 6000)
 *   --overlap-chars   N Overlap between consecutive chunks (default: 600)
 *   --minify            Write compact JSON (no whitespace)
 *   --jsonl             Write one JSON object per line (chunks only, metadata on first line)
 *   --index             Include full invertedIndex in output (can significantly increase file size)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CLI argument parsing ─────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    input:         '74_UserGuide_extracted.md',
    output:        path.join('data', 'cohesity-user-guide-knowledge.json'),
    maxChunkChars: 6000,
    overlapChars:  600,
    minify:        false,
    jsonl:         false,
    includeIndex:  false,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--input'          && args[i + 1]) { opts.input         = args[++i]; }
    else if (a === '--output'    && args[i + 1]) { opts.output        = args[++i]; }
    else if (a === '--max-chunk-chars' && args[i + 1]) { opts.maxChunkChars = parseInt(args[++i], 10); }
    else if (a === '--overlap-chars'   && args[i + 1]) { opts.overlapChars  = parseInt(args[++i], 10); }
    else if (a === '--minify')   { opts.minify       = true; }
    else if (a === '--jsonl')    { opts.jsonl        = true; }
    else if (a === '--index')    { opts.includeIndex = true; }
    else if (a.startsWith('-')) {
      console.warn(`Unknown option: ${a}`);
    }
  }
  return opts;
}

// ─── Topic classification ─────────────────────────────────────────────────────

const TOPIC_RULES = [
  { topic: 'supportability',           patterns: [/supportab/i, /compatibility/i, /supported (software|workflow|platform)/i] },
  { topic: 'cluster-architecture',     patterns: [/cluster architect/i, /spanfs/i, /scale.?out/i, /fault tolerance/i, /SnapTree/i, /storage domain/i] },
  { topic: 'spanfs',                   patterns: [/spanfs/i, /filesystem/i, /snaptree/i, /chunk store/i] },
  { topic: 'cluster-administration',   patterns: [/cluster admin/i, /cluster setup/i, /cluster config/i, /node.*manage/i, /manage.*node/i, /power off/i, /power on/i] },
  { topic: 'cluster-services',         patterns: [/cluster service/i, /\biris\b/i, /\bmagneto\b/i, /\bbridge\b/i, /\bnexus\b/i, /\bathena\b/i, /\bgandalf\b/i, /cohesity service/i] },
  { topic: 'health-checks',            patterns: [/health.?check/i, /siren/i, /cluster health/i, /preflight/i, /\balert\b/i] },
  { topic: 'cli',                      patterns: [/\bcli\b/i, /command.?line/i, /iris_cli/i, /cohesity_cli/i] },
  { topic: 'ssh',                      patterns: [/\bssh\b/i, /secure shell/i, /\bsshd/i] },
  { topic: 'rest-api',                 patterns: [/rest api/i, /\bapi\b.*endpoint/i, /swagger/i, /openapi/i] },
  { topic: 'networking',               patterns: [/network/i, /vlan/i, /\bip\b/i, /\bdns\b/i, /\bntp\b/i, /\bmtu\b/i, /\bsubnet/i] },
  { topic: 'firewall-ports',           patterns: [/firewall/i, /\bport\b/i, /tcp.*udp|udp.*tcp/i] },
  { topic: 'access-management',        patterns: [/access management/i, /user.*manage/i, /manage.*user/i, /\brbac\b/i, /role.*based/i] },
  { topic: 'mfa-sso-rbac',             patterns: [/\bmfa\b/i, /multi.?factor/i, /\bsso\b/i, /single.?sign.?on/i, /\brbac\b/i, /saml/i, /\boauth\b/i] },
  { topic: 'datalock',                 patterns: [/datalock/i, /worm/i, /immutab/i, /compliance.*lock/i] },
  { topic: 'security',                 patterns: [/security/i, /encrypt/i, /cyber/i, /threat/i, /anomaly/i, /ransomware/i, /hardening/i] },
  { topic: 'fortknox',                 patterns: [/fortknox/i, /fort.?knox/i, /cyber.?vault/i, /vault/i] },
  { topic: 'organizations-multitenancy', patterns: [/organization/i, /multitenancy/i, /multi.?tenant/i, /tenant/i] },
  { topic: 'dataprotect',              patterns: [/dataprotect/i, /data.?protect/i, /protection policy/i, /\bprotect\b/i, /\bbackup\b/i, /\brestore\b/i, /recovery/i] },
  { topic: 'smartfiles',               patterns: [/smartfiles/i, /smart.?files/i] },
  { topic: 'views',                    patterns: [/\bview\b/i, /\bshare\b/i, /file.?service/i] },
  { topic: 'smb',                      patterns: [/\bsmb\b/i, /cifs/i, /windows.?share/i] },
  { topic: 'nfs',                      patterns: [/\bnfs\b/i, /network.?file.?system/i] },
  { topic: 's3',                       patterns: [/\bs3\b/i, /object.?store/i, /\bbucket/i] },
  { topic: 'cloudarchive',             patterns: [/cloudarchive/i, /cloud.*archiv/i, /archiv.*cloud/i] },
  { topic: 'cloudtier',                patterns: [/cloudtier/i, /cloud.*tier/i, /tier.*cloud/i] },
  { topic: 'replication',              patterns: [/\breplication\b/i, /replicate/i] },
  { topic: 'cloud-services',           patterns: [/cloud.?service/i, /helios/i] },
  { topic: 'aws',                      patterns: [/\baws\b/i, /amazon.?web/i, /\bec2\b/i, /\bs3\b.*aws|aws.*\bs3\b/i] },
  { topic: 'azure',                    patterns: [/\bazure\b/i, /microsoft.*cloud/i] },
  { topic: 'gcp',                      patterns: [/\bgcp\b/i, /google.?cloud/i] },
  { topic: 'vmware',                   patterns: [/vmware/i, /\bvsphere\b/i, /\bvcenter\b/i, /\besxi\b/i, /\bvms\b/i, /virtual.?machine/i] },
  { topic: 'nutanix',                  patterns: [/nutanix/i, /\bahv\b/i, /acropolis/i, /prism/i] },
  { topic: 'hyper-v',                  patterns: [/hyper.?v/i, /\bscvmm\b/i] },
  { topic: 'nas',                      patterns: [/\bnas\b/i, /network.?attached/i, /\bnetapp/i, /\bisilon/i, /\bpure\b.*storage|storage.*\bpure\b/i] },
  { topic: 'databases',                patterns: [/\bdatabase/i, /\bdb\b/i] },
  { topic: 'sql-server',               patterns: [/sql.?server/i, /\bmssql\b/i, /\bms.?sql\b/i] },
  { topic: 'oracle',                   patterns: [/\boracle\b/i, /\brman\b/i] },
  { topic: 'kubernetes',               patterns: [/kubernetes/i, /\bk8s\b/i, /\bhelm\b/i, /\bpod\b/i, /container/i] },
  { topic: 'microsoft-365',            patterns: [/microsoft.?365/i, /\bm365\b/i, /\bo365\b/i, /exchange.?online/i, /sharepoint/i, /onedrive/i, /teams/i] },
  { topic: 'physical-servers',         patterns: [/physical.?server/i, /bare.?metal/i, /\bagent.*install|install.*agent/i] },
  { topic: 'agents',                   patterns: [/cohesity.?agent/i, /\bagent\b/i, /agent.?compat/i] },
  { topic: 'nosql-hadoop-service',     patterns: [/nosql/i, /hadoop/i, /\bhdfs\b/i, /cassandra/i, /mongodb/i, /couchbase/i, /hive/i] },
  { topic: 'monitoring',               patterns: [/monitor/i, /\bsnmp\b/i, /syslog/i, /\balert\b/i, /notification/i, /\bsiem\b/i] },
  { topic: 'performance-capacity',     patterns: [/performance/i, /capacity/i, /\bthroughput\b/i, /\biops\b/i, /sizing/i, /dedup/i, /compress/i] },
  { topic: 'troubleshooting',          patterns: [/troubleshoot/i, /diagnos/i, /\bdebug\b/i, /\blog.*collect|collect.*log/i, /support.?bundle/i] },
  { topic: 'implementation-detail',    patterns: [/\bcommand\b/i, /\bcli\b/i, /configure.*step|step.*configure/i, /procedure/i, /how.?to\b/i, /prerequisites/i] },
  { topic: 'commands',                 patterns: [/\$ /i, /iris_cli/i, /cohesity_cli/i, /^\s{4,}[a-z_]+ [a-z_]/im] },
  { topic: 'services',                 patterns: [/service.*start|stop|restart/i, /systemctl/i, /cluster.*service/i] },
];

function classifyTopics(text, headingPath) {
  const combined = [text, ...headingPath].join(' ');
  const found = new Set();
  for (const { topic, patterns } of TOPIC_RULES) {
    for (const pat of patterns) {
      if (pat.test(combined)) { found.add(topic); break; }
    }
  }
  return Array.from(found);
}

// ─── Question target classification ──────────────────────────────────────────

function classifyQuestionTargets(topics, text) {
  const targets = new Set();
  if (topics.some(t => ['cluster-architecture', 'spanfs'].includes(t))) targets.add('architecture');
  if (topics.some(t => ['cluster-administration', 'networking', 'firewall-ports', 'access-management', 'cluster-services'].includes(t))) targets.add('design');
  if (topics.some(t => ['implementation-detail', 'commands', 'cli', 'ssh', 'services'].includes(t))) targets.add('implementation-detail');
  if (topics.some(t => ['troubleshooting', 'health-checks', 'monitoring'].includes(t))) targets.add('troubleshooting');
  if (topics.some(t => ['supportability'].includes(t))) targets.add('supportability');
  if (topics.some(t => ['security', 'mfa-sso-rbac', 'datalock', 'fortknox'].includes(t))) targets.add('security');
  if (topics.some(t => ['cluster-administration', 'performance-capacity', 'monitoring'].includes(t))) targets.add('operations');
  if (topics.some(t => ['dataprotect', 'cloudarchive', 'cloudtier', 'replication', 'vmware', 'nutanix', 'databases', 'kubernetes', 'physical-servers', 'microsoft-365'].includes(t))) targets.add('workload-protection');
  return Array.from(targets);
}

// ─── Difficulty signals ───────────────────────────────────────────────────────

// Common English words to exclude from proper-noun keyword extraction
const PROPER_NOUN_STOP_WORDS = new Set([
  'This','That','The','And','For','With','From','When','Where','Which',
  'How','What','Who','But','Not','All','Any','Its','Our','Your','Their',
  'Each','Some','More','Also','Next','Then','Here','Note','Step','See',
  'Use','Used','After','Before','While','Since','Under','Over','Into',
  'About','Above','Below','Between','Within','Without','During','After',
  'Before','Using','Click','Select','Enter','Type','Press','Check',
]);

// Units to detect in numeric values (limits/constraints)
const VALUE_UNITS = [
  'gb','tb','pb','mb','kb','ms','sec','min','hour','day','week','month',
  'year','node','port','vlan','mhz','ghz','vcpu','vm','rpm','watt','iops',
  'mbps','gbps','%',
];
const VALUE_UNITS_REGEX = new RegExp(
  `\\d+\\s*(${VALUE_UNITS.join('|')})`,
  'gi'
);

function computeDifficultySignals(text) {
  const signals = [];
  if (/\b(limit|maximum|minimum|threshold|capacity)\b/i.test(text)) signals.push('has-limits-or-values');
  if (/\bwarn(ing)?\b|\bnote\b|\bcaution\b|\bimportant\b/i.test(text))  signals.push('has-warnings-or-notes');
  if (/\$ |iris_cli|cohesity_cli|^\s{4}/m.test(text))                   signals.push('has-command');
  if (/\|.*\|/m.test(text))                                              signals.push('has-table');
  if (/^\d+\.\s|^[-*•]\s/m.test(text))                                  signals.push('has-procedure');
  return signals;
}

// ─── Keyword extraction ───────────────────────────────────────────────────────

// Product/technical terms likely to be high-value for retrieval
const IMPORTANT_TERMS = new Set([
  'spanfs','snaptree','iris','magneto','bridge','nexus','athena','gandalf',
  'helios','dataprotect','smartfiles','fortknox','cloudarchive','cloudtier',
  'datalock','worm','rbac','mfa','sso','saml','scvmm','ahv','vcenter','esxi',
  'nutanix','vmware','kubernetes','k8s','oracle','rman','mssql','sqlserver',
  'hadoop','hdfs','cassandra','mongodb','couchbase','netapp','isilon',
  'dataplatform','datahawk','sitecontinuity','datagovern',
  'replication','tenant','organization','multitenancy',
  'encryption','immutable','cyber vault','anomaly','ransomware',
  'siren','iris_cli','cohesity_cli','support bundle','health check',
  'aws','azure','gcp','s3','ec2','onedrive','sharepoint','exchange',
  'snmp','syslog','siem','iops','throughput','dedup','compression',
]);

function extractKeywords(text, headingPath) {
  const combined = [text, ...headingPath].join(' ').toLowerCase();
  const found = new Set();

  // Extract important known terms
  for (const term of IMPORTANT_TERMS) {
    if (combined.includes(term.toLowerCase())) found.add(term);
  }

  // Extract capitalized words / product names (likely proper nouns) from original-case text
  const properNouns = [text, ...headingPath].join(' ').match(/\b[A-Z][a-z]{2,}\b/g) || [];
  for (const w of properNouns) {
    if (w.length > 3 && !PROPER_NOUN_STOP_WORDS.has(w)) {
      found.add(w.toLowerCase());
    }
  }

  // Numbers with units (limits, values)
  const values = text.match(VALUE_UNITS_REGEX) || [];
  for (const v of values) found.add(v.toLowerCase());

  return Array.from(found).slice(0, 30);
}

// ─── TOC extraction ───────────────────────────────────────────────────────────

function extractToc(lines) {
  // The TOC appears in pages 3-12 (the first few pages contain the contents section).
  // We detect lines that look like "Some Title   123" (title + page number at end).
  const tocEntries = [];
  let inToc = false;
  let currentPage = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const pageMatch = line.match(/^## Page (\d+)$/);
    if (pageMatch) {
      currentPage = parseInt(pageMatch[1], 10);
      // The TOC runs roughly pages 3–12
      inToc = currentPage >= 3 && currentPage <= 12;
      continue;
    }
    if (!inToc) continue;

    // Pattern: "Some Title Text          123" — title text followed by spaces and a page number
    const tocLine = line.match(/^(.+?)\s{3,}(\d+)\s*$/);
    if (tocLine) {
      const title = tocLine[1].trim();
      const page  = parseInt(tocLine[2], 10);
      if (title && page > 0 && page < 5000) {
        // Determine level by indentation
        const indent = line.match(/^(\s*)/)[1].length;
        const level  = indent < 2 ? 1 : indent < 6 ? 2 : 3;
        tocEntries.push({ title, page, level });
      }
    }
  }
  return tocEntries;
}

// ─── Metadata from header ─────────────────────────────────────────────────────

function extractSourceMeta(text) {
  const meta = {
    file:        '74_UserGuide_extracted.md',
    title:       'Cohesity User Guide',
    version:     '7.4',
    published:   '',
    extractedAt: '',
    pdfPages:    0,
  };
  const versionMatch  = text.match(/Version (\d+\.\d+)/);
  if (versionMatch)   meta.version     = versionMatch[1];
  const pubMatch      = text.match(/Published on (.+)/);
  if (pubMatch)       meta.published   = pubMatch[1].trim();
  const extractMatch  = text.match(/Extracted:\s*(.+)/);
  if (extractMatch)   meta.extractedAt = extractMatch[1].trim();
  const pagesMatch    = text.match(/PDF pages:\s*(\d+)/i);
  if (pagesMatch)     meta.pdfPages    = parseInt(pagesMatch[1], 10);
  return meta;
}

// ─── Page-aware line parser ───────────────────────────────────────────────────

/**
 * Split the file into blocks, one block per page, tracking line numbers.
 * Returns array of { page, lineStart, lineEnd, lines[] }
 */
function splitIntoPages(lines) {
  const pages = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^## Page (\d+)$/);
    if (m) {
      if (current) {
        current.lineEnd = i - 1;
        pages.push(current);
      }
      current = { page: parseInt(m[1], 10), lineStart: i + 1, lineEnd: i + 1, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) {
    current.lineEnd = lines.length - 1;
    pages.push(current);
  }
  return pages;
}

// ─── Heading detection ────────────────────────────────────────────────────────

function getHeadingLevel(line) {
  const m = line.match(/^(#{1,6})\s/);
  return m ? m[1].length : 0;
}

function cleanHeading(line) {
  return line.replace(/^#{1,6}\s+/, '').trim();
}

// ─── Chapter detection ────────────────────────────────────────────────────────

function detectChapter(headingPath) {
  for (const h of headingPath) {
    if (/^chapter \d+/i.test(h)) return h;
  }
  return headingPath[0] || '';
}

// ─── Chunker ─────────────────────────────────────────────────────────────────

/**
 * Emit a single chunk from accumulated state.
 */
function emitChunk(chunkId, acc, overlapChars) {
  const trimmedText = acc.text.trim();
  if (!trimmedText) return null;

  const topics     = classifyTopics(trimmedText, acc.headingPath);
  const keywords   = extractKeywords(trimmedText, acc.headingPath);
  const qTargets   = classifyQuestionTargets(topics, trimmedText);
  const difficulty = computeDifficultySignals(trimmedText);
  const chapter    = detectChapter(acc.headingPath);
  const titlePath  = acc.headingPath.join(' / ') || `Page ${acc.pageStart}`;

  const id = `ug-${String(chunkId).padStart(6, '0')}`;

  return {
    id,
    title:             titlePath,
    chapter,
    headingPath:       [...acc.headingPath],
    pageStart:         acc.pageStart,
    pageEnd:           acc.pageEnd,
    lineStart:         acc.lineStart,
    lineEnd:           acc.lineEnd,
    text:              trimmedText,
    keywords,
    topics,
    questionTargets:   qTargets,
    difficultySignals: difficulty,
    hasProcedure:      difficulty.includes('has-procedure'),
    hasTable:          difficulty.includes('has-table'),
    hasCommand:        difficulty.includes('has-command'),
    hasLimitsOrValues: difficulty.includes('has-limits-or-values'),
    hasWarningsOrNotes:difficulty.includes('has-warnings-or-notes'),
    searchText:        trimmedText.toLowerCase().replace(/\s+/g, ' ').slice(0, 2000),
  };
}

/**
 * Takes an array of pages and produces chunks.
 *
 * Strategy:
 *   - Accumulate page text across consecutive pages.
 *   - When the accumulated text reaches maxChunkChars, emit a chunk.
 *   - Also emit a chunk whenever a top-level heading (Chapter N) boundary is hit
 *     and the accumulated text is large enough to be meaningful.
 *   - Apply overlap by seeding the next accumulator with the last overlapChars
 *     from the previous chunk.
 */
function buildChunks(pages, maxChunkChars, overlapChars) {
  const chunks = [];
  let chunkId  = 0;
  let headingStack = []; // global heading breadcrumb tracker

  // Accumulator for the current chunk being built
  let acc = null;

  function newAcc(page, seedText) {
    return {
      text:        seedText || '',
      headingPath: [...headingStack],
      pageStart:   page.page,
      pageEnd:     page.page,
      lineStart:   page.lineStart,
      lineEnd:     page.lineStart,
    };
  }

  function flushAcc(currentPage) {
    if (!acc || !acc.text.trim()) return;
    chunkId++;
    const chunk = emitChunk(chunkId, acc, overlapChars);
    if (chunk) chunks.push(chunk);
    // Seed overlap for next chunk
    const trimmed = acc.text.trim();
    const seed = trimmed.length > overlapChars
      ? trimmed.slice(trimmed.length - overlapChars)
      : trimmed;
    acc = newAcc(currentPage, seed);
  }

  for (let pi = 0; pi < pages.length; pi++) {
    const page    = pages[pi];
    const pageText = page.lines.join('\n').trim();

    // Initialise accumulator on first page
    if (!acc) acc = newAcc(page, '');

    // Detect top-level chapter boundaries so we prefer to flush before them
    let hasChapterBoundary = false;
    for (const line of page.lines) {
      const level = getHeadingLevel(line);
      if (level === 1 && /^chapter \d+/i.test(cleanHeading(line))) {
        hasChapterBoundary = true;
        break;
      }
    }

    // If this page would push us over the limit, flush first
    if (acc.text.length + pageText.length > maxChunkChars && acc.text.trim().length > 0) {
      flushAcc(page);
    } else if (hasChapterBoundary && acc.text.trim().length > maxChunkChars / 4) {
      // Flush at chapter boundary if we have a reasonable amount of content
      flushAcc(page);
    }

    // Update global heading stack from page lines
    for (const line of page.lines) {
      const level = getHeadingLevel(line);
      if (level > 0) {
        const title = cleanHeading(line);
        while (headingStack.length >= level) headingStack.pop();
        headingStack.push(title);
      }
    }

    // If accumulator is fresh (just flushed), update its headingPath to current context
    if (!acc.text.trim()) {
      acc.headingPath = [...headingStack];
    }

    // If this single page already exceeds the limit, split it by line blocks
    if (pageText.length > maxChunkChars) {
      const pageLines = page.lines;
      let buf = acc.text ? acc.text + '\n' : '';
      let lineOffset = page.lineStart;

      for (let li = 0; li < pageLines.length; li++) {
        buf += pageLines[li] + '\n';
        if (buf.length >= maxChunkChars) {
          acc.text    = buf.trimEnd();
          acc.pageEnd = page.page;
          acc.lineEnd = lineOffset + li;
          flushAcc(page);
          buf = acc.text ? acc.text + '\n' : '';
        }
      }
      // Remainder into accumulator
      if (buf.trim()) {
        acc.text    = (acc.text ? acc.text + '\n' : '') + buf;
        acc.pageEnd = page.page;
        acc.lineEnd = page.lineEnd;
      }
    } else {
      // Append page text to accumulator
      acc.text    = acc.text ? acc.text + '\n' + pageText : pageText;
      acc.pageEnd = page.page;
      acc.lineEnd = page.lineEnd;

      // Also flush if we've hit the limit after appending
      if (acc.text.length >= maxChunkChars) {
        flushAcc(pi + 1 < pages.length ? pages[pi + 1] : page);
      }
    }
  }

  // Flush any remaining content
  if (acc && acc.text.trim()) {
    chunkId++;
    const chunk = emitChunk(chunkId, acc, overlapChars);
    if (chunk) chunks.push(chunk);
  }

  return chunks;
}

// ─── Inverted index ───────────────────────────────────────────────────────────

function buildInvertedIndex(chunks) {
  const index = {};
  for (const chunk of chunks) {
    for (const kw of chunk.keywords) {
      if (!index[kw]) index[kw] = [];
      if (!index[kw].includes(chunk.id)) index[kw].push(chunk.id);
    }
  }
  // Sort keys alphabetically for readability
  return Object.fromEntries(
    Object.entries(index).sort(([a], [b]) => a.localeCompare(b))
  );
}

// ─── Topic stats ──────────────────────────────────────────────────────────────

function computeTopicStats(chunks) {
  const counts = {};
  for (const chunk of chunks) {
    for (const t of chunk.topics) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.fromEntries(
    Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const opts = parseArgs(process.argv);

  // Resolve paths relative to CWD (typically repo root)
  const inputPath  = path.resolve(opts.input);
  const outputPath = path.resolve(opts.output);

  // ── Validate input ──
  if (!fs.existsSync(inputPath)) {
    console.error(`ERROR: Input file not found: ${inputPath}`);
    console.error('Hint: Run this script from the repository root, or pass --input <path>');
    process.exit(1);
  }

  // ── Ensure output directory exists ──
  const outputDir = path.dirname(outputPath);
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (err) {
    console.error(`ERROR: Cannot create output directory ${outputDir}: ${err.message}`);
    process.exit(1);
  }
  try {
    fs.accessSync(outputDir, fs.constants.W_OK);
  } catch {
    console.error(`ERROR: Output directory is not writable: ${outputDir}`);
    process.exit(1);
  }

  console.log(`\nCohesity User Guide Parser`);
  console.log(`──────────────────────────────────────────────────`);
  console.log(`Input : ${inputPath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Chunk size: ${opts.maxChunkChars} chars, overlap: ${opts.overlapChars} chars`);
  console.log(`Options: minify=${opts.minify}, jsonl=${opts.jsonl}, index=${opts.includeIndex}`);
  console.log(`──────────────────────────────────────────────────\n`);

  // ── Read file ──
  console.log('Reading input file…');
  let rawText;
  try {
    rawText = fs.readFileSync(inputPath, 'utf8');
  } catch (err) {
    console.error(`ERROR: Cannot read input file: ${err.message}`);
    process.exit(1);
  }
  const totalChars = rawText.length;
  console.log(`  Read ${totalChars.toLocaleString()} characters`);

  const lines = rawText.split('\n');
  console.log(`  Lines: ${lines.length.toLocaleString()}`);

  // ── Extract source metadata ──
  const sourceMeta = extractSourceMeta(rawText);
  console.log(`  Detected: ${sourceMeta.title} v${sourceMeta.version}, published ${sourceMeta.published || '(unknown)'}`);
  console.log(`  Extracted at: ${sourceMeta.extractedAt || '(unknown)'}`);

  // ── Split into pages ──
  console.log('\nSplitting into pages…');
  const pages = splitIntoPages(lines);
  const pageCount = pages.length;
  if (pageCount === 0) {
    console.error('ERROR: No page markers (## Page N) detected. Is this the right input file?');
    process.exit(1);
  }
  console.log(`  Detected ${pageCount} pages (markers: ## Page 1 … ## Page ${pages[pages.length - 1].page})`);

  // ── Extract TOC ──
  console.log('\nExtracting table of contents…');
  const toc = extractToc(lines);
  console.log(`  TOC entries: ${toc.length}`);

  // ── Build chunks ──
  console.log('\nBuilding chunks…');
  const chunks = buildChunks(pages, opts.maxChunkChars, opts.overlapChars);
  if (chunks.length === 0) {
    console.error('ERROR: No chunks were produced. Check the input file and chunk size settings.');
    process.exit(1);
  }
  const chunkChars  = chunks.map(c => c.text.length);
  const totalChunkChars = chunkChars.reduce((a, b) => a + b, 0);
  const maxChunkSize    = Math.max(...chunkChars);
  const avgChunkSize    = Math.round(totalChunkChars / chunks.length);
  console.log(`  Chunks:        ${chunks.length.toLocaleString()}`);
  console.log(`  Total chars:   ${totalChunkChars.toLocaleString()}`);
  console.log(`  Largest chunk: ${maxChunkSize.toLocaleString()} chars`);
  console.log(`  Average chunk: ${avgChunkSize.toLocaleString()} chars`);

  // ── Topic stats ──
  const topicStats = computeTopicStats(chunks);
  console.log('\nTop topics:');
  Object.entries(topicStats).slice(0, 15).forEach(([t, n]) => {
    console.log(`  ${t.padEnd(30)} ${n}`);
  });

  // ── Unique keywords count ──
  const allKeywords = new Set(chunks.flatMap(c => c.keywords));
  console.log(`\nUnique keywords: ${allKeywords.size}`);

  // ── Anomaly detection ──
  const anomalies = [];
  // Use PDF pages from source metadata if available, otherwise just check we have some pages
  const expectedPages = sourceMeta.pdfPages || 0;
  if (pageCount < 100) {
    anomalies.push(`Only ${pageCount} pages detected — check that the input file contains ## Page N markers`);
  } else if (expectedPages > 0 && Math.abs(pageCount - expectedPages) > expectedPages * 0.1) {
    anomalies.push(`Detected ${pageCount} pages but source metadata reports ${expectedPages} PDF pages — extraction may be incomplete`);
  }
  if (toc.length < 5)     anomalies.push('Fewer than 5 TOC entries found — TOC extraction may have failed');
  if (maxChunkSize > opts.maxChunkChars * 1.5) anomalies.push(`Largest chunk (${maxChunkSize}) is significantly over maxChunkChars — check overlap/splitting`);
  if (anomalies.length > 0) {
    console.log('\n⚠️  Potential anomalies:');
    anomalies.forEach(a => console.log(`   ! ${a}`));
  }

  // ── Build output ──
  const generatedAt = new Date().toISOString();

  // Optionally build inverted index
  let invertedIndex = undefined;
  if (opts.includeIndex) {
    console.log('\nBuilding inverted index…');
    invertedIndex = buildInvertedIndex(chunks);
    console.log(`  Index keys: ${Object.keys(invertedIndex).length}`);
  }

  const output = {
    schemaVersion: 1,
    source: {
      ...sourceMeta,
      file: path.basename(inputPath),
    },
    generatedAt,
    chunking: {
      strategy:      'page-and-heading-aware',
      maxChunkChars: opts.maxChunkChars,
      overlapChars:  opts.overlapChars,
    },
    stats: {
      chunks:     chunks.length,
      characters: totalChunkChars,
      pages:      pageCount,
      keywords:   allKeywords.size,
      topics:     topicStats,
    },
    toc,
    chunks,
    ...(invertedIndex !== undefined ? { invertedIndex } : {}),
  };

  // ── Write output ──
  console.log(`\nWriting output to ${outputPath}…`);
  try {
    if (opts.jsonl) {
      // JSONL: metadata on first line, one chunk per subsequent line
      const { chunks: _c, ...meta } = output;
      const lines = [JSON.stringify(meta)].concat(chunks.map(c => JSON.stringify(c)));
      fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');
    } else {
      const json = opts.minify
        ? JSON.stringify(output)
        : JSON.stringify(output, null, 2);
      fs.writeFileSync(outputPath, json, 'utf8');
    }
  } catch (err) {
    console.error(`ERROR: Cannot write output file: ${err.message}`);
    process.exit(1);
  }

  const outSize = fs.statSync(outputPath).size;
  console.log(`  Output size: ${(outSize / 1024 / 1024).toFixed(2)} MB (${outSize.toLocaleString()} bytes)`);

  console.log(`\n✅ Done.`);
  console.log(`   Source file  : ${path.basename(inputPath)}`);
  console.log(`   Output file  : ${outputPath}`);
  console.log(`   Characters   : ${totalChars.toLocaleString()}`);
  console.log(`   Pages        : ${pageCount}`);
  console.log(`   Chunks       : ${chunks.length}`);
  console.log(`   Largest chunk: ${maxChunkSize.toLocaleString()} chars`);
  if (anomalies.length > 0) {
    console.log(`   ⚠️  Anomalies  : ${anomalies.length} (see above)`);
  }
  console.log();
}

main();
