
Frontend 
<img width="1354" height="721" alt="image" src="https://github.com/user-attachments/assets/107372f7-9ef8-47b6-a8b3-0fde952f118f" />
backend 
<img width="1330" height="767" alt="image" src="https://github.com/user-attachments/assets/18659997-b8d0-4dc7-bbd0-9cce7840f9f9" />

Azure 
<img width="1363" height="713" alt="image" src="https://github.com/user-attachments/assets/1ec3ec9b-17ac-4fe4-be7d-5ba8bf7dd9a6" />
Azure Blob Storage
<img width="1342" height="663" alt="image" src="https://github.com/user-attachments/assets/c40bfbad-769e-4762-98de-29dc47cec653" />
<img width="1353" height="606" alt="image" src="https://github.com/user-attachments/assets/30a70a68-562d-4a95-bc2c-e143d0c53365" />

<img width="1363" height="581" alt="image" src="https://github.com/user-attachments/assets/0960e9d9-b3e3-4806-b999-7c4facc84206" />




# 🛒 Retail Management System

A modern **full-stack Retail Management System** built with **React, ASP.NET Core, and Microsoft Azure**. The application demonstrates how a retail platform can use cloud-based storage services to manage products, customers, authentication, inventory, orders, and application data.

The project was developed as an **Azure Storage Solution**, with a focus on integrating multiple Azure services into a real-world business application.

---

## 🚀 Project Overview

The **Retail Management System** provides a foundation for managing a retail business through a modern web application.

The system allows users to interact with products while providing backend functionality for managing customers, authentication, inventory, orders, and cloud-based application data.

The project combines a **React frontend** with an **ASP.NET Core backend** and uses **Microsoft Azure Storage** for cloud data management.

---

## ✨ Features

### 🛍️ Product Management

* Display products dynamically from Azure Storage
* Product names and descriptions
* Product categories
* Product pricing
* Stock quantity tracking
* Product image storage using Azure Blob Storage
* Product availability information

### 👤 Customer Management

* Customer account management
* Customer registration
* Customer authentication
* Login functionality
* Customer data stored in Azure Table Storage

### 📦 Inventory Management

* Track product stock quantities
* Monitor product availability
* Queue-based inventory processing
* Designed to support scalable inventory operations

### 🧾 Order Management

* Order processing architecture
* Azure Queue Storage integration
* Queue-based order processing
* Designed to support asynchronous operations

### 🔐 Authentication

* User registration
* User login
* Authentication API
* Customer account management

### ☁️ Azure Cloud Integration

The project makes use of multiple Microsoft Azure services:

* **Azure Table Storage** — product and customer data
* **Azure Blob Storage** — product images
* **Azure Queue Storage** — orders and inventory processing
* **Azure Files** — application/log file storage
* **Azure App Service** — backend hosting
* **Azure Storage Account** — centralized cloud storage

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │   ASP.NET Core API   │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ Azure Table │   │ Azure Blob   │   │ Azure Queue │
      │   Storage   │   │   Storage    │   │   Storage   │
      └─────────────┘   └─────────────┘   └─────────────┘
             │                 │                 │
             ▼                 ▼                 ▼
        Customers &        Product Images    Orders &
        Products                            Inventory
```

---

## 💻 Technology Stack

### Frontend

* React
* JavaScript
* JSX
* CSS
* Vite
* React Router

### Backend

* C#
* ASP.NET Core
* RESTful APIs
* MVC architecture
* Dependency Injection

### Cloud

* Microsoft Azure
* Azure Storage Account
* Azure Table Storage
* Azure Blob Storage
* Azure Queue Storage
* Azure Files
* Azure App Service

### Development Tools

* Visual Studio
* Visual Studio Code
* Git
* GitHub
* Microsoft Azure Portal
  

---

## 📂 Project Structure

```text
Retail_management_system/
│
├── Controllers/
│   └── AuthController.cs
│
├── Models/
│   ├── CustomerAccount.cs
│   ├── LoginRequest.cs
│   └── ...
│
├── Services/
│   ├── CustomerTableService.cs
│   ├── CustomerAccountTableService.cs
│   ├── ProductTableService.cs
│   ├── BlobStorageService.cs
│   ├── OrderQueueService.cs
│   ├── InventoryQueueService.cs
│   └── ApplicationLogService.cs
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── ...
│   └── package.json
│
├── Program.cs
├── appsettings.json
└── ...
```

---

## 🔄 Application Flow

### Product Retrieval

```text
React Frontend
      ↓
Product Service
      ↓
ASP.NET Core API
      ↓
ProductTableService
      ↓
Azure Table Storage
      ↓
Product Data
      ↓
React Product Cards
```

### Product Images

```text
Product Image
      ↓
Azure Blob Storage
      ↓
Blob URL
      ↓
Azure Table Storage
      ↓
React Frontend
      ↓
Product Card
```

### Orders & Inventory

```text
Customer
   ↓
React Application
   ↓
ASP.NET Core API
   ↓
Azure Queue Storage
   ↓
Order / Inventory Processing
```

---

## 🎯 Project Goals

The main goals of this project are to demonstrate:

* Full-stack application development
* Cloud-based application architecture
* REST API development
* Azure Storage integration
* CRUD operations
* Authentication
* Product and inventory management
* Asynchronous processing with queues
* Cloud-based image storage
* Modern React development
* Clean separation between frontend, backend, and cloud services

---

## 🔒 Security Considerations

The application is designed with cloud security in mind.

Sensitive configuration values such as:

* Azure connection strings
* Storage account keys
* API credentials
* Environment variables

should **never be committed to GitHub**.

For local development, use configuration files or environment variables that are excluded through `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* .NET SDK
* Node.js
* npm
* Git
* Microsoft Azure account

### Clone the Repository

```bash
git clone https://github.com/EFTECH05/Project-1-Azure-Storage-Solution-.git
```

### Start the Backend

Navigate to the backend project:

```bash
cd Retail_management_system
```

Then run:

```bash
dotnet restore
dotnet run
```

### Start the Frontend

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application will then be available through the Vite development server.

---

## ☁️ Azure Services

This project demonstrates practical usage of Microsoft Azure cloud storage services.

| Azure Service         | Purpose                         |
| --------------------- | ------------------------------- |
| Azure Table Storage   | Products and customer data      |
| Azure Blob Storage    | Product images                  |
| Azure Queue Storage   | Orders and inventory processing |
| Azure Files           | Application/log file storage    |
| Azure App Service     | Backend hosting                 |
| Azure Storage Account | Cloud storage infrastructure    |

---

## 📈 Future Improvements

Planned improvements may include:

* 🛒 Shopping cart functionality
* 💳 Online payment integration
* 📦 Advanced order tracking
* 👨‍💼 Admin dashboard
* 📊 Sales analytics
* 🔔 Real-time notifications
* 🔐 Improved authentication and authorization
* 📱 Mobile application
* 🔎 Product search and filtering
* ⭐ Product reviews and ratings
* 🧾 Invoice generation
* 📈 Advanced inventory analytics

---


Frontend
├── Home
├── Products
├── Login
├── Register
└── Contact
```

---

## 👨‍💻 Developer

**Franklin Ngangu Simbi**

Software Development | Cloud Computing | Full-Stack Development

Interested in building modern applications using **React, .NET, Azure, and cloud technologies**.

---

## ⭐ Project Status

🚧 **Active Development**

This project is continuously being improved as new features, cloud services, and application capabilities are implemented.

---

## 📄 License

This project is intended for educational and portfolio purposes.
