# Floscas Studio

Floscas Studio is a mobile-first publishing client for this Hugo site. The Android APK contains the same interface available at `/admin/`, while a Cloudflare Pages Function performs authenticated GitHub commits.

## Security setup

Create a fine-grained GitHub personal access token with **Contents: Read and write** access to `chocojun/choco-blog` only. Store it in Cloudflare; never paste it into the app or commit it to this repository.

```powershell
pnpm exec wrangler pages secret put GITHUB_CONTENT_TOKEN --project-name choco-blog
pnpm exec wrangler pages secret put ADMIN_API_KEY --project-name choco-blog
```

Use a long random value for `ADMIN_API_KEY`. After the next Pages deployment, open Floscas Studio and enter:

- API URL: `https://choco-blog-20l.pages.dev/api/admin`
- Admin key: the value stored in `ADMIN_API_KEY`

The app keeps the admin key in session storage only. Closing the app clears it.

Optional Pages environment variables:

- `GITHUB_REPOSITORY`: defaults to `chocojun/choco-blog`
- `GITHUB_BRANCH`: defaults to `main`
- `ADMIN_ALLOWED_ORIGINS`: comma-separated additional browser origins

## APK build

The `Build Floscas Studio APK` GitHub Actions workflow builds an installable debug APK whenever the Android shell or admin UI changes. Open the workflow run, download the `floscas-studio-apk` artifact, unzip it, and install `app-debug.apk` on Android.

The debug build is intended for private installation. Before public distribution, add a stable release keystore and publish an Android App Bundle through a private Play testing track.
