# Social preview image

`public/assets/og-image.jpg` (1200×630) is the `og:image` for every page, the picture LinkedIn,
Slack and X show for a shared link. To regenerate it after changing `og-image.html`:

```bash
# from this directory, with the site's dependencies installed (npm ci)
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1200,height:630}});await p.goto('file://'+process.cwd()+'/og-image.html');
await p.waitForTimeout(800);await p.screenshot({path:'og.png'});await b.close()})()"
ffmpeg -i og.png -q:v 3 ../../public/assets/og-image.jpg && rm og.png
```
