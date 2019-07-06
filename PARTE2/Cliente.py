from socketIO_client import SocketIO, LoggingNamespace
from Tkinter import *
import requests

url = 'http://35.232.54.166:8080/'
def on_bbb_response(graphvalues,totalTweets,totalUsuarios,totalCategorias,totalImagenes,TopUsuario,TopCategoria):
    print('on_bbb_response')

cadena = "usr=dani&nombre=Daniel Alonzo&texto=feliz en el #bernabeu"

def on_connect(self):
	print "haha"
def on_myownmessage(self,*args):
	print "haha2"

raiz = Tk()
raiz.title("Simulador de Trafico")
miFrame=Frame(raiz,width="650", height="450")
miFrame.pack()
miFrame.config(bg="black")


textoURL = StringVar()
textoConcurrencia = StringVar()
textoSolicitudes = StringVar()
textoTimeOut = StringVar()
textoParametros = StringVar()


miLabel1 = Label(miFrame, text="URL:", fg="red", bg="black").place(x=10, y=10)
fieldURL = Entry(miFrame, textvariable=textoURL, text="URL:", fg="black").place(x=120, y=10)

textoURL.set("35.232.54.166")
textoParametros.set("Data.txt")
textoSolicitudes.set("10")

def enviarInformacion():
    #leer data
    archivo = open(textoParametros.get(),'r')

    #Split \n
    ArrayData = archivo.read().split("\n")

    if int(textoSolicitudes.get()) < len(ArrayData):
        i=0
        while(i<int(textoSolicitudes.get())):
            #enviar data
            correct_payload = {'datos': ArrayData[i]}
            r = requests.post(url, data=correct_payload)
            i = i + 1
    else:
        print("No hay tantas solicitudes en el Archivo : " + textoParametros.get())
    

miLabel2 = Label(miFrame, text="Concurrencia:", fg="red", bg="black").place(x=10, y=50)
fieldConcurrencia = Entry(miFrame, textvariable=textoConcurrencia, fg="black").place(x=120, y=50)

miLabel3 = Label(miFrame, text="Solicitudes:", fg="red", bg="black").place(x=10, y=90)
fieldSolicitudes = Entry(miFrame, textvariable=textoSolicitudes, fg="black").place(x=120, y=90)

miLabel4 = Label(miFrame, text="Parametros:", fg="red", bg="black").place(x=10, y=130)
fieldParametros = Entry(miFrame, textvariable=textoParametros, fg="black").place(x=120, y=130)

def codigoBoton():
    textoURL.set("35.232.54.166")

def holamundo():
    print(textoURL.get())

botonEnvio=Button(raiz, text="Buscar", command=enviarInformacion).place(x=300, y=130)

miLabel5 = Label(miFrame, text="TimeOut:", fg="red", bg="black").place(x=10, y=170)
fieldTimeOut = Entry(miFrame, textvariable=textoTimeOut, fg="black").place(x=120, y=170)

miLabel6 = Label(miFrame, text="Completado:", fg="red", bg="black").place(x=10, y=210)
fieldCompletado = Entry(miFrame, fg="black").place(x=120, y=210)

miLabel7 = Label(miFrame, text="Resumen:", fg="red", bg="black").place(x=10, y=250)
fieldResumen = Text(miFrame, fg="black", width=30, height=10).place(x=120, y=250)



raiz.mainloop()
