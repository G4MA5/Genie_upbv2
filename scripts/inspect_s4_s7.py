import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

for label in ['S4 Documents', 'S5 FAQ et contacts', 'S6 Actualites et galerie', 'S7 Partenaires']:
    p = s.find(f'data-screen-label=\\"{label}\\"')
    print(f'=== {label} at {p} ===')
    if p != -1:
        print(s[p:p+1200])
