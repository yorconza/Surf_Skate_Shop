# E-Commerce Surf & Skate Shop

**Universidad Técnica Nacional (UTN) — Sede del Pacífico**  
**Carrera:** Ingeniería en Tecnologías de Información  
**Curso:** ITI-621 — Tecnologías y Sistemas Web III  
**Profesor:** Jorge Ruiz  
**Fecha de entrega:** 09 de diciembre de 2026  

**Integrantes:**
* Jeremy Delgado Barboza
* Francisco Quirós Alvarado
* Yordi Contreras Zamora

---

## 1. Descripción del problema
El proyecto consiste en desarrollar una aplicación web de comercio electrónico enfocada en una tienda de **Surf & Skate Shop** (tablas, indumentaria, calzado y marcas/categorías), integrando los servicios de **Google Firebase** para autenticación, base de datos no relacional, almacenamiento de archivos, hosting y notificaciones[cite: 1, 5]. La solución permite gestionar el catálogo y los usuarios, realizar compras con descuento de inventario y generar consultas y reportes exportables a PDF[cite: 1, 2, 6].

---

## 2. Objetivos
1. Implementar una aplicación web para la tienda Surf & Skate utilizando Google Firebase (Authentication, Firestore, Storage, Hosting y Notifications)[cite: 1, 5].
2. Desarrollar la gestión de usuarios y perfiles, los cuatro mantenimientos base (CRUDs) y el proceso principal de compra con actualización de inventario[cite: 1, 2, 5].
3. Construir las consultas y reportes en pantalla con exportación a PDF y documentar el sistema con diagramas de secuencia UML en Mermaid y conclusiones técnicas[cite: 2, 5, 6].

---

## 3. Tecnologías utilizadas
* **Frontend:** HTML5, CSS3 (Bootstrap 5 y hojas de estilo propias) y JavaScript (ES Modules con Vite)[cite: 1, 5].
* **Entorno de desarrollo:** Node.js[cite: 1].
* **Plataforma en la nube:** Google Firebase (Authentication, Firestore DB, Storage, Hosting y Cloud Messaging / FCM)[cite: 1, 5].
* **Control de versiones:** Git y GitHub (siguiendo las indicaciones del entorno de trabajo del curso)[cite: 4].

---

## 4. Módulos del sistema
* **Usuarios y perfiles:** Creación de cuenta (correo/contraseña y método adicional como Google), inicio de sesión, edición de perfil con fotografía y validación de sesión según rol (Cliente o Administrador)[cite: 1, 5].
* **Mantenimientos base (4 CRUDs):**
  1. Tablas (Surf & Skate)[cite: 2, 5].
  2. Ropa y Calzado[cite: 2, 5].
  3. Marcas / Categorías[cite: 2, 5].
  4. Gestión de Clientes[cite: 2, 5].
* **Proceso principal:** Carrito de compras, registro de orden, descuento de stock, visualización del recibo digital y notificación[cite: 2, 5, 6].
* **Consultas y reportes (.PDF):** Dos consultas/reportes sobre datos base (por ejemplo, catálogo filtrado y stock bajo) y un reporte sobre órdenes/ventas, todos visibles en pantalla y exportables a `.pdf`[cite: 2, 6].
* **Acerca de:** Información del equipo de trabajo, tecnologías aplicadas y detalles del producto final[cite: 2, 5].

---

## 5. Diagramas de secuencia UML (Mermaid)

### Proceso principal (Carrito, orden y descuento de stock)
```mermaid
sequenceDiagram
  autonumber
  actor Cliente
  participant Frontend
  participant Auth as Firebase Auth
  participant DB as Firestore DB
  participant Storage as Firebase Storage

  Cliente->>Frontend: Agrega productos al Carrito y procede al Checkout
  Frontend->>Auth: Verifica token y sesión del usuario activo
  Auth-->>Frontend: Sesión Válida / Usuario Confirmado
  Frontend->>DB: Registra la orden de compra en la colección "orders"
  Frontend->>DB: Ejecuta transacción para descontar Stock en "products"
  DB-->>Frontend: Transacción Exitosa / Orden Creada
  Frontend->>Storage: (Opcional) Guarda comprobante digital
  Frontend-->>Cliente: Muestra recibo digital y dispara Notificación de Confirmación
```[cite: 2, 6]

### Mantenimiento base (Ejemplo: CRUD de Tablas)
```mermaid
sequenceDiagram
  autonumber
  actor Admin
  participant UI as Vista CRUD Tablas
  participant Service as boardsService
  participant DB as Firestore DB

  Admin->>UI: Llena formulario de tabla y guarda
  UI->>Service: saveBoard(datos)
  Service->>DB: Guarda o actualiza el registro
  DB-->>Service: Confirmación de guardado
  Service-->>UI: Actualiza tabla en pantalla
  UI-->>Admin: Muestra mensaje de confirmación
```[cite: 2, 6]

---
---

