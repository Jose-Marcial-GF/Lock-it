# Servicios

Tabla de todos los servicios de la aplicación Lock-it.

| NOMBRE | QUÉ MODELO UTILIZA | FUNCIÓN DENTRO DE LA APLICACIÓN |
|---|---|---|
| `AuthService` | Firebase Authentication (`@angular/fire/auth`) + Capacitor Google Auth (`@codetrix-studio/capacitor-google-auth`) | Gestiona toda la autenticación de usuarios: registro con email y contraseña, login con email/contraseña, login con Google (popup en web, credencial nativa en móvil), cierre de sesión y exposición del estado de sesión como observable reactivo. |
| `PasswordService` | Firebase Firestore (`@angular/fire/firestore`) | CRUD completo sobre la colección `passwords` de Firestore. Permite añadir, leer por ID, actualizar, eliminar y listar todas las contraseñas de un usuario concreto como observable en tiempo real. |
| `PasswordGeneratorService` | Sin dependencia externa (lógica local) | Genera contraseñas aleatorias de la longitud indicada usando un charset que incluye letras mayúsculas, minúsculas, dígitos y símbolos especiales. |
| `CloudinaryService` | API REST de Cloudinary (`https://api.cloudinary.com`) | Sube imágenes al servicio de almacenamiento en la nube Cloudinary mediante un upload preset configurado por entorno y devuelve la URL pública segura (`secure_url`) de la imagen subida. |
| `PinService` | SQLite local nativo (`@capacitor-community/sqlite`) | Persiste localmente en el dispositivo móvil qué contraseñas tiene fijadas (pinnadas) cada usuario. Expone métodos para consultar los IDs fijados, comprobar si una contraseña está fijada y alternar su estado. Solo opera en plataformas nativas; en web devuelve valores vacíos/false. |
| `UserService` | Firebase Firestore (`@angular/fire/firestore`) | Guarda o sobreescribe el documento de perfil de un usuario en la colección `users` de Firestore. Se utiliza al registrar un nuevo usuario para persistir sus datos básicos (uid, nombre, etc.). |
