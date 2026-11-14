import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

matches = [m.start() for m in re.finditer(r'catsFull', s)]
print('Matches for catsFull:', len(matches))
for p in matches:
    print('--- AT', p, '---')
    print(s[max(0, p-100):min(len(s), p+1200)])
