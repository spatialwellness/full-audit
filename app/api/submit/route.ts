import { NextRequest, NextResponse } from "next/server";
import { calculateScores, generateActionItems } from "@/lib/scoring";
import { colorPalettes } from "@/lib/color-palettes";
import { layoutExamples } from "@/lib/layout-examples";
import { AuditResult } from "@/lib/types";
import { saveResult } from "@/lib/storage";

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
}

function selectRecommendedPalettes(scores: ReturnType<typeof calculateScores>): string[] {
  const categoryScores = [
    { cat: "lighting", score: scores.lighting },
    { cat: "acoustics", score: scores.acoustics },
    { cat: "biophilia", score: scores.biophilia },
    { cat: "sensory-comfort", score: scores.sensory },
  ];

  const lowestCategories = categoryScores
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map((c) => c.cat);

  const contextMap: Record<string, string[]> = {
    lighting: ["light-and-air", "minimalist-zen", "natural-energy"],
    acoustics: ["calm-focus", "deep-concentration", "forest-retreat"],
    biophilia: ["forest-retreat", "natural-energy", "earthy-warmth"],
    "sensory-comfort": ["warm-grounding", "coastal-calm", "minimalist-zen"],
  };

  const seen = new Set<string>();
  const result: string[] = [];

  lowestCategories.forEach((cat) => {
    const palettes = contextMap[cat] || [];
    palettes.forEach((id) => {
      if (!seen.has(id) && result.length < 3) {
        seen.add(id);
        result.push(id);
      }
    });
  });

  // Fill up to 3 if needed
  if (result.length < 3) {
    colorPalettes.forEach((p) => {
      if (!seen.has(p.id) && result.length < 3) {
        result.push(p.id);
      }
    });
  }

  return result;
}

function selectRecommendedLayouts(formData: Record<string, unknown>): string[] {
  const spaceType = formData.spaceType as string;
  const privacy = parseInt(formData.q_privacy as string || "2", 10);
  const sensory = parseInt(formData.q_sensory as string || "2", 10);

  const layouts: string[] = [];

  if (sensory <= 2) layouts.push("stille-hoek");
  if (spaceType === "open-plan") layouts.push("zonering");
  if (privacy <= 2) layouts.push("flexibele-route");
  layouts.push("groene-lint");
  layouts.push("raamprincipe");

  const seen = new Set<string>();
  const unique: string[] = [];
  layouts.forEach((l) => { if (!seen.has(l)) { seen.add(l); unique.push(l); } });
  return unique.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = generateId();

    const scores = calculateScores(body);
    const actionItems = generateActionItems(scores, body);
    const recommendedPalettes = selectRecommendedPalettes(scores);
    const recommendedLayouts = selectRecommendedLayouts(body);

    const lowestScore = Math.min(
      scores.lighting,
      scores.acoustics,
      scores.temperature,
      scores.layout,
      scores.privacy,
      scores.biophilia,
      scores.sensory,
      scores.ergonomics
    );

    const overallLabel =
      scores.overall >= 3.5
        ? "Your workplace is performing well across most areas."
        : scores.overall >= 2.5
        ? "Your workplace has solid foundations with clear opportunities for improvement."
        : "Your workplace needs meaningful attention in several key areas.";

    const result: AuditResult = {
      id,
      createdAt: new Date().toISOString(),
      companyName: body.companyName || "Your organisation",
      contactName: body.contactName || "",
      contactEmail: body.contactEmail || "",
      scores,
      actionItems,
      recommendedPalettes,
      recommendedLayouts,
      summary: `${overallLabel} Your overall spatial wellness score is ${scores.overall.toFixed(1)} out of 5. ${
        lowestScore <= 2
          ? `Priority areas requiring attention have been identified in your action plan.`
          : `Your space is functional - the recommendations below will help you unlock its full potential.`
      }`,
    };

    // Log to Vercel function logs
    console.log("FULL_AUDIT_SUBMISSION:", JSON.stringify({
      id,
      companyName: body.companyName,
      contactEmail: body.contactEmail,
      scores,
      submittedAt: result.createdAt,
    }));

    // Send email notification via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const scoreLines = Object.entries(scores)
          .filter(([k]) => k !== "overall")
          .map(([cat, score]) => `${cat}: ${(score as number).toFixed(1)}/5`)
          .join("\n");

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Spatial Wellness Full Audit <hello@spatial-wellness.com>",
            to: "hello@spatial-wellness.com",
            subject: `New Full Audit: ${body.companyName || "Unknown"} (${body.contactEmail})`,
            text: `New Full Spatial Wellness Audit submission\n\nID: ${id}\nCompany: ${body.companyName}\nContact: ${body.contactName} (${body.contactEmail})\nIndustry: ${body.industry}\nEmployees: ${body.employeeCount}\nSpace: ${body.totalSqm}m2, ${body.numberOfSpaces} rooms, ${body.spaceType}\n\nOverall Score: ${scores.overall.toFixed(1)}/4\n\n${scoreLines}\n\nResults URL: ${process.env.NEXT_PUBLIC_BASE_URL || "https://full-audit.vercel.app"}/results/${id}`,
          }),
        });
      } catch (emailError) {
        console.error("Email delivery failed:", emailError);
      }
    }

    // Write to /tmp as backup log
    try {
      const fs = await import("fs");
      const path = "/tmp/full-audit-submissions.jsonl";
      fs.appendFileSync(path, JSON.stringify(result) + "\n");
    } catch {
      // /tmp may not always be available
    }

    // Store result (KV or /tmp)
    await saveResult(result);

    return NextResponse.json({ ok: true, id, result });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { ok: false, error: "Submission failed" },
      { status: 500 }
    );
  }
}
