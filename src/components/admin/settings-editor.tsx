"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import { updateSettings, createTechStack, updateTechStack, deleteTechStack, reorderTechStack } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, User, Share2, Cpu, Plus, Trash2, ChevronDown, ChevronUp, Globe, Mail, LinkIcon, FileText, ImageIcon, Hash, Briefcase, Building2, MapPin, Calendar, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SortableList, SortableItem } from "./sortable-list";

interface SettingsEditorProps {
  hero: any;
  footer: any;
  contact: any;
  codeCompass: any;
  techStacks: any[];
}

export function SettingsEditor({ hero, footer, contact, codeCompass, techStacks }: SettingsEditorProps) {
  const { toast } = useToast();
  const [heroState, heroAction, isHeroPending] = useActionState(updateSettings, null);
  const [footerState, footerAction, isFooterPending] = useActionState(updateSettings, null);
  const [contactState, contactAction, isContactPending] = useActionState(updateSettings, null);
  const [codeState, codeAction, isCodePending] = useActionState(updateSettings, null);
  const [newTechState, newTechAction, isNewTechPending] = useActionState(createTechStack, null);

  useEffect(() => {
    if (heroState?.success) toast({ title: "Hero settings saved" });
    if (heroState?.error) toast({ title: "Error saving hero settings", variant: "destructive" });
  }, [heroState, toast]);

  useEffect(() => {
    if (contactState?.success) toast({ title: "Contact settings saved" });
    if (contactState?.error) toast({ title: "Error saving contact settings", variant: "destructive" });
  }, [contactState, toast]);

  useEffect(() => {
    if (footerState?.success) toast({ title: "Footer settings saved" });
    if (footerState?.error) toast({ title: "Error saving footer settings", variant: "destructive" });
  }, [footerState, toast]);

  useEffect(() => {
    if (codeState?.success) toast({ title: "CodeCompass settings saved" });
    if (codeState?.error) toast({ title: "Error saving CodeCompass settings", variant: "destructive" });
  }, [codeState, toast]);

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your identity and technical stack.</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="hero" className="flex items-center gap-2 py-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Hero</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2 py-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center gap-2 py-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Footer</span>
          </TabsTrigger>
          <TabsTrigger value="codecompass" className="flex items-center gap-2 py-2">
            <Cpu className="h-4 w-4" />
            <span className="hidden sm:inline">CodeCompass</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <HeroForm data={hero} action={heroAction} isPending={isHeroPending} />
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <ContactForm data={contact} action={contactAction} isPending={isContactPending} />
        </TabsContent>

        <TabsContent value="footer" className="mt-6">
          <FooterForm data={footer} action={footerAction} isPending={isFooterPending} />
        </TabsContent>

        <TabsContent value="codecompass" className="mt-6">
          <CodeCompassForm data={codeCompass} action={codeAction} isPending={isCodePending} />
        </TabsContent>
      </Tabs>

      <TechStackSection
        techStacks={techStacks}
        newTechAction={newTechAction}
        isNewTechPending={isNewTechPending}
        newTechState={newTechState}
      />
    </div>
  );
}

function HeroForm({ data, action, isPending }: { data: any; action: any; isPending: boolean }) {
  const [name, setName] = useState(data?.name || "");
  const [roles, setRoles] = useState(Array.isArray(data?.roles) ? data.roles.join(", ") : "");
  const [description, setDescription] = useState(data?.description || "");
  const [image, setImage] = useState(data?.image || "");
  const [resume, setResume] = useState(data?.resume || "");
  const [github, setGithub] = useState(data?.github || "");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({
      name,
      roles: roles.split(",").map((r: string) => r.trim()).filter(Boolean),
      description,
      image,
      resume,
      github,
    });
    const formData = new FormData();
    formData.set("key", "hero");
    formData.set("value", payload);
    action(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Hero Section
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-name">Full Name</Label>
              <Input
                id="hero-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-roles">Roles (comma-separated)</Label>
              <Input
                id="hero-roles"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                placeholder="Backend Developer, DevOps Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-description">Description</Label>
            <Textarea
              id="hero-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell visitors about yourself..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-image">Profile Image URL</Label>
              <Input
                id="hero-image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="./shadil.jpeg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-resume">Resume URL</Label>
              <Input
                id="hero-resume"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-github">GitHub URL</Label>
            <Input
              id="hero-github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Hero</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ContactForm({ data, action, isPending }: { data: any; action: any; isPending: boolean }) {
  const [email, setEmail] = useState(data?.email || "");
  const [linkedin, setLinkedin] = useState(data?.linkedin || "");
  const [description, setDescription] = useState(data?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({ email, linkedin, description });
    const formData = new FormData();
    formData.set("key", "contact");
    formData.set("value", payload);
    action(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Contact Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-linkedin">LinkedIn URL</Label>
            <Input
              id="contact-linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-description">Description</Label>
            <Textarea
              id="contact-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="I'm open to new opportunities..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Contact</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function FooterForm({ data, action, isPending }: { data: any; action: any; isPending: boolean }) {
  const [email, setEmail] = useState(data?.email || "");
  const [github, setGithub] = useState(data?.github || "");
  const [linkedin, setLinkedin] = useState(data?.linkedin || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({ email, github, linkedin });
    const formData = new FormData();
    formData.set("key", "footer");
    formData.set("value", payload);
    action(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Footer & Socials
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footer-email">Email</Label>
            <Input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer-github">GitHub URL</Label>
            <Input
              id="footer-github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer-linkedin">LinkedIn URL</Label>
            <Input
              id="footer-linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Footer</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function CodeCompassForm({ data, action, isPending }: { data: any; action: any; isPending: boolean }) {
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [github, setGithub] = useState(data?.github || "");
  const [image, setImage] = useState(data?.image || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({ title, description, github, image });
    const formData = new FormData();
    formData.set("key", "code_compass");
    formData.set("value", payload);
    action(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          CodeCompass
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code-title">Title</Label>
            <Input
              id="code-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="CodeCompass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code-description">Description</Label>
            <Textarea
              id="code-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your organization..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="code-github">GitHub URL</Label>
              <Input
                id="code-github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/org"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code-image">Logo Image URL</Label>
              <Input
                id="code-image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="./codecompass.png"
              />
            </div>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save CodeCompass</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function TechStackSection({ techStacks, newTechAction, isNewTechPending, newTechState }: {
  techStacks: any[];
  newTechAction: any;
  isNewTechPending: boolean;
  newTechState: any;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [items, setItems] = useState(techStacks.map((s) => s.id));
  const [isReordering, setIsReordering] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (newTechState?.success) {
      window.location.reload();
    }
  }, [newTechState]);

  const handleReorder = async (newOrder: string[]) => {
    setItems(newOrder);
    setIsReordering(true);
    const result = await reorderTechStack(newOrder);
    setIsReordering(false);
    if (result?.error) {
      toast({ title: "Error reordering", variant: "destructive" });
    }
  };

  const stackMap = Object.fromEntries(techStacks.map((s) => [s.id, s]));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Cpu className="h-6 w-6 text-primary" /> Tech Stack Categories
      </h2>

      <SortableList items={items} onReorder={handleReorder}>
        <div className="space-y-3">
          {items.map((id) => {
            const stack = stackMap[id];
            if (!stack) return null;
            return (
              <SortableItem key={stack.id} id={stack.id}>
                <TechStackCard
                  stack={stack}
                  isExpanded={expandedId === stack.id}
                  onToggle={() => setExpandedId(expandedId === stack.id ? null : stack.id)}
                />
              </SortableItem>
            );
          })}
        </div>
      </SortableList>

      {isReordering && (
        <div className="p-2 text-center text-sm text-muted-foreground bg-muted/20 rounded">
          Saving order...
        </div>
      )}

      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <form action={newTechAction} className="flex gap-3 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="new-category-name">New Category Name</Label>
              <Input
                id="new-category-name"
                name="name"
                placeholder="e.g., Frontend, Backend, DevOps"
                required
              />
            </div>
            <input type="hidden" name="items" value="[]" />
            <Button type="submit" disabled={isNewTechPending}>
              {isNewTechPending ? "Adding..." : <><Plus className="mr-2 h-4 w-4" /> Add Category</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function TechStackCard({ stack, isExpanded, onToggle }: {
  stack: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [name, setName] = useState(stack.name);
  const [items, setItems] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(stack.items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [newItem, setNewItem] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.set("id", stack.id);
    formData.set("name", name);
    formData.set("items", JSON.stringify(items));
    try {
      await updateTechStack(formData);
      toast({ title: `${name} updated` });
    } catch (error) {
      toast({ title: "Error updating category", variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (confirm(`Delete "${name}" category?`)) {
      await deleteTechStack(stack.id);
      window.location.reload();
    }
  };

  return (
    <Card className="overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>

      {isExpanded && (
        <div className="border-t p-4 space-y-4">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
            />
          </div>

          <div className="space-y-2">
            <Label>Items</Label>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-1 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddItem();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Category
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save</>}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
