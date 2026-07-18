# Floscas Writer

Windows desktop editor for publishing Markdown articles through the existing Cloudflare admin API.

Build with:

```powershell
powershell -ExecutionPolicy Bypass -File .\desktop-editor\build.ps1
```

The admin key is encrypted for the current Windows user with DPAPI and stored under `%APPDATA%\Floscas`.
