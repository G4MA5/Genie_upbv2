import re

with open(r'C:\Users\ELIAKIM\Desktop\GENIE UPB - Prototype (3).html', 'r', encoding='utf-8') as f:
    s = f.read()

# Let's inspect everything around S2 Concours
p = s.find('data-screen-label=\\"S2 Concours et categories\\"')
print(s[p:p+4500])
