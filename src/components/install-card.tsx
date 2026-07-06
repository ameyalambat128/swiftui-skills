"use client";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const curlCommand =
  "curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash";
const npxCommand = "npx skills add ameyalambat128/swiftui-skills";
const globalSetupCommand = "~/.agents/skills/swiftui-skills/setup.sh";
const localSetupCommand = "./.agents/skills/swiftui-skills/setup.sh";
const openClawSharedLines = [
  "mkdir -p ~/.openclaw/skills",
  "cp -R skills/swiftui-skills ~/.openclaw/skills/swiftui-skills",
  "~/.openclaw/skills/swiftui-skills/setup.sh",
];
const openClawWorkspaceLines = [
  "mkdir -p ./skills",
  "cp -R skills/swiftui-skills ./skills/swiftui-skills",
  "./skills/swiftui-skills/setup.sh",
];
const claudePluginCommand =
  "claude --plugin-dir /absolute/path/to/swiftui-skills";
const cursorPluginLines = [
  "mkdir -p ~/.cursor/plugins/local",
  "ln -s /absolute/path/to/swiftui-skills ~/.cursor/plugins/local/swiftui-skills",
];

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs text-gray-500 font-sans">{children}</p>;
}

function CommandRow({ command }: { command: string }) {
  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="text-gray-400 overflow-x-auto">
        <span className="select-none text-gray-600">$ </span>
        {command}
      </div>
      <CopyButton text={command} />
    </div>
  );
}

function CommandBlock({ lines }: { lines: string[] }) {
  return (
    <div className="flex gap-4 justify-between items-start">
      <div className="space-y-1 text-gray-400 overflow-x-auto">
        {lines.map((line) => (
          <div key={line}>
            <span className="select-none text-gray-600">$ </span>
            {line}
          </div>
        ))}
      </div>
      <CopyButton text={lines.join("\n")} />
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-medium text-gray-400 font-sans">
      {children}
    </p>
  );
}

function InfoBlock({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500 font-sans">{children}</p>;
}

export function InstallCard() {
  return (
    <div className="px-5 py-4 font-mono text-sm rounded-lg bg-neutral-900 ring-1 ring-neutral-800">
      <Tabs defaultValue="quick">
        <TabsList>
          <TabsTrigger value="quick">Quick</TabsTrigger>
          <TabsTrigger value="manual">npx skills</TabsTrigger>
          <TabsTrigger value="openclaw">OpenClaw</TabsTrigger>
          <TabsTrigger value="plugin">Plugin</TabsTrigger>
        </TabsList>

        <TabsContent value="quick">
          <Caption>Recommended · installs into every detected runtime</Caption>
          <CommandRow command={curlCommand} />
        </TabsContent>

        <TabsContent value="manual">
          <StepLabel>Step 1 · Add the skill</StepLabel>
          <CommandRow command={npxCommand} />
          <p className="mt-2 text-xs text-gray-500 font-sans">
            Choose Global or Project in the skills TUI, and keep Symlink
            (Recommended) selected.
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <StepLabel>Step 2 · Run setup</StepLabel>
          </div>
          <Tabs defaultValue="global" className="mt-1">
            <TabsList className="mb-3">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="project">Project</TabsTrigger>
            </TabsList>
            <TabsContent value="global" className="mt-0">
              <CommandRow command={globalSetupCommand} />
            </TabsContent>
            <TabsContent value="project" className="mt-0">
              <CommandRow command={localSetupCommand} />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="openclaw">
          <Tabs defaultValue="shared">
            <TabsList className="mb-3">
              <TabsTrigger value="shared">Shared</TabsTrigger>
              <TabsTrigger value="workspace">Workspace</TabsTrigger>
            </TabsList>
            <TabsContent value="shared" className="mt-0">
              <CommandBlock lines={openClawSharedLines} />
            </TabsContent>
            <TabsContent value="workspace" className="mt-0">
              <CommandBlock lines={openClawWorkspaceLines} />
            </TabsContent>
          </Tabs>
          <p className="mt-3 text-xs text-gray-500 font-sans">
            Then run{" "}
            <code className="font-mono text-gray-400">
              openclaw skills list
            </code>{" "}
            to verify.
          </p>
        </TabsContent>

        <TabsContent value="plugin">
          <Caption>
            Native plugin manifests ship in-repo. Use them for local plugin
            testing, not as the default install path.
          </Caption>
          <Tabs defaultValue="claude">
            <TabsList className="mb-3">
              <TabsTrigger value="claude">Claude Code</TabsTrigger>
              <TabsTrigger value="cursor">Cursor</TabsTrigger>
              <TabsTrigger value="codex">Codex</TabsTrigger>
            </TabsList>
            <TabsContent value="claude" className="mt-0">
              <CommandRow command={claudePluginCommand} />
              <InfoBlock>
                Claude&apos;s local plugin test flow uses{" "}
                <code className="font-mono text-gray-400">--plugin-dir</code>.
                Run{" "}
                <code className="font-mono text-gray-400">/reload-plugins</code>{" "}
                after edits.
              </InfoBlock>
            </TabsContent>
            <TabsContent value="cursor" className="mt-0">
              <CommandBlock lines={cursorPluginLines} />
              <InfoBlock>
                Restart Cursor, or run Developer: Reload Window, after linking
                the repo.
              </InfoBlock>
            </TabsContent>
            <TabsContent value="codex" className="mt-0">
              <InfoBlock>
                Codex plugin packaging is included via{" "}
                <code className="font-mono text-gray-400">
                  .codex-plugin/plugin.json
                </code>
                , but local plugin install goes through a marketplace flow, not
                a{" "}
                <code className="font-mono text-gray-400">~/.codex/skills</code>{" "}
                symlink. Direct skill install is still the recommended path
                here.
              </InfoBlock>
            </TabsContent>
          </Tabs>
          <p className="mt-3 text-xs text-gray-500 font-sans">
            If you are testing from the repo itself and{" "}
            <code className="font-mono text-gray-400">docs/</code> is empty, run{" "}
            <code className="font-mono text-gray-400">
              ./skills/swiftui-skills/setup.sh
            </code>{" "}
            once first.
          </p>
        </TabsContent>
      </Tabs>

      <div className="pt-4 mt-4 border-t border-neutral-800 text-white">
        <span className="select-none text-gray-600">&gt; </span>
        /swiftui-skills
      </div>
    </div>
  );
}
