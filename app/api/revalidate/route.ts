import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }
  }

  try {
    const body = await req.json();
    const type = body._type;

    const slug = body.slug?.current ?? body.slug; // support {slug} or {slug: {current}}
    if (type === "post") {
      revalidatePath("/blog");
      revalidatePath("/");
      if (slug) revalidatePath(`/blog/${slug}`);
    } else if (type === "work") {
      revalidatePath("/work");
      revalidatePath("/");
      if (slug) revalidatePath(`/work/${slug}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
}
