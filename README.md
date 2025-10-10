# ROBLOX 2012 Blog
Recreation of the ROBLOX Blog from 2012 with **Astro + Prisma + Minio**

# Build Instructions

1. Make a `.env` and follow the example configuration:
    ```env
    DATABASE_URL="sqlserver://HOST:PORT;database=radeon_blog;user=USERNAME;password=PASSWORD;encrypt=true;trustServerCertificate=true"

    MINIO_SERVER=http://HOST:PORT # or http://EXAMPLE.COM
    MINIO_ACCESS_KEY={ACCESS_KEY}
    MINIO_SECRET_KEY={SECRET_KEY}
    MINIO_BUCKET_NAME=radeon-cdn


    PUBLIC_IMG_URL=https://img.radeon-rr.net # Where the blog resolves profile pictures from
    PUBLIC_WEBSITE_URL=radeon-rr.net # Everything related to https://SUBDOMAIN.radeon-rr.com will fetch from this
    ```

2. Generate the database from the prisma schema by running this in your command line.
    ```bash
    npx prisma db push
    ```

2. Build the website
    ```bash
    npm run build
    ```

3. Run the server!
    ```bash
    node ./dist/server/entry.mjs
    ```

    Optionally you may need to provide the host and port the server will run on, for example you need it to point to `192.168.1.130:2456` instead of by default `localhost:4321`

    ```bash
    HOST=192.168.1.130 PORT=2456 node ./dist/server/entry.mjs
    ```
*Follow the same instructions but on Step 3 use `npm run dev` if you're trying to make changes to the blog.*