export const dynamic = "force-dynamic";

import { db } from "@/lib/db/index";
import { settings, techStack } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { SettingsEditor } from "@/components/admin/settings-editor";

export default async function AdminSettingsPage() {
  const { session } = await validateRequest();
  if (!session) return redirect("/admin/login");

  let hero = {};
  let footer = {};
  let contact = {};
  let codeCompass = {};
  let techStacks: any[] = [];

  try {
    const [heroSetting] = await db.select().from(settings).where(eq(settings.key, "hero")).limit(1);
    const [footerSetting] = await db.select().from(settings).where(eq(settings.key, "footer")).limit(1);
    const [contactSetting] = await db.select().from(settings).where(eq(settings.key, "contact")).limit(1);
    const [codeCompassSetting] = await db.select().from(settings).where(eq(settings.key, "code_compass")).limit(1);
    techStacks = await db.select().from(techStack);

    hero = heroSetting ? JSON.parse(heroSetting.value) : {};
    footer = footerSetting ? JSON.parse(footerSetting.value) : {};
    contact = contactSetting ? JSON.parse(contactSetting.value) : {};
    codeCompass = codeCompassSetting ? JSON.parse(codeCompassSetting.value) : {};
  } catch (error) {
    console.error("Failed to fetch admin settings:", error);
  }

  return (
    <SettingsEditor 
      hero={hero} 
      footer={footer} 
      contact={contact}
      codeCompass={codeCompass}
      techStacks={techStacks} 
    />
  );
}
