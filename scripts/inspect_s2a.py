import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

p = s.find('data-screen-label=\\"S2a Fiche categorie\\"')
print(s[p:p+3500])
