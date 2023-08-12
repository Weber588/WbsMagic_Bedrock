@echo off

:: Mapping args
set packname=%1
set folder=%2
set target=%3

:: Joined args
set targetFolder=%target%\%packname%

IF exist "%targetFolder%" del /Q "%targetFolder%"

:: Copy folder to target
:: /E = include subfolders
:: /mt = Multthreaded for speed
:: /xd src = Exclude src folder
robocopy "./%folder%" "%targetFolder%" /E /mt /xd src

EXIT %ERRORLEVEL%