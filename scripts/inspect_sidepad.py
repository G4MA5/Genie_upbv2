import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

matches = [m.start() for m in re.finditer(r'sidePad\s*:', s)]
for p in matches:
    print('--- AT', p, '---')
    print(s[p:p+200])
