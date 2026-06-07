import os
import re

directory = r'd:\PASSIONHAX\passionhax.github.io\ctp-notion'
files = [
    'ctp-a1-module.html', 'ctp-a2-module.html', 'ctp-a3-module.html', 'ctp-a4-module.html', 'ctp-a5-module.html', 'ctp-a6-module.html',
    'ctp-r1-module.html', 'ctp-r2-module.html', 'ctp-r3-module.html', 'ctp-r4-module.html', 'ctp-r5-module.html', 'ctp-r6-module.html', 'ctp-r7-module.html', 'ctp-r8-module.html', 'ctp-r9-module.html', 'ctp-r10-module.html',
    'ctp-c1-module.html', 'ctp-c2-module.html', 'ctp-c3-module.html', 'ctp-c4-module.html', 'ctp-c5-module.html'
]

try:
    from bs4 import BeautifulSoup
    use_bs4 = True
except ImportError:
    use_bs4 = False

output_text = ''

for f in files:
    try:
        path = os.path.join(directory, f)
        if not os.path.exists(path):
            continue
            
        html = open(path, encoding='utf-8').read()
        
        if use_bs4:
            soup = BeautifulSoup(html, 'html.parser')
            # Extract content from wrap
            wrap = soup.find('div', class_='wrap')
            if wrap:
                # Remove svg and style tags
                for tag in wrap(['svg', 'style', 'script']):
                    tag.decompose()
                clean = wrap.get_text('\n', strip=True)
            else:
                clean = soup.get_text('\n', strip=True)
        else:
            # Fallback to regex
            # Remove scripts and styles
            html = re.sub(r'<script.*?</script>', '', html, flags=re.DOTALL)
            html = re.sub(r'<style.*?</style>', '', html, flags=re.DOTALL)
            html = re.sub(r'<svg.*?</svg>', '', html, flags=re.DOTALL)
            # Remove html tags
            clean = re.sub(r'<[^>]+>', '\n', html)
        
        # Reduce multiple newlines
        clean = re.sub(r'\n{3,}', '\n\n', clean)
        
        output_text += f'\n\n=== {f} ===\n\n' + clean
    except Exception as e:
        print(f'Error processing {f}: {e}')

open('ARC_Master.txt', 'w', encoding='utf-8').write(output_text)
print('Done!')
