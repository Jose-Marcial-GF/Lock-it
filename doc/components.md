# Componentes


| NOMBRE | PÁGINA DONDE APARECE | DESCRIPCIÓN |
|---|---|---|
| `HeaderComponent` | Todas las páginas | Barra de navegación superior. Muestra el logo y, si el usuario está autenticado, un botón de cierre de sesión. Se suscribe al estado de autenticación para mostrar u ocultar opciones según la sesión activa. |
| `PasswordCardComponent` | Home | Tarjeta principal de generación de contraseñas. Permite al usuario introducir un nombre, ajustar la longitud, generar una contraseña aleatoria y guardarla en Firestore. Si el usuario no está autenticado, redirige al login al intentar guardar. |
| `PasswordListComponent` | List | Lista todas las contraseñas guardadas del usuario autenticado. En dispositivos móviles muestra el estado de pinning de cada contraseña y las ordena con las fijadas primero. Gestiona el toggle de pin y se refresca al volver a la ruta `/list`. |
| `PasswordPreviewComponent` | List (dentro de `PasswordListComponent`) | Tarjeta de vista previa de una contraseña individual. Muestra el nombre, permite copiar el valor al portapapeles y, en móvil, muestra el icono de pin para fijar/desfijar la contraseña. Navega a la página de detalle al hacer clic. |
| `GeneratorControlsComponent` | Home (dentro de `PasswordCardComponent`), Password Detail | Control deslizante y botones para ajustar la longitud de la contraseña, volver a generarla y guardarla. Emite eventos al componente padre para que ejecute las acciones correspondientes. |
| `CopyTextareaComponent` | Password Detail | Área de texto de solo lectura que muestra el valor de la contraseña. Incluye un botón para copiar el contenido al portapapeles con feedback visual temporal de confirmación. |
| `CustomInputComponent` | Login, Register, Password Detail | Campo de formulario reutilizable que encapsula un `ion-input` y acepta un `AbstractControl` externo, tipo (`text`, `email`, `password`) y placeholder como entradas, facilitando la validación reactiva. |
| `ImageUploadComponent` | Password Detail | Selector de imagen que permite subir un icono personalizado para la contraseña. Delega la subida al `CloudinaryService` y emite la URL resultante al componente padre mediante two-way binding. |
| `LockPasswdComponent` | Password Detail, List (dentro de `PasswordPreviewComponent`) | Icono interactivo de candado que representa el estado de pin de una contraseña. Solo se muestra en plataformas nativas (móvil). Emite un evento `togglePin` al ser pulsado y cambia de color según el estado. |
