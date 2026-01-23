"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-3 rounded transition-colors text-gray-600 hover:text-gray-300 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function Divider() {
  return <hr className="h-1 w-full rounded bg-neutral-800 border-0" aria-hidden="true" />;
}

export default function Home() {
  const npxCommand = "npx skills add ameyalambat128/swiftui-skills";
  const setupCommand = "~/.agents/skills/swiftui-skills/setup.sh";
  const curlCommand = "curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Main Content Container */}
      <div className="mx-6 max-w-4xl lg:mx-auto">
        {/* Header / Hero */}
        <header className="py-16 lg:py-24">
          <h1 className="text-3xl font-bold tracking-tight gradient-text">
            /swiftui-skills
          </h1>

          <p className="mt-4 text-lg text-gray-100">
            Agent skills for SwiftUI,
            <br className="hidden sm:block" />
            built from Apple&apos;s Xcode AI documentation.
          </p>

          <p className="mt-6 leading-relaxed text-gray-400">
            /swiftui-skills extracts Apple-authored documentation shipped inside Xcode
            and turns it into reusable skills that help AI agents write idiomatic,
            Apple-native SwiftUI.
          </p>

          {/* Installation */}
          <h2 className="mt-16 mb-4 text-xl font-bold gradient-text">Installation</h2>
          <div className="px-5 py-4 font-mono text-sm rounded-lg bg-neutral-900 ring-1 ring-neutral-800">
            <p className="text-xs text-gray-500 mb-3 font-sans">Recommended</p>
            <div className="flex gap-4 justify-between items-center">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {curlCommand}
              </div>
              <CopyButton text={curlCommand} />
            </div>
            <p className="text-xs text-gray-500 mt-4 mb-3 font-sans">Or use npx skills</p>
            <div className="flex gap-4 justify-between items-center">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {npxCommand}
              </div>
              <CopyButton text={npxCommand} />
            </div>
            <div className="flex gap-4 justify-between items-center mt-2">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {setupCommand}
              </div>
              <CopyButton text={setupCommand} />
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-800 text-gray-500">
              <span className="select-none text-gray-600">&gt; </span>
              /swiftui-skills
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Local install. No telemetry. No Apple documentation redistributed.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Works with{" "}
            <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Claude Code</a>,{" "}
            <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Cursor</a>,{" "}
            <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Codex</a>,{" "}
            <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">OpenCode</a>,{" "}
            <a href="https://windsurf.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Windsurf</a>,{" "}
            <a href="https://ai.google.dev/gemini-api/docs/cli" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Gemini CLI</a>, and{" "}
            <a href="https://antigravity.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-white">Antigravity</a>.
          </p>

          <div className="mt-4 flex gap-4">
            <a
              href="https://github.com/ameyalambat128/swiftui-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          {/* What is swiftui-skills? */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">What is /swiftui-skills?</h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              SwiftUI is opinionated. Most AI agents don&apos;t know those opinions.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              /swiftui-skills is a collection of skills built from Apple-authored
              documentation that ships inside Xcode.
            </p>
            <p className="mb-6 leading-relaxed text-gray-400">
              These skills condition AI agents to follow the same patterns Apple
              expects in real SwiftUI apps.
            </p>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>Uses Apple-written guidance from inside Xcode</li>
              <li>Reduces hallucinations and non-idiomatic SwiftUI</li>
              <li>Open source and local-first</li>
            </ul>
          </section>

          <Divider />

          {/* Why this exists */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">Why this exists</h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              AI agents struggle with SwiftUI not because the models are weak,
              but because SwiftUI encodes architectural and design decisions
              that are rarely written down in public documentation.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              Apple already solved this internally.
            </p>
            <p className="leading-relaxed text-gray-400">
              /swiftui-skills makes that guidance usable.
            </p>
          </section>

          <Divider />

          {/* What's included */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">What&apos;s included</h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              The current skill set covers:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "SwiftUI patterns and composition",
                "App Intents and system integrations",
                "AlarmKit integration",
                "StoreKit updates",
                "WebKit + SwiftUI integration",
                "SwiftData inheritance",
                "Swift Concurrency updates",
                "Liquid Glass design (SwiftUI, UIKit, AppKit, WidgetKit)",
                "Widgets for visionOS",
                "Low-level Swift performance primitives",
              ].map((item) => (
                <div key={item} className="text-gray-400 text-sm py-1">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              All content comes from Apple documentation included with Xcode.
            </p>
          </section>

          <Divider />

          {/* How it works */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">How it works</h2>
            <p className="mb-6 leading-relaxed text-gray-400">
              /swiftui-skills works by giving AI agents better context, not new models.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-gray-600 font-mono">1.</span>
                <p className="text-gray-400">
                  The installer extracts Apple documentation from your local Xcode install
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600 font-mono">2.</span>
                <p className="text-gray-400">
                  Skills define how agents should use that documentation
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600 font-mono">3.</span>
                <p className="text-gray-400">
                  Your AI agent uses the docs as source of truth when writing code
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              No Apple documentation is redistributed.
              Everything is extracted locally on install.
            </p>
          </section>

          <Divider />

          {/* Who this is for */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">Who this is for</h2>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>iOS developers refactoring into SwiftUI</li>
              <li>Developers using AI to write SwiftUI-heavy apps</li>
              <li>People working with App Intents, StoreKit, Widgets, or visionOS</li>
              <li>Anyone tired of fighting non-idiomatic AI-generated SwiftUI</li>
            </ul>
          </section>

          <Divider />

          {/* Open source */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">Open source</h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              /swiftui-skills is open source.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              The skill definitions, prompts, and installer are public.
              Apple documentation is extracted locally from Xcode
              and is never redistributed.
            </p>
            <p className="mb-6 leading-relaxed text-gray-400">
              You can inspect the installer before running it.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/ameyalambat128/swiftui-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                GitHub repository
              </a>
              <a
                href="https://github.com/ameyalambat128/swiftui-skills/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                Issues and contributions welcome
              </a>
            </div>
          </section>

          <Divider />

          {/* Status */}
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">Status</h2>
            <p className="leading-relaxed text-gray-400">
              Early and evolving. Expect changes as Apple updates Xcode.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 mt-16 mb-8">
          <div className="flex justify-between items-center py-4 text-xs md:text-sm text-gray-600">
            <p>Not affiliated with Apple. Built independently.</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://x.com/lambatameya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                  aria-label="X (Twitter)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/ameyalambat128/swiftui-skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                  aria-label="GitHub"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <span className="text-gray-700">|</span>
              <div className="flex items-center gap-1">
                <a
                  href="https://ameyalambat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white hover:underline"
                >
                  ameyalambat.com
                </a>
                <span>|</span>
                <span>{new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
