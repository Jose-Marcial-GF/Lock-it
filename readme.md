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
└── 📂 app/
    ├── 📂 components/
    │   ├── 📂 copy-textarea/    # Caja de texto con botón de copiar al portapapeles
    │   ├── 📂 custom-input/     # Inputs personalizados para que aparezcan los errores de validacion
    │   ├── 📂 header/           # Barra de navegación dinámica
    │   ├── 📂 lock-passwd/      # Pin utilizado para Fijar/Desfijar
    │   ├── 📂 password-card/    # Tarjeta principal del generador de contraseñas
    │   ├── 📂 password-list/    # Contenedor que solicita, ordena y pinta las password-preview
    │   ├── 📂 password-preview/ # Tarjeta individual de cada contraseña guardada donde se indica el nombre e imagen
    │   └── 📄 components.module.ts # Módulo nos permite exportar varios componentes
    │
    ├── 📂 home/                 # Pantalla de inicio pública con el generador de contraseñas
    │
    ├── 📂 models/               # Tipado estricto y abstracción de datos
    │   └── 📄 password.model.ts # Interfaz que define la estructura exacta de una contraseña
    │   └── 📄 user.model.ts     # Interfaz que define la estructura exacta de un usuarios
    │
    ├── 📂 pages/                # Pantallas de la aplicación
    │   ├── 📂 list/             # Contiene el 'password-list' del usuario
    │   ├── 📂 login/            # Pantalla de inicio de sesión
    │   ├── 📂 password-detail/  # Vista detallada de una contraseña permite editar, regenerar o borrar una contraseña
    │   └── 📂 register/         # Pantalla de registro de nuevos usuarios
    │
    ├── 📂 services/             # Lógica de servicios externos
    │   ├── 📄 auth.service.ts   # Gestiona los tokens y el estado de Firebase Authentication
    │   ├── 📄 password.service.ts # Gestiona las operaciones de contraseñas en Firebase Firestore
    │   ├── 📄 user.service.ts   # Gestiona las operaciones de usuarios con Firestore
    │
    ├── 📄 app.component.html    # Enrutador principal 
    ├── 📄 app.module.ts         # Raíz de la app
    └── 📄 app-routing.module.ts # Declaración de todas las rutas de navegación de la SPA
```
---

| Service | Model | Descripción |
|---------|-------|-------------|
|         |       |             |
|         |       |             |
|         |       |             |
|         |       |             |

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Ionic Framework](https://ionicframework.com/) + [Angular](https://angular.io/) (v14+)
* **Base de Datos Cloud:** Firebase Cloud Firestore
* **Autenticación:** Firebase Authentication
* **Estilos:** SCSS (Sass) global y modular por componente.
