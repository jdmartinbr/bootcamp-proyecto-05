# Actividad_4
### 4º Actividad semanal Utilizando el motor de plantillas HandleBars y conexión a Base de Datos.

Ahora ya empezamos a tener controladas las rutas y a montar nuestro servidor de Node.js, vemos que sería recomendable extraer todo el html maquetado a un motor de plantillas que facilite el mantenimiento de la aplicación Web, así como empezar a vincular nuestra web a una base de datos.

Nuestra nueva página de error 404
![alt_text](https://github.com/GeeksHubsAcademy/Actividad_4/blob/master/error404.jpg)

---

### Condiciones.
* Se deberá utilizar el motor de plantillas HandleBars que dispondrá de las siguientes partes:
  * Template que dispondrá del header y del botton
  * Las vistas de:
    * Home
    * Login
    * Register
    * Error404
  * Así como los partials suficientes y necesarias para montar las diferentes vistas.
* La página de registro será funcional, es decir debe almacenar la información del usuario que se registra.
* La página de login debe poder comprobar que el login es suficiente.

---

### Características.

* Se utilizará NPM para la instalación de dependencias.
* El proyecto debe estar subido en un contendor en vagrant, y debe cumplir las siguientes condiciones:
  * Debe disponer de un vagrantfile y un archivo .sh donde se encuentren todos los scripts necesarios para construir el contenedor y nuestra aplicacion se autoejecute.
  * El contendor debe tener abierto el puerto 80 y apuntara internamente al puerto 3000 donde tenemos apuntado nuestro servidor de node.js
  * El contendor debe disponer un mysql instalado con la tabla descrita anteriormente.
* Dentro del package.json debemos disponer la tarea production debe llamar al módulo forever y arrancar la maquina.
