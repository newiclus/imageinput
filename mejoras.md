#PROPUESTAS PARA IMAGEINPUT 
---------------------------

###Cliente

+ Invocar al metodo y no ejecutar automaticamente.
+ Modos de vista de los bloques (vista previa y tamaño real).
+ Implementación de un loader.
+ Validación de tamaños de imagen menor al estipulado en los atributos


###Server

+ Configuración intacta para el upload de la foto original (para futuros procesos y generación de thumbnails).
+ No procesar la imagen inmediatamente, sino copiarla en una carpeta temporal y luego de enviar el formulario recien se hacen los procesos de imagen.
+ Manejar versiones de imagenes para evitar el cache de estas.