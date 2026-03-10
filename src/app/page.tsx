"use client";

import Link from "next/link";
import { GitHubStars } from "@/components/github-stars";
import { CopyButton } from "@/components/copy-button";
import { GitHubIcon, XIcon } from "@/components/icons";

function Divider() {
  return <hr className="h-1 w-full rounded bg-neutral-800 border-0" />;
}

export default function Home() {
  const npxCommand = "npx skills add ameyalambat128/swiftui-skills";
  const globalSetupCommand = "~/.agents/skills/swiftui-skills/setup.sh";
  const localSetupCommand = "./.agents/skills/swiftui-skills/setup.sh";
  const curlCommand =
    "curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="mx-6 max-w-4xl lg:mx-auto">
        {/* Header / Hero */}
        <header className="py-16 lg:py-24">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight gradient-text">
              /swiftui-skills
            </h1>
            <GitHubStars username="ameyalambat128" repo="swiftui-skills" />
          </div>

          <p className="mt-4 text-lg text-gray-100">
            Agent skills for SwiftUI,
            <br className="hidden sm:block" />
            built from Apple&apos;s Xcode AI documentation.
          </p>

          <p className="mt-6 leading-relaxed text-gray-400">
            /swiftui-skills extracts Apple-authored documentation shipped inside
            Xcode and turns it into reusable skills that help AI agents write
            idiomatic, Apple-native SwiftUI.
          </p>

          {/* Installation */}
          <h2 className="mt-16 mb-4 text-xl font-bold gradient-text">
            Installation
          </h2>
          <div className="px-5 py-4 font-mono text-sm rounded-lg bg-neutral-900 ring-1 ring-neutral-800">
            <p className="text-xs text-gray-500 mb-3 font-sans">Recommended</p>
            <div className="flex gap-4 justify-between items-center">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {curlCommand}
              </div>
              <CopyButton text={curlCommand} />
            </div>
            <p className="text-xs text-gray-500 mt-4 mb-3 font-sans">
              Or use npx skills
            </p>
            <div className="flex gap-4 justify-between items-center">
              <div className="text-gray-400 overflow-x-auto">
                <span className="select-none text-gray-600">$ </span>
                {npxCommand}
              </div>
              <CopyButton text={npxCommand} />
            </div>
            <p className="text-xs text-gray-500 mt-2 font-sans">
              Choose Global or Project in the skills TUI, and keep Symlink
              (Recommended) selected.
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-2 font-sans">
                  Global install
                </p>
                <div className="flex gap-4 justify-between items-center">
                  <div className="text-gray-400 overflow-x-auto">
                    <span className="select-none text-gray-600">$ </span>
                    {globalSetupCommand}
                  </div>
                  <CopyButton text={globalSetupCommand} />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2 font-sans">
                  Project-local install
                </p>
                <div className="flex gap-4 justify-between items-center">
                  <div className="text-gray-400 overflow-x-auto">
                    <span className="select-none text-gray-600">$ </span>
                    {localSetupCommand}
                  </div>
                  <CopyButton text={localSetupCommand} />
                </div>
              </div>
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
            <Link
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Claude Code
            </Link>
            ,{" "}
            <Link
              href="https://cursor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Cursor
            </Link>
            ,{" "}
            <Link
              href="https://github.com/openai/codex"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Codex
            </Link>
            ,{" "}
            <Link
              href="https://opencode.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              OpenCode
            </Link>
            ,{" "}
            <Link
              href="https://windsurf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Windsurf
            </Link>
            ,{" "}
            <Link
              href="https://ai.google.dev/gemini-api/docs/cli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Gemini CLI
            </Link>
            , and{" "}
            <Link
              href="https://antigravity.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              Antigravity
            </Link>
            .
          </p>

          <div className="mt-4 flex gap-4">
            <Link
              href="https://github.com/ameyalambat128/swiftui-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
            >
              View on GitHub
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-12">
          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              What is /swiftui-skills?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              SwiftUI is opinionated. Most AI agents don&apos;t know those
              opinions.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              /swiftui-skills is a collection of skills built from
              Apple-authored documentation that ships inside Xcode.
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

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              Why this exists
            </h2>
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

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              What&apos;s included
            </h2>
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

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              How it works
            </h2>
            <p className="mb-6 leading-relaxed text-gray-400">
              /swiftui-skills works by giving AI agents better context, not new
              models.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-gray-600 font-mono">1.</span>
                <p className="text-gray-400">
                  The installer extracts Apple documentation from your local
                  Xcode install
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
                  Your AI agent uses the docs as source of truth when writing
                  code
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              No Apple documentation is redistributed. Everything is extracted
              locally on install.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              Who this is for
            </h2>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>iOS developers refactoring into SwiftUI</li>
              <li>Developers using AI to write SwiftUI-heavy apps</li>
              <li>
                People working with App Intents, StoreKit, Widgets, or visionOS
              </li>
              <li>
                Anyone tired of fighting non-idiomatic AI-generated SwiftUI
              </li>
            </ul>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              Open source
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              /swiftui-skills is open source.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              The skill definitions, prompts, and installer are public. Apple
              documentation is extracted locally from Xcode and is never
              redistributed.
            </p>
            <p className="mb-6 leading-relaxed text-gray-400">
              You can inspect the installer before running it.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/ameyalambat128/swiftui-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                GitHub repository
              </Link>
              <Link
                href="https://github.com/ameyalambat128/swiftui-skills/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 transition-colors hover:text-white hover:underline"
              >
                Issues and contributions welcome
              </Link>
            </div>
          </section>

          <Divider />

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
            <div className="flex items-center gap-3">
              <Link
                href="https://x.com/lambatameya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center transition-colors hover:text-white"
                aria-label="X (Twitter)"
              >
                <XIcon size={14} />
              </Link>
              <Link
                href="https://github.com/ameyalambat128/swiftui-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <GitHubIcon size={14} />
              </Link>
              <span className="text-gray-700">|</span>
              <Link
                href="https://ameyalambat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white hover:underline"
              >
                ameyalambat.com
              </Link>
              <span>|</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
