Add-Type -AssemblyName System.Drawing
$imgPath = 'e:\chuzzaa\public\assets\icon.png'
$outPath = 'e:\chuzzaa\public\assets\icon-square.png'

$img = [System.Drawing.Image]::FromFile($imgPath)
$size = [math]::Max($img.Width, $img.Height)

$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::Transparent)

$x = [int][math]::Round(($size - $img.Width) / 2.0)
$y = [int][math]::Round(($size - $img.Height) / 2.0)

$g.DrawImage($img, $x, $y, $img.Width, $img.Height)

$g.Dispose()
$img.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
