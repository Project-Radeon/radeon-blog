export function capitalizeDomainPrefix(domain: string): string {
  domain = domain || "epicquest.live";
  
  const parts = domain.split(".");

  return parts[0].toUpperCase() + "." + parts[1];
}

export function getPostUrl(post: any): string {
  return `/${post.dateCreated.getFullYear()}/${(post.dateCreated.getMonth() + 1).toString().padStart(2, "0")}/${post.slug}`;
}