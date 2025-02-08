### English README

# Node API Setup Guide

Follow the steps below to set up and run the Node API:

### Prerequisites

You will need **MongoDB** installed and running on your machine.

### Steps

1. **Download the Files**
   - Download or clone the repository to your local machine.

2. **Install Dependencies**
   - Run the following command in the project directory to install the dependencies listed in `package.json`:
     ```
     npm i
     ```

3. **Create the Database**
   - Set up your MongoDB database (e.g., `parcial1`).

4. **Create the `.env` File**
   - In the project root, create a `.env` file and add the following values:
     ```
     MONGODB_URI=mongodb://127.0.0.1:27017/parcial1
     JWT_SECRET=[your-secret-key]
     ```
   - Replace `[your-secret-key]` with your desired JWT secret.

5. **Start the Server**
   - To start the server, run:
     ```
     npm start
     ```

Your Node API should now be running and ready to use!

---

### Español README

# Guía de configuración de la API de Node

Siga los siguientes pasos para configurar y ejecutar la API de Node:

### Requisitos previos

Necesitará tener **MongoDB** instalado y en funcionamiento en su máquina.

### Pasos

1. **Descargar los Archivos**
   - Descargue o clone el repositorio en su máquina local.

2. **Instalar Dependencias**
   - Ejecute el siguiente comando en el directorio del proyecto para instalar las dependencias listadas en `package.json`:
     ```
     npm i
     ```

3. **Crear la Base de Datos**
   - Configure su base de datos MongoDB (por ejemplo, `parcial1`).

4. **Crear el Archivo `.env`**
   - En el directorio raíz del proyecto, cree un archivo `.env` y agregue los siguientes valores:
     ```
     MONGODB_URI=mongodb://127.0.0.1:27017/parcial1
     JWT_SECRET=[clave-secreta]
     ```
   - Reemplace `[clave-secreta]` con su clave secreta JWT deseada.

5. **Iniciar el Servidor**
   - Para iniciar el servidor, ejecute:
     ```
     npm start
     ```

¡Ahora su API de Node debería estar en funcionamiento y lista para usar!
