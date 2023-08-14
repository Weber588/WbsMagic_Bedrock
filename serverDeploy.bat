@echo off

:: Constants

:: Deployment target for copying BP and RP raw outputs. Excludes /src/ folders.
:: Can be set to the absolute root of a bedrock server to prepare for a restart (still requires uuids to be added to world)
set target=C:\Users\idont\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\!Servers\Test1\
set serverStart=%target%bedrock_server.exe
set BPtarget=%target%behavior_packs
set RPtarget=%target%resource_packs

set packname=WbsMagic

:: Main

echo Building %packname%...

IF "%~1" neq "-S" (
    echo Compiling TypeScript...
    CALL tsc
    @echo off

    IF %ERRORLEVEL% neq 0 (
        echo TypeScript build failed. Aborting.
        EXIT /B %ERRORLEVEL%
    )
) ELSE (
    echo Skipping TypeScript build.
)

echo Waiting for archiving and deployments...

:: Spawn new processes to do this in parallel
(
    START "Deploying Behaviour Pack..." deploy.bat %packname%, BP, %BPtarget%
    START "Deploying Resource Pack..." deploy.bat %packname%, RP, %RPtarget%
) | PAUSE > NUL

START %serverStart%

echo Build complete!
EXIT /B %ERRORLEVEL%