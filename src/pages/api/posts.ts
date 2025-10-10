import { prisma } from "@lib/prisma";
import { getPostUrl } from "@utils/url";
import type { APIContext } from "astro";

export async function GET({ cookies, redirect }: APIContext) {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      dateCreated: true,
    },
    take: 4,
    orderBy: { dateCreated: "desc" },
  });

  const siteUrl = import.meta.env.DEV ? "http://localhost:4321" : `http://blog.${import.meta.env.PUBLIC_WEBSITE_URL}`;

  const formattedPosts = posts.map(post => ({
    title: post.title,
    link: `${siteUrl}${getPostUrl(post)}`,
    pubDate: post.dateCreated
  }));

  return new Response(JSON.stringify(formattedPosts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
