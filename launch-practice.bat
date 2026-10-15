@echo off
setlocal
set "ROOT=%~dp0"
set "URL=http://127.0.0.1:5173"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm are required. Install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "%ROOT%web\node_modules\lottie-react\package.json" (
  echo Web app dependencies are missing.
  choice /C YN /N /M "Download and install them now? [Y/N] "
  if errorlevel 2 (
    echo Dependency installation was declined. The practice app cannot run without them.
    pause
    exit /b 1
  )
  echo Downloading and installing web app dependencies...
  pushd "%ROOT%web"
  call npm install
  if errorlevel 1 (
    popd
    echo Dependency installation failed.
    pause
    exit /b 1
  )
  popd
)

powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference = 'Stop'; try { $listeners = @(Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue); foreach ($listener in $listeners) { $ownerId = [int]$listener.OwningProcess; if ($ownerId -gt 0) { Write-Host ('Stopping process {0} ({1}) using port 5173...' -f $ownerId, (Get-Process -Id $ownerId).ProcessName); Stop-Process -Id $ownerId -Force -ErrorAction Stop } }; for ($i = 0; $i -lt 15; $i++) { $remaining = @(Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue); if ($remaining.Count -eq 0) { exit 0 }; Start-Sleep -Seconds 1 }; throw 'Port 5173 is still in use.' } catch { Write-Error ('Could not free port 5173: {0}' -f $_); exit 1 }"
if errorlevel 1 (
  echo Could not free port 5173. Close the application using that port and try again.
  pause
  exit /b 1
)

echo Port 5173 is free. Starting a fresh practice server...
start "Pure Minigames Practice Server" cmd /k "cd /d ""%ROOT%web"" && npm run dev -- --host 127.0.0.1 --strictPort"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$url = '%URL%'; for ($i = 0; $i -lt 60; $i++) { try { $response = Invoke-WebRequest -Uri $url -TimeoutSec 2; if ($response.StatusCode -eq 200) { Start-Process $url; exit 0 } } catch { }; Start-Sleep -Seconds 1 }; Write-Error 'The practice server did not start within 60 seconds.'; exit 1"
if errorlevel 1 (
  echo Could not open the practice page. Check the server window for errors.
  pause
  exit /b 1
)

echo The practice page is open in your default browser.
endlocal
