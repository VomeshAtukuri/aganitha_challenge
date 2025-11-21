"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Loader2,
  Search,
} from "lucide-react";
import { DialogDelete } from "@/components/DialogDelete";
import { LinkData } from "@/types/Linkdata";
import { toast } from "sonner";

export default function Dashboard() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links");
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Validate URL format
  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form submission
  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.info("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Invalid URL format");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, code: customCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setUrl("");
        setCustomCode("");
        fetchLinks();
        toast.success("Link created successfully!");
      } else {
        toast.error("Failed to create link");
      }
    } catch (error) {
      toast.error("Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = (code: string) => {
    const fullUrl = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Copied to clipboard!");
  };

  // Filter links
  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">TinyLink</h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage your short links
          </p>
        </div>

        {/* Create Link Form */}
        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Create New Link
          </h2>
          <form onSubmit={handleCreateLink} className="space-y-4">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-foreground"
              >
                Destination URL <span className="text-destructive">*</span>
              </label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <label
                htmlFor="customCode"
                className="block text-sm font-medium text-foreground"
              >
                Custom Code{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="customCode"
                type="text"
                placeholder="my-awesome-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Leave empty to auto-generate
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Link"
              )}
            </Button>
          </form>
        </Card>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

          <Input
            type="text"
            placeholder="Search by code or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 rounded-lg border border-input bg-background 
               text-sm focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        {/* Links Table */}
        {filteredLinks.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Short Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Target URL
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Last Clicked
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr
                    key={link.code}
                    className="border-b border-border transition-colors hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleCopy(link.code)}
                        className="font-mono text-sm font-medium text-primary hover:underline flex items-center gap-2"
                        title="Click to copy"
                      >
                        {link.code}
                        <Copy className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="max-w-xs truncate text-sm text-foreground"
                        title={link.url}
                      >
                        {link.url}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {link.clicks}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {link.lastClicked
                        ? new Date(link.lastClicked).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DialogDelete code={link.code} setLinks={setLinks} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No links yet — create your first tiny link!
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
