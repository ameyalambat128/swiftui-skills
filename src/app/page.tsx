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
      className="p-2 rounded transition-colors text-gray-600 hover:text-gray-300 hover:bg-neutral-800"
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
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function Divider() {
  return <div className="h-1 w-full rounded bg-neutral-800" />;
}

export default function Home() {
  const installCommand = "curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash";

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
            Apple-authored SwiftUI and Apple platform guidance,
            <br className="hidden sm:block" />
            packaged as skills for AI coding agents.
          </p>

          <p className="mt-6 leading-relaxed text-gray-400">
            /swiftui-skills extracts internal Apple documentation shipped inside Xcode
            and turns it into reusable skills that help AI agents write idiomatic,
            Apple-native SwiftUI code.
          </p>

          {/* Installation */}
          <h2 className="mt-16 mb-4 text-xl font-bold gradient-text">Installation</h2>
          <div className="px-5 py-4 font-mono text-sm rounded-lg bg-neutral-900 ring-1 ring-neutral-800">
            <div className="flex gap-4 justify-between items-center">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {installCommand}
              </div>
              <CopyButton text={installCommand} />
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-800 text-gray-500">
              <span className="select-none text-gray-600">&gt; </span>
              /swiftui-skills
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Works with{" "}
            <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Claude Code</a>,{" "}
            <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Cursor</a>,{" "}
            <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">OpenCode</a>,{" "}
            <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Codex</a>, and{" "}
            <a href="https://antigravity.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Antigravity</a>.
          </p>

          <div className="mt-4 flex gap-4">
            <a
              href="https://github.com/ameyalambat/swiftui-skills"
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
            <p className="mb-6 leading-relaxed text-gray-400">
              /swiftui-skills is a collection of skills built from Apple-authored
              documentation that ships inside Xcode. These skills condition AI agents
              to follow the same patterns Apple expects in real SwiftUI apps.
            </p>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>Uses Apple-written guidance from inside Xcode</li>
              <li>Reduces hallucinated or non-idiomatic SwiftUI</li>
              <li>
                Works with{" "}
                <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Claude Code</a>,{" "}
                <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Cursor</a>,{" "}
                <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">OpenCode</a>,{" "}
                <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Codex</a>, and{" "}
                <a href="https://antigravity.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">Antigravity</a>
              </li>
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
              that are rarely written down in public docs.
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
            <p className="mb-6 leading-relaxed text-gray-400">
              The skill definitions, prompts, and installer are public.
              Apple documentation is extracted locally from Xcode
              and is never redistributed.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/ameyalambat/swiftui-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                GitHub repository
              </a>
              <a
                href="https://github.com/ameyalambat/swiftui-skills/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                Issues and contributions welcome
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-800 mt-16 mb-8">
          <div className="flex justify-between py-4 text-xs md:text-sm text-gray-600">
            <p>Not affiliated with Apple.</p>
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
        </footer>
      </div>
    </div>
  );
}
