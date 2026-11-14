import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

# Let's find S2 section in HTML
matches = [m.start() for m in re.finditer(r'data-screen-label=\\?"S2 Concours et categories\\?"', s)]
print('Matches for S2:', len(matches))
for p in matches:
    print('--- MATCH AT', p, '---')
    print(s[p:p+3000])
