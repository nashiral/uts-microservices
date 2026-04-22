# UTS Microservices - ActiveMQ

## 📌 Deskripsi

Project ini merupakan implementasi arsitektur microservices menggunakan message queue (ActiveMQ) untuk sistem notifikasi pendaftaran akun.

## ⚙️ Teknologi

* Node.js
* ActiveMQ
* STOMP Protocol

## 🧩 Arsitektur

* Producer (User Registration)
* Consumer (Notification Worker)
* Message Broker (ActiveMQ)

## 🚀 Cara Menjalankan

### 1. Jalankan ActiveMQ

* Jalankan `activemq.bat`
* Akses: http://localhost:8161

### 2. Jalankan Producer

```bash
cd producer
node app.js
```

### 3. Jalankan Consumer

```bash
cd consumer
node worker.js
```

## 📡 Endpoint

POST /register

## 📬 Queue

registration_queue

## 🧪 Skenario Pengujian

* Asynchronous test (consumer dimatikan)
* Resilience test (consumer dinyalakan kembali)

## 🎥 Video Demo

()
