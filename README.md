# Desafío React / MongoDB

## 📌 Introducción

Este proyecto es una aplicación web desarrollada con React (Frontend), Node.js con Express (Backend) y MongoDB (Base de datos). Permite la gestión de productos y la asignación de precios especiales a usuarios específicos, integrando una API RESTful que interactúa con una base de datos en la nube de MongoDB.

## 🚀 Pasos para ejecutar localmente

### **1️⃣ Clonar el repositorio**

```
git clone https://github.com/AMV1909/Drenvio-Backend
```

### **2️⃣ Instalar las dependencias**

```
cd Drenvio-Backend
pnpm install
```

### **3️⃣ Agregar las variables de entorno**

Crea un archivo `.env` en la raiz del proyecto y agrega las siguientes variables de entorno:

```
MONGODB_URI = "mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/"
SECRET_KEY = "secret"
```

### **4️⃣ Iniciar el servidor**

```
pnpm dev
```

## 📚 Librerías utilizadas

-   Express
-   MongoDB
-   Mongoose
-   Zod
-   Bcrypt
-   Jsonwebtoken
