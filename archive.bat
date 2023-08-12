@echo off

:: Mapping args
set packname=%1
set folder=%2
set extension=%3

:: Joined args
set archiveName=%packname%_%folder%

set targetZip=%archiveName%.zip
set targetFile=%archiveName%.%extension%

:: Create zip of given folder
IF exist "%targetZip%" del "%targetZip%"
powershell Compress-Archive "./%folder%" "%targetZip%"

:: Rename to desired extension
IF exist "%targetFile%" del "%targetFile%"
ren "%targetZip%" %targetFile%

echo Built %targetFile%!

EXIT %ERRORLEVEL%