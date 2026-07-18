$ErrorActionPreference = 'Stop'
$compiler = 'C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$output = Join-Path $PSScriptRoot 'dist\FloscasWriter.exe'
New-Item -ItemType Directory -Force (Split-Path $output) | Out-Null
& $compiler /nologo /target:winexe /optimize+ /out:$output `
  /reference:System.dll `
  /reference:System.Core.dll `
  /reference:System.Drawing.dll `
  /reference:System.Windows.Forms.dll `
  /reference:System.Net.Http.dll `
  /reference:System.Web.Extensions.dll `
  /reference:System.Security.dll `
  (Join-Path $PSScriptRoot 'Program.cs')
if ($LASTEXITCODE -ne 0) { throw "C# compiler failed with exit code $LASTEXITCODE" }
Write-Output $output
