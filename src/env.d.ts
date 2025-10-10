/// <reference path="../.astro/types.d.ts" />

declare namespace App {
    interface Locals {
      user: User | null;
    }
  }

interface ImportMetaEnv {
  readonly MINIO_SERVER: string;
  readonly MINIO_ACCESS_KEY: string;
  readonly MINIO_SECRET_KEY: string;
  readonly MINIO_BUCKET_NAME: string;
  readonly PUBLIC_IMG_URL: string;
  readonly PUBLIC_WEBSITE_URL: string;
  readonly PUBLIC_WIKI_URL: string?;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}