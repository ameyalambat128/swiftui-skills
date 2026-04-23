"use client";

import Link from "next/link";
import { GitHubStars } from "@/components/github-stars";
import { CopyButton } from "@/components/copy-button";
import { GitHubIcon, XIcon } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const siteUrl = "https://swiftui-skills.ameyalambat.com";
const productDescription =
  "SwiftUI Skills gives AI agents Apple-authored Xcode guidance through a local-first setup so they generate more idiomatic SwiftUI with fewer hallucinated patterns.";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SwiftUI Skills",
      description: productDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "SwiftUI Skills",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: productDescription,
      softwareVersion: "0.1.0",
      url: siteUrl,
      downloadUrl: `${siteUrl}/install`,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      author: {
        "@id": `${siteUrl}/#person`,
      },
      keywords: [
        "SwiftUI",
        "Xcode",
        "Apple-authored guidance",
        "AI coding agents",
        "local-first",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Ameya Lambat",
      url: "https://ameyalambat.com",
    },
  ],
};

const faqItems = [
  {
    value: "ai-coding-agents",
    question: "What are SwiftUI skills for AI coding agents?",
    answer:
      "SwiftUI Skills packages Apple-authored guidance from Xcode into reusable local skills that help AI coding agents generate more idiomatic SwiftUI. Instead of relying on generic guesses, the agent gets better context for composition, platform APIs, and the patterns Apple expects in real apps.",
  },
  {
    value: "claude-code",
    question: "How does the SwiftUI skill for Claude Code work?",
    answer:
      "Claude Code can use SwiftUI Skills as local context during generation and refactoring. The setup flow extracts the docs from your local Xcode install, installs the skill locally, and gives Claude Code a stronger source of truth when it needs to write SwiftUI-heavy code.",
  },
  {
    value: "cursor",
    question: "Can I use this SwiftUI skill for Cursor?",
    answer:
      "Yes. The same SwiftUI Skills setup for Cursor uses locally extracted documentation and skill prompts to improve SwiftUI output inside your editor. The goal is the same across tools: better SwiftUI structure, fewer hallucinated APIs, and behavior that stays closer to Apple-native patterns.",
  },
  {
    value: "openclaw",
    question: "Does SwiftUI Skills support OpenClaw?",
    answer:
      "Yes. SwiftUI Skills now supports OpenClaw as an additional runtime. The same canonical skill package can live in OpenClaw-visible paths like ~/.agents/skills, ~/.openclaw/skills, or a workspace skills folder, and it keeps the same local Xcode docs workflow after setup.",
  },
  {
    value: "xcode-docs",
    question: "Why is this a SwiftUI coding skill from Xcode docs?",
    answer:
      "The project is built around documentation Apple ships inside Xcode, not scraped summaries or community paraphrases. That is what makes SwiftUI Skills different: the content is extracted locally from your machine and then used to guide the agent.",
  },
];

function Divider() {
  return <hr className="h-1 w-full rounded bg-neutral-800 border-0" />;
}

export default function Home() {
  const npxCommand = "npx skills add ameyalambat128/swiftui-skills";
  const globalSetupCommand = "~/.agents/skills/swiftui-skills/setup.sh";
  const openClawSetupCommand = "~/.openclaw/skills/swiftui-skills/setup.sh";
  const openClawWorkspaceCommand = "./skills/swiftui-skills/setup.sh";
  const localSetupCommand = "./.agents/skills/swiftui-skills/setup.sh";
  const curlCommand =
    "curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash";
  const openClawListCommand = "openclaw skills list";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
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
            grounded in the documentation Apple ships with Xcode.
          </p>

          <p className="mt-6 leading-relaxed text-gray-400">
            SwiftUI Skills extracts Apple-authored documentation shipped inside
            Xcode and turns it into reusable skills that help AI agents write
            idiomatic, Apple-native SwiftUI.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Now supports OpenClaw as well, with the same local-docs workflow.
          </p>

          {/* Installation */}
          <h2 className="mt-16 mb-4 text-xl font-bold gradient-text">
            Install SwiftUI Skills
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
                  OpenClaw shared install
                </p>
                <div className="flex gap-4 justify-between items-center">
                  <div className="text-gray-400 overflow-x-auto">
                    <span className="select-none text-gray-600">$ </span>
                    {openClawSetupCommand}
                  </div>
                  <CopyButton text={openClawSetupCommand} />
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
              <div>
                <p className="text-xs text-gray-500 mb-2 font-sans">
                  OpenClaw workspace install
                </p>
                <div className="flex gap-4 justify-between items-center">
                  <div className="text-gray-400 overflow-x-auto">
                    <span className="select-none text-gray-600">$ </span>
                    {openClawWorkspaceCommand}
                  </div>
                  <CopyButton text={openClawWorkspaceCommand} />
                </div>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-800 text-gray-500">
              <span className="select-none text-gray-600">&gt; </span>
              /swiftui-skills
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Local-first install. No telemetry. No Apple documentation
            redistributed.
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
              href="https://docs.openclaw.ai/tools/skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline hover:text-white"
            >
              OpenClaw
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
              OpenClaw support
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              SwiftUI Skills remains a developer-focused SwiftUI skill. OpenClaw
              support is additive: same package, same local-docs workflow, one
              more runtime.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              OpenClaw can load the skill from shared agent installs, OpenClaw
              shared installs, or workspace-local `skills/` folders.
            </p>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 ring-1 ring-neutral-900">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                Verify in OpenClaw
              </p>
              <div className="mt-3 flex gap-4 justify-between items-center">
                <div className="text-sm font-mono text-gray-400 overflow-x-auto">
                  <span className="select-none text-gray-600">$ </span>
                  {openClawListCommand}
                </div>
                <CopyButton text={openClawListCommand} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Start a new session after setup, then ask for a SwiftUI task and
                confirm the agent grounds itself in local extracted docs.
              </p>
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              What is SwiftUI Skills?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              SwiftUI is opinionated. Most AI agents do not know those opinions,
              so they default to generic patterns that feel wrong in real
              Apple-platform apps.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              SwiftUI Skills is a collection of local skills built from
              Apple-authored documentation that ships inside Xcode.
            </p>
            <p className="mb-6 leading-relaxed text-gray-400">
              These skills steer AI agents toward the same patterns Apple
              expects in real SwiftUI apps, which means more idiomatic code,
              fewer hallucinated APIs, and less cleanup after generation.
            </p>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>
                Uses Apple-written guidance extracted from your local Xcode
              </li>
              <li>Improves SwiftUI output for coding agents across editors</li>
              <li>Open source, local-first, and no telemetry by default</li>
            </ul>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              Why this exists
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              AI agents struggle with SwiftUI not because the models are weak
              but because SwiftUI encodes architectural and design decisions
              that are rarely written down in public documentation.
            </p>
            <p className="mb-4 leading-relaxed text-gray-400">
              Apple already ships a stronger source of truth inside Xcode.
            </p>
            <p className="leading-relaxed text-gray-400">
              SwiftUI Skills makes that guidance usable without moving the docs
              off your machine.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              What the skills cover
            </h2>
            <p className="mb-4 leading-relaxed text-gray-400">
              The current SwiftUI Skills package covers:
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
              SwiftUI Skills works by giving AI agents better context, not new
              models or proprietary hosted infrastructure.
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
                  Skills define how agents should use that guidance during
                  generation and refactoring
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-600 font-mono">3.</span>
                <p className="text-gray-400">
                  Your AI agent uses the docs as a local source of truth when
                  writing code
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              No Apple documentation is redistributed. Everything is extracted
              locally during setup.
            </p>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">
              Who this is for
            </h2>
            <ul className="space-y-1 list-disc list-inside text-gray-400">
              <li>iOS developers refactoring into SwiftUI</li>
              <li>Teams using AI agents to write SwiftUI-heavy apps</li>
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
              SwiftUI Skills is open source.
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
            <h2 className="mb-4 text-xl font-bold gradient-text">
              SwiftUI skills FAQ
            </h2>
            <p className="mb-6 max-w-2xl leading-relaxed text-gray-400">
              A short reference for teams looking for SwiftUI Skills and a
              better setup for AI coding agents, including Claude Code,
              OpenClaw, and Cursor.
            </p>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 px-5 py-3 ring-1 ring-neutral-900">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map(({ value, question, answer }) => (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger className="text-base text-gray-200 hover:no-underline">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="pr-8 leading-relaxed text-gray-400">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-5 ring-1 ring-neutral-900">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
                More context
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-gray-400">
                If you want the backstory, install flow, and why these skills
                exist, there&apos;s a longer write-up on the blog.
              </p>
              <Link
                href="https://www.ameyalambat.com/blog/swiftui-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm text-gray-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
              >
                Read the blog post
              </Link>
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="mb-4 text-xl font-bold gradient-text">Status</h2>
            <p className="leading-relaxed text-gray-400">
              Early and evolving. Expect the package to track new Apple platform
              guidance as Xcode changes.
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
