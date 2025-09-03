Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\aplication\node js\manual_po"
WshShell.Run "node index.js", 0, False
