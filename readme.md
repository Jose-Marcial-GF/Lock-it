# Lock It - Gestor de Contraseñas

**Lock It** es una aplicación móvil y web que permite a los usuarios generar contraseñas seguras y almacenarlas en la nube.

##  Características Principales

* **Generador de Contraseñas Inteligente:** 
  * Generación de cadenas seguras con longitud personalizable
* **Almacenamiento en la Nube:**
  * Almacenamiento en tiempo real utilizando Firebase Cloud Firestore.
* **Gestión local de favoritos:**
  * se puede fijar las contraseñas favoritas en dispositivos móviles
---

## Arquitectura
```bash
src/
└── app/
    ├── components/             # Componentes que se utilizarán para el desarrollo de las páginas
    │   └── ...
    ├── home/                   # Pantalla de inicio pública con el generador de contraseñas
    ├── models/                 # Tipado estricto y abstracción de datos
    │   └── ...
    ├── pages/                  # Páginas de la aplicación
    │   └── ...
    ├── services/               # Lógica de servicios externos
    │   └── ...
    ├── app.component.html      # Componente (enrutador) principal de la aplicación 
    ├── app.module.ts           # Raíz de la aplicación
    └── app-routing.module.ts   # Declaración de todas las rutas de navegación
```
---



## 🛠️ Stack Tecnológico

* **Frontend:** [Ionic Framework](https://ionicframework.com/) + [Angular](https://angular.io/) (v14+)
* **Base de Datos Cloud:** Firebase Cloud Firestore
* **Autenticación:** Firebase Authentication
* **Estilos:** SCSS (Sass) global y modular por componente.
