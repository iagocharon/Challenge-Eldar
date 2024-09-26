
# Aplicación Web - Angular y PrimeNG
Esta aplicación web fue desarrollada utilizando **Angular** y la librería de componentes **PrimeNG**. El sistema implementa una autenticación simple con manejo de **roles** y **login**.
Se incluye una **guarda** que protege rutas para usuarios no logueados y se simula un sistema de **autenticación con JWT** mediante un interceptor.

### Características
- La aplicación obtiene todos los datos desde una **API** sugerida por la empresa, utilizada a modo de prueba.
- Se ha añadido **paginación**, **filtrado** y **búsqueda** en todas las tablas de datos.
- El sistema cuenta con **notificaciones** para todas las operaciones realizadas.

### Entidades del Sistema
El sistema está compuesto por varias entidades que se relacionan entre sí:
- Usuarios
- Posteos
- Comentarios
- Álbumes
- Fotos
- To-Do's

Se ha implementado un **CRUD** completo para estas entidades, respetando las relaciones entre ellas.

### Secciones del Proyecto
El proyecto cuenta con 4 secciones principales:
1. **Usuarios**: Permite ver una lista de usuarios y acceder a los detalles de cada uno, incluyendo su información personal y el contenido subido en cada sección.
2. **Posteos**: Se muestra una lista con los títulos de los posteos, y al acceder al detalle de cada uno, es posible visualizar su contenido y los comentarios asociados. Los usuarios tienen permitido dejar comentarios en los posteos.
3. **Álbumes**: Permite ver una lista de álbumes y, al acceder a cada uno, se puede visualizar una galería de fotos.
4. **To-Do's**: Muestra una lista de tareas pendientes con su respectivo estado.

  

### Sistema de Roles

- Si el usuario está logueado como administrador, se habilitan opciones para agregar, quitar y editar la información en todas las secciones mencionadas.
 - Si el usuario esta logueado como usuario, solo permite la lectura de los datos, a excepcion de los comentarios en los posteos, para asimilar un poco lo que seria el sistema a uno real.

# Instalación

Para instalar y ejecutar esta aplicación web localmente, sigue los siguientes pasos:

1. ### Clonar el repositorio:
```bash
https://github.com/iagocharon/Challenge-Eldar.git
cd challenge-eldar
```

2. ### Instalar Dependencias:
Asegúrate de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando en la carpeta del proyecto para instalar todas las dependencias:
```bash
npm install
```

# Ejecución
Asegúrate de tener Node.js y npm instalados. Luego, ejecuta el siguiente comando en la carpeta del proyecto para instalar todas las dependencias:
```bash
ng serve
```
Luego, abre un navegador y navega a http://localhost:4200/. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.



