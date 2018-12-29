@echo off
electron-packager . Hidrogen --overwrite --prune=true --out=../dist --icon=../static/images/hidrogen-icon.ico --version-string.CompanyName="Hidrogen" --version-string.FileDescription "Your gaming library" --version-string.ProductName="Hidrogen"
copy "../lang/*.*" "../dist/Hidrogen-win32-x64/"
