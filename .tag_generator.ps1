Write-Output -InputObject "Processing tag pages..."
Write-Output -InputObject "Checking for powershell-yaml module..."
if ($null -eq (Get-Module -Name powershell-yaml -ListAvailable)) {
    Write-Output -InputObject "Installing powershell-yaml module..."
    Install-Module -Name powershell-yaml -Scope CurrentUser -Force -AllowClobber
    Write-Output -InputObject "Importing powershell-yaml module..."
    Import-Module -Name powershell-yaml
}

$post_dir = '_posts/'
$draft_dir = '_drafts/'
$tag_dir = 'tag/'

$filenames = Get-ChildItem -Path $post_dir -Filter '*.md' |
    ForEach-Object -Process { $_.FullName }
$filenames += Get-ChildItem -Path $draft_dir -Filter '*.md' |
    ForEach-Object -Process { $_.FullName }

$pattern = '---\s*(.*?)\s*---'
$total_tags = @()
foreach ($filename in $filenames) {
    Write-Output -InputObject "Processing filename: $fileName..."
    $content = Get-Content -Path $filename -Encoding UTF8 -Raw
    if ([string]::IsNullOrWhiteSpace($content)) {
        Write-Output -InputObject "Filename $fileName empty, continuing..."
        continue
    }

    $match = [System.Text.RegularExpressions.Regex]::Match(
        $content,
        $pattern,
        [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($match.Success) {
        $convertedFromYamlObject = ConvertFrom-Yaml -Yaml $match.Groups[1].Value
        if ($convertedFromYamlObject.tags) {
            Write-Output -InputObject "Tags from $($fileName): $($convertedFromYamlObject.tags -join ',')..."
            $total_tags += $convertedFromYamlObject.tags
        }
    }
}

# -CaseSensitive keeps distinct casings intact; the default case-insensitive
# sort feeding case-sensitive Get-Unique let exact duplicates survive when a
# different casing sorted between them.
$total_tags = $total_tags | Sort-Object -CaseSensitive -Unique

# Tags differing only in case generate files that collide on case-insensitive
# filesystems (macOS), silently dropping one tag page while Linux CI keeps both.
$case_collisions = $total_tags |
    Group-Object -Property { $_.ToLowerInvariant() } |
    Where-Object -FilterScript { $_.Count -gt 1 }
if ($case_collisions) {
    $details = ($case_collisions | ForEach-Object -Process { $_.Group -join ', ' }) -join '; '
    throw "Tags differing only in case found ($details). Unify the casing in post frontmatter."
}

$old_tags = Get-ChildItem -Path $tag_dir -Filter '*.md' -ErrorAction SilentlyContinue |
    ForEach-Object -Process { $_.FullName }
foreach ($tag in $old_tags) {
    Remove-Item -Path $tag -Force
}

if (-not (Test-Path -Path $tag_dir)) {
    New-Item -Path $tag_dir -ItemType Directory | Out-Null
}

foreach ($tag in $total_tags) {
    $tag_filename = Join-Path -Path $tag_dir -ChildPath ($tag.Replace(' ', '_') + '.md')
    $write_str = @"
---
layout: tag_page
title: "Tag: $tag"
tag: $tag
robots: noindex
---

"@
    Set-Content -Path $tag_filename -Value $write_str -Encoding UTF8
}

Write-Output ("Tags generated, count " + $total_tags.Count)
