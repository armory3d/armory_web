# Troubleshooting

## Player does not start or screen remains black/white

### Clean project
Locate 'Armory Build' section in 'Render' panel and hit 'Clean' button. Try running your project again.

### Enable developer tools
Locate 'Armory Play' section in 'Render' panel and select 'Developer Tools'. Try running your project again and observe console for pottential error reports.

### Debug project in Kode Studio
Locate 'Armory Build' section in 'Render' panel and hit 'Kode Studio' button. This will load the project in a dedicated IDE for Kha. Hit F5 to run and observe console output for potential error reports.

### Lower graphics settings
By default, Armory uses a deferred render path. If you are running on older hardware, using a less demading forward path can help. Select active scene camera, locate 'Armory Props' in data panel, and choose 'forward_path' or 'forward_path_low' as render path.

### Run project in browser
//Locate 'Armory Play' section in 'Render' panel and select 'Browser' as runtime. Make sure your PC is capable of running WebGL content.

## Trouble persist
Post a new forum topic, report an issue, or contact us directly!
