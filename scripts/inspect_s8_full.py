import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

p = s.find('data-screen-label=\\"S8 Creer un compte\\"')
print(s[p+1000:p+4500])
