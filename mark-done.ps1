# mark-done.ps1 - Markera uppgifter som klara i README.md
# Användning: .\mark-done.ps1 <uppgiftsnummer>
# Exempel: .\mark-done.ps1 1  (markerar första uppgiften)

param(
    [Parameter(Position=0)]
    [int]$TaskNumber,
    [switch]$List,
    [switch]$Undo
)

$readmePath = Join-Path $PSScriptRoot "README.md"

if (-not (Test-Path $readmePath)) {
    Write-Host "Kunde inte hitta README.md" -ForegroundColor Red
    exit 1
}

$content = Get-Content $readmePath -Raw
$lines = Get-Content $readmePath

# Hitta alla checkboxar (inkl. ✅ utan bullet)
$checkboxPattern = "^(- \[[ x]\]|✅) .+"
$tasks = @()
$lineNumbers = @()

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match $checkboxPattern) {
        $tasks += $lines[$i]
        $lineNumbers += $i
    }
}

# Lista alla uppgifter
if ($List -or $TaskNumber -eq 0) {
    Write-Host "`nUppgifter i README.md:`n" -ForegroundColor Cyan
    for ($i = 0; $i -lt $tasks.Count; $i++) {
        $num = $i + 1
        $task = $tasks[$i]
        if ($task -match "^✅") {
            Write-Host "  $num. $task" -ForegroundColor Green
        } elseif ($task -match "\x\") {
            Write-Host "  $num. $task" -ForegroundColor Green
        } else {
            Write-Host "  $num. $task" -ForegroundColor Yellow
        }
    }
    Write-Host "`nAnvandning:" -ForegroundColor Cyan
    Write-Host "  .\mark-done.ps1 <nummer>       - Markera uppgift som klar"
    Write-Host "  .\mark-done.ps1 <nummer> -Undo - Avmarkera uppgift"
    Write-Host "  .\mark-done.ps1 -List          - Visa alla uppgifter`n"
    exit 0
}

# Validera uppgiftsnummer
if ($TaskNumber -lt 1 -or $TaskNumber -gt $tasks.Count) {
    Write-Host "Ogiltigt uppgiftsnummer. Valj 1-$($tasks.Count)" -ForegroundColor Red
    exit 1
}

$index = $TaskNumber - 1
$lineIndex = $lineNumbers[$index]
$originalLine = $lines[$lineIndex]

if ($Undo) {
    # Avmarkera: ändra ✅ till - [ ]
    $newLine = $originalLine -replace "^✅", "- [ ]" -replace "\[x\]", "[ ]"
    $action = "avmarkerad"
} else {
    # Markera: ändra - [ ] till ✅
    $newLine = $originalLine -replace "^- \[ \]", "✅"
    $action = "markerad som klar"
}

if ($originalLine -eq $newLine) {
    if ($Undo) {
        Write-Host "Uppgift $TaskNumber ar redan avmarkerad" -ForegroundColor Yellow
    } else {
        Write-Host "Uppgift $TaskNumber ar redan klar!" -ForegroundColor Yellow
    }
    exit 0
}

$lines[$lineIndex] = $newLine
$lines | Set-Content $readmePath -Encoding UTF8

Write-Host "`nUppgift $TaskNumber $action!" -ForegroundColor Green
Write-Host "  Fore: $originalLine" -ForegroundColor Gray
Write-Host "  Efter: $newLine" -ForegroundColor Cyan
