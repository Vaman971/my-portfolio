"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as configService from "@/services/config";
import SectionCard from "./config/SectionCard";
import ConfigForm from "./config/ConfigForm";
import SocialInputs from "./config/SocialInputs";
import ThemeInputs from "./config/ThemeInputs";
import ConfigActions from "./config/ConfigActions";
import LivePreview from "./config/LivePreview";
import { ScrollArea } from "@/components/ui/scroll-area"

type SiteConfig = {
    id?: string;
    ownerName: string;
    title: string;
    tagline?: string;
    socials?: Record<string, string>;
    theme?: Record<string, any>;
    cvUrl?: string; // ✅ new field
};

export default function ConfigAdminClient() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [form, setForm] = useState<SiteConfig>({
    ownerName: "",
    title: "",
    tagline: "",
    socials: { github: "", linkedin: "", email: "" },
    theme: { mode: "light", primaryColor: "#3b82f6" },
    cvUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await configService.fetchConfig();
        if (data && Object.keys(data).length) {
          setConfig(data);
          setForm({
            ownerName: data.ownerName ?? "",
            title: data.title ?? "",
            tagline: data.tagline ?? "",
            socials: data.socials ?? {
              github: "",
              linkedin: "",
              email: "",
            },
            theme: data.theme ?? { mode: "light", primaryColor: "#3b82f6" },
            id: data.id,
            cvUrl: data.cvUrl ?? "",
          });
        }
      } catch {
        toast.error("Error fetching config");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onChange = (key: keyof SiteConfig, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSocialChange = (key: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      socials: { ...(prev.socials || {}), [key]: value },
    }));

  const onThemeChange = (key: string, value: any) =>
    setForm((prev) => ({
      ...prev,
      theme: { ...(prev.theme || {}), [key]: value },
    }));

  const handleSave = async () => {
    if (!form.ownerName || !form.title) {
      toast.error("Owner name and title are required.");
      return;
    }
    setSaving(true);
    try {
      if (config?.id) {
        const updated = await configService.updateConfig(config.id, form);
        setConfig(updated);
        toast.success("Config updated successfully");
      } else {
        const created = await configService.createConfig(form);
        setConfig(created);
        toast.success("Config created successfully");
      }
    } catch {
      toast.error("Failed to save config");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!config?.id) return;
    if (!confirm("Delete the site config? This cannot be undone.")) return;
    setSaving(true);
    try {
      await configService.deleteConfig(config.id);
      setConfig(null);
      setForm({
        ownerName: "",
        title: "",
        tagline: "",
        socials: { github: "", linkedin: "", email: "" },
        theme: { mode: "light", primaryColor: "#3b82f6" },
      });
      toast.success("Config deleted");
    } catch {
      toast.error("Failed to delete config");
    } finally {
      setSaving(false);
    }
  };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Site Config</h2>
                    <p className="text-sm text-muted-foreground">
                        Update your hero, footer, socials and theme in one place.
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column: inputs */}
                <ScrollArea className="h-[calc(100vh-8rem)] pr-2">
                    <SectionCard
                        title="Basic information"
                        description="Owner profile and site title/tagline."
                    >
                        <ConfigForm form={form} onChange={onChange} />
                    </SectionCard>

                    <SectionCard
                        title="Socials"
                        description="Links used in footer and contact actions."
                    >
                        <SocialInputs socials={form.socials || {}} onChange={onSocialChange} />
                    </SectionCard>

                    <SectionCard
                        title="Theme"
                        description="Set appearance preferences."
                    >
                        <ThemeInputs theme={form.theme || {}} onChange={onThemeChange} />
                    </SectionCard>
                </ScrollArea>

                {/* Right column: live preview */}
                <div className="flex flex-col gap-6 sticky top-6 space-y-6">
                    <LivePreview
                        ownerName={form.ownerName}
                        title={form.title}
                        tagline={form.tagline}
                        socials={form.socials}
                        theme={form.theme}
                        cvUrl={form.cvUrl}
                    />
                    <ConfigActions
                        saving={saving}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        hasConfig={!!config?.id}
                    />
                </div>
            </div>
        </div>
    );
}
