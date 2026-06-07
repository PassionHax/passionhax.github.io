import os
import re
from bs4 import BeautifulSoup

directory = r'd:\PASSIONHAX\passionhax.github.io\ctp-notion'
output_file = r'd:\PASSIONHAX\Claude Content Creation System\Talking Head Writing Prompts\Version 2.0\Files for project\ARC_Framework_Master.md'

files = [
    'ctp-a1-module.html', 'ctp-a2-module.html', 'ctp-a3-module.html', 'ctp-a4-module.html', 'ctp-a5-module.html', 'ctp-a6-module.html',
    'ctp-r1-module.html', 'ctp-r2-module.html', 'ctp-r3-module.html', 'ctp-r4-module.html', 'ctp-r5-module.html', 'ctp-r6-module.html', 'ctp-r7-module.html', 'ctp-r8-module.html', 'ctp-r9-module.html', 'ctp-r10-module.html',
    'ctp-c1-module.html', 'ctp-c2-module.html', 'ctp-c3-module.html', 'ctp-c4-module.html', 'ctp-c5-module.html'
]

output_text = "# ARC Framework Master Compilation\n\nThis document contains the full compiled text of all Phase A, Phase R, and Phase C modules from the Career Tier Positioning program.\n"

for f in files:
    try:
        path = os.path.join(directory, f)
        if not os.path.exists(path):
            continue
            
        html = open(path, encoding='utf-8').read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove unwanted tags
        for tag in soup(['svg', 'style', 'script']):
            tag.decompose()
            
        # Get body or fallback to entire soup
        body = soup.find('body')
        if body:
            clean = body.get_text('\n', strip=True)
        else:
            clean = soup.get_text('\n', strip=True)
            
        # Reduce multiple newlines
        clean = re.sub(r'\n{3,}', '\n\n', clean)
        
        output_text += f'\n\n## --- Module: {f} ---\n\n' + clean
        
    except Exception as e:
        print(f'Error processing {f}: {e}')

open(output_file, 'w', encoding='utf-8').write(output_text)
print(f'Successfully wrote full content to {output_file}')
