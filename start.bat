@echo off
chcp 65001 > nul
title 카드 뒤집기 게임

echo.
echo  ==========================================
echo   🃏 카드 뒤집기 게임 시작
echo  ==========================================
echo.

:: ── 1. Node.js 설치 확인 ──
node --version > nul 2>&1
if errorlevel 1 (
    echo [오류] Node.js 가 설치되어 있지 않습니다.
    echo        https://nodejs.org 에서 LTS 버전을 설치 후 다시 실행해주세요.
    pause
    exit /b 1
)

:: ── 2. .env.local 확인 ──
if not exist ".env.local" (
    echo [오류] .env.local 파일이 없습니다.
    echo        아래 내용으로 .env.local 파일을 만들어 주세요:
    echo.
    echo        NEXT_PUBLIC_SUPABASE_URL=^<Supabase URL^>
    echo        NEXT_PUBLIC_SUPABASE_ANON_KEY=^<Supabase Anon Key^>
    echo.
    pause
    exit /b 1
)

:: ── 3. 패키지 설치 (처음 실행 시) ──
if not exist "node_modules" (
    echo [1/2] 패키지를 설치하는 중... (최초 1회만 실행됩니다)
    call npm install
    if errorlevel 1 (
        echo [오류] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
)

:: ── 4. 서버 시작 & 브라우저 오픈 ──
echo [2/2] 서버를 시작합니다...
echo.
echo  접속 주소: http://localhost:3000
echo  종료하려면 이 창을 닫거나 Ctrl+C 를 누르세요.
echo.

:: 3초 후 브라우저 자동 오픈
start "" cmd /c "timeout /t 3 /nobreak > nul && start http://localhost:3000"

call npm run dev
