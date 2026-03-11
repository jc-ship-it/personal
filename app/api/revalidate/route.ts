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

    if (type === "post") {
      revalidatePath("/blog");
      revalidatePath("/");
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`);
      }
    } else if (type === "work") {
      revalidatePath("/work");
      revalidatePath("/");
      if (body.slug?.current) {
        revalidatePath(`/work/${body.slug.current}`);
      }
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Error" },
      { status: 500 }
    );
  }
}
