# Servicios

A continuación se listan todos los servicios de la aplicación Lock-it. Estos permiten el acceso a los datos de forma desacoplada.

| NOMBRE | MODELO/DEPENDENCIAS | DESCRIPCIÓN |
|---|---|---|
| [`AuthService`](../src/app/services/auth.service.ts) | Firebase Authentication (`@angular/fire/auth`) + Capacitor Google Auth (`@codetrix-studio/capacitor-google-auth`) | Gestiona la autenticación de usuarios: registro y login, con email y contraseña y con Google. |
| [`PasswordService`](../src/app/services/password.service.ts) | Firebase Firestore (`@angular/fire/firestore`) y [`PasswordItem`](../src/app/models/password.model.ts) | CRUD sobre la colección `passwords` de Firestore. Permite añadir, leer por ID, actualizar, eliminar y listar todas las contraseñas de un usuario concreto. |
| [`PasswordGeneratorService`](../src/app/services/password-generator.service.ts) | Sin dependencias | Genera contraseñas aleatorias de la longitud indicada, usando un _charset_. |
| [`CloudinaryService`](../src/app/services/cloudinary.service.ts) | API REST de _Cloudinary_ (`https://api.cloudinary.com`) | Sube imágenes a _Cloudinary_ y devuelve su URL de acceso (`secure_url`) para ser almacenada en Firebase. |
| [`UserService`](../src/app/services/user.service.ts) | Firebase Firestore (`@angular/fire/firestore`) y [`UserItem`](../src/app/models/user.model.ts) | Guarda o sobreescribe el documento de perfil de un usuario en la colección `users` de Firestore. Se utiliza al registrar un nuevo usuario para persistir sus datos básicos (uid, nombre, etc.). |
| [`PinService`](../src/app/services/pin.service.ts) | SQLite (`@capacitor-community/sqlite`) | **En dispositivos móviles.** Guarda localmente en la base de datos SQLite las contraseñas destacadas (_favoritas_) del usuario. |
