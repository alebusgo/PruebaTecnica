open_file=open('prueba1.txt','r')
file_lines=open_file.read().splitlines()
new_file = open('respuesta_prueba1.txt', 'w+')

for linea in file_lines:
    array = [int(i) for i in list(linea)]
    suma = sum(array)
    new_file.write("SI\n" if suma % 3 == 0 else "NO\n")
