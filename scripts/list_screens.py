import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

# Quotes can be \" or "
screens = re.findall(r'data-screen-label=\\?"([^"\\]+)\\?"', s)
print(f'Total data-screen-label found: {len(screens)}')
for scr in sorted(set(screens)):
    print('  -', scr)

gos = re.findall(r'data-go=\\?"([^"\\]+)\\?"', s)
print(f'\nTotal data-go: {len(gos)}')
for g in sorted(set(gos)):
    print('  *', g)

is_conds = re.findall(r'is\.([A-Za-z0-9_]+)', s)
print(f'\nTotal is.<key>: {len(set(is_conds))}')
for c in sorted(set(is_conds)):
    print('  #', c)

# Search for screen mapping in JS
scr_matches = re.findall(r'(\w+):\s*\{\s*label:\s*\\?["\']([^"\\]+)\\?["\']', s)
print(f'\nTotal screen objects: {len(scr_matches)}')
for k, l in scr_matches:
    print(f'  [{k}] -> {l}')
