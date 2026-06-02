import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = req.nextUrl.searchParams.get("workspaceId");
    if (!workspaceId) {
      return NextResponse.json({ message: "workspaceId required" }, { status: 400 });
    }

    const pages = await prisma.facebookPage.findMany({
      where: { workspaceId },
      include: { _count: { select: { posts: true } } },
      orderBy: { connectedAt: "desc" },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Pages GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

const connectSchema = z.object({
  workspaceId: z.string(),
  facebookPageId: z.string(),
  name: z.string(),
  accessToken: z.string(),
  category: z.string().optional(),
  followers: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = connectSchema.parse(body);

    const page = await prisma.facebookPage.create({
      data: {
        facebookPageId: data.facebookPageId,
        name: data.name,
        accessToken: data.accessToken,
        category: data.category,
        followers: data.followers ?? 0,
        tokenExpiresAt: new Date(Date.now() + 60 * 86400000), // 60 days
        workspaceId: data.workspaceId,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid input", errors: error.issues }, { status: 400 });
    }
    console.error("Pages POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
