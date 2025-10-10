<script lang="ts">
  import { marked } from "marked";
    
  import { formatDateWithOrdinal } from "@utils/date";

  import type { Post } from "@utils/types/post";

  export let post: Post;
</script>

<div>
    <article class={`post type-post status-publish format-standard hentry`}>
        <header class="entry-header">
          <h1 class="entry-title">
            <a 
              href={`#`}
              title={post.title}
              rel="bookmark"
              >
              {post.title}
            </a>
          </h1>
          <div class="entry-meta">
            <span class="by-author">
              <span class="sep"> By </span> 
              <span class="author vcard">
                <a class="url fn n" href={`#`} title={`View all posts by ${post.author.username}`} rel="author">{post.author.username}</a>
              </span>
            </span> - 
            <time class="entry-date" datetime={new Date().toISOString()}>{formatDateWithOrdinal(new Date())}</time>
          </div>
        </header>
        <div class="entry-content">
          {@html marked(post.content!)}
        </div>
      
        <footer class="entry-meta">
            This entry was posted in
            {#each post.categories as category, index}
              <a href={`#`}>{category.categoryName}</a>{index < post.categories.length - 1 ? ", " : ""}
            {/each}
            {#if post.categories.length === 0}
              <i>No Categories</i>
            {/if}
            by
            <a href={`#`}>{post.author.username}</a>
            . Bookmark the
            <a href={`#`}
              title={post.title}
              rel="bookmark"
              >permalink</a>.
      
            <div id="author-info">
              <div id="author-avatar">
                <img alt="" src={`${import.meta.env.PUBLIC_IMG_URL}/${post.author.pfp}?width=74&height=74`} class="avatar photo" width="68" height="68">
              </div>
              <div id="author-description">
                <h2>About {post.author.username}</h2>
                {post.author.bio}
                <div id="author-link">
                  <a href={`#`} rel="author">
                    View all posts by {post.author.username} <span class="meta-nav">→</span></a>
                </div>
              </div>
            </div>
        </footer>
      </article>
      
      <div id="comments">
        <p class="nocomments"></p>
      </div>
</div>