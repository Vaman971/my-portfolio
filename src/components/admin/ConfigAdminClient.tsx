"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
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
};

export default function ConfigAdminClient() {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [form, setForm] = useState<SiteConfig>({
        ownerName: "",
        title: "",
        tagline: "",
        socials: { github: "", linkedin: "", email: "" },
        theme: { mode: "light", primaryColor: "#3b82f6" },
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
                        socials: data.socials ?? { github: "", linkedin: "", email: "" },
                        theme: data.theme ?? { mode: "light", primaryColor: "#3b82f6" },
                        id: data.id,
                    });
                }
            } catch {
                toast({ title: "Error fetching config", variant: "destructive" });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const onChange = (key: keyof SiteConfig, value: any) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const onSocialChange = (key: string, value: string) =>
        setForm((prev) => ({ ...prev, socials: { ...(prev.socials || {}), [key]: value } }));

    const onThemeChange = (key: string, value: any) =>
        setForm((prev) => ({ ...prev, theme: { ...(prev.theme || {}), [key]: value } }));

    const handleSave = async () => {
        if (!form.ownerName || !form.title) {
            toast({ title: "Owner name and title are required.", variant: "destructive" });
            return;
        }
        setSaving(true);
        try {
            if (config?.id) {
                const updated = await configService.updateConfig(config.id, form);
                setConfig(updated);
                toast({ title: "Config updated successfully" });
            } else {
                const created = await configService.createConfig(form);
                setConfig(created);
                toast({ title: "Config created successfully" });
            }
        } catch {
            toast({ title: "Failed to save config", variant: "destructive" });
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
            toast({ title: "Config deleted" });
        } catch {
            toast({ title: "Failed to delete config", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="h-64 bg-muted rounded animate-pulse" />
                    <div className="h-64 bg-muted rounded animate-pulse" />
                </div>
            </div>
        );
    }

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
                <ScrollArea  className="h-[calc(100vh-8rem)] pr-2">
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
