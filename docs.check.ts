import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = process.argv[2] || fileURLToPath(new URL(".", import.meta.url));
const config = JSON.parse(readFileSync(process.argv[3] || join(directory, "docs.json"), "utf8")) as {
  redirects: Array<{ source: string; destination: string; permanent?: boolean }>;
};
const expected = [
  [
    "/Getting_Started",
    "/documentation/welcome/getting-started"
  ],
  [
    "/boards/g-mod/lithium-charger",
    "/documentation/modules/g-mod/lithium-charger"
  ],
  [
    "/boards/g-mod/relay-2-ch",
    "/documentation/modules/g-mod/relay"
  ],
  [
    "/boards/g-sense/MCP79412-RTC",
    "/documentation/modules/g-mod/mcp79412-rtc"
  ],
  [
    "/boards/g-sense/PCF8563-RTC",
    "/documentation/modules/g-mod/pcf8563-rtc"
  ],
  [
    "/boards/g-sense/QMC6309",
    "/documentation/modules/g-sense/qmc6309-magnetometer"
  ],
  [
    "/boards/g-sense/limit-switch",
    "/documentation/modules/g-mod/limit-switch"
  ],
  [
    "/boards/g-sense/sht35",
    "/documentation/modules/g-sense/sht35"
  ],
  [
    "/boards/g-sense/sht45",
    "/documentation/modules/g-sense/sht45"
  ],
  [
    "/boards/g-sense/touch-slider",
    "/documentation/modules/g-sense/capacitive-touch-slider"
  ],
  [
    "/boards/g-mod/1-ch-relay",
    "/documentation/modules/g-mod/1-ch-relay"
  ],
  [
    "/boards/g-kit/soundbox",
    "/documentation/modules/g-kit/soundbox"
  ],
  [
    "/boards/examples/oled-rest-api",
    "/guides/temperaturemonitoring-glyph+sh1106oled"
  ]
];
const sources = new Set(config.redirects.map((rule) => rule.source));
assert.equal(sources.size, config.redirects.length, "redirect sources must be unique");
for (const [source, destination] of expected) {
  const rule = config.redirects.find((rule) => rule.source === source);
  assert.ok(rule, source);
  assert.equal(rule.destination, destination);
  assert.notEqual(rule.permanent, false, "migration redirects must remain permanent");
  assert.ok(existsSync(join(directory, destination.slice(1) + ".mdx")), "target page must exist: " + destination);
  assert.ok(!sources.has(destination), "target must not introduce a redirect chain");
}
console.log("Learn redirect checks passed: 13 exact mappings, unique sources, existing MDX targets, no chains.");
