# 📌 Post Board — Mini Social Network

Applicazione **Full-Stack** per la gestione e visualizzazione di brevi messaggi testuali (*post*) all'interno di una bacheca condivisa, con sistema di autenticazione e persistenza dei dati.

Il progetto è stato sviluppato seguendo un'architettura modulare e pratiche di sviluppo orientate a **sicurezza, manutenibilità e scalabilità**.

---

## 🛠️ Stack Tecnologico

### Backend

* **Linguaggio & Framework:** Java 17+ & Spring Boot 3.x
* **Build Tool:** Maven
* **Sicurezza & Autenticazione:** Spring Security con gestione delle sessioni lato server (`JSESSIONID`)
* **Password Hashing:** `BCryptPasswordEncoder`
* **Persistenza:** Spring Data JPA / Hibernate

### Frontend

* **Framework:** Angular 17+ con architettura basata su *Standalone Components*
* **Routing & Protezione:** Angular Router con `AuthGuard` per le rotte protette
* **Comunicazione HTTP:** `HttpClient` con `withCredentials: true` per la gestione automatica del cookie di sessione

### Database

* **RDBMS:** PostgreSQL
* **Relazioni:** relazione 1-a-molti tra `users` e `posts`

---

## 🚀 Architettura e Funzionalità

### 🔐 Autenticazione Session-Based

L'applicazione utilizza un sistema di autenticazione basato su **sessione lato server**, evitando l'utilizzo di token JWT memorizzati lato client.

La sessione viene identificata tramite il cookie `JSESSIONID` e gestita direttamente da Spring Security.

### 📝 Bacheca dei Post

* Visualizzazione dei post in **ordine cronologico decrescente**, dal più recente al più vecchio.
* Supporto alla **paginazione server-side**.
* Accesso alla bacheca riservato agli utenti autenticati.

### ✍️ Creazione dei Post

* Form dedicato alla pubblicazione di nuovi messaggi.
* Limite massimo di **280 caratteri**.
* Il testo non può essere vuoto.
* Validazione sia **client-side** che **server-side**.
* Contatore dinamico dei caratteri durante la digitazione.

### 🛡️ Validazione e Sicurezza

I dati vengono validati su entrambi i livelli dell'applicazione:

* **Angular:** validazione immediata dei dati inseriti dall'utente.
* **Spring Boot:** validazione e controllo dell'integrità dei dati prima della persistenza.
* Le API protette impediscono l'accesso agli utenti non autenticati.
* Le richieste non autorizzate vengono gestite tramite i relativi codici HTTP (`401 Unauthorized` / `403 Forbidden`).

---

## 📋 Prerequisiti

Prima di avviare il progetto, assicurati di avere installato:

* **JDK:** versione 17 o superiore
* **Node.js:** versione 18+ oppure una versione LTS
* **npm:** incluso nell'installazione di Node.js
* **Angular CLI:** installabile tramite npm
* **PostgreSQL:** server locale attivo
* **Maven:** oppure utilizzare il Maven Wrapper incluso nel progetto, se presente

Per installare Angular CLI globalmente:

```bash
npm install -g @angular/cli
```

---

## ⚙️ Installazione e Avvio

Per avviare correttamente il progetto è necessario inizializzare prima il database, successivamente il backend e infine il frontend.

### 1. 🗄️ Database — PostgreSQL

Accedi al tuo server PostgreSQL tramite **pgAdmin**, terminale o un altro client compatibile.

Crea un database dedicato:

```sql
CREATE DATABASE postboard_db;
```

---

### 2. ☕ Backend — Spring Boot

Apri un terminale e posizionati nella cartella del backend:

```bash
cd backend
```

Configura le credenziali di PostgreSQL nel file:

```text
src/main/resources/application.properties
```

Esempio:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postboard_db
spring.datasource.username=postgres
spring.datasource.password=TUA_PASSWORD
```

> ⚠️ **Nota:** non condividere o committare mai la password reale del database all'interno del repository.

Avvia il backend direttamente da **IntelliJ IDEA** tramite la classe `PostboardApplication.java` oppure da terminale:

```bash
mvn spring-boot:run
```

Il backend sarà disponibile all'indirizzo:

**http://localhost:8080**

Al primo avvio, le tabelle necessarie (`users` e `posts`) verranno create automaticamente in base alla configurazione JPA/Hibernate.

---

### 3. 🖥️ Frontend — Angular

Apri un nuovo terminale e posizionati nella cartella del frontend:

```bash
cd frontend
```

Installa le dipendenze:

```bash
npm install
```

Avvia il server di sviluppo Angular:

```bash
ng serve
```

Il frontend sarà disponibile all'indirizzo:

**http://localhost:4200**

Apri quindi il browser e visita:

```text
http://localhost:4200
```

---

## 📡 REST API

| Metodo | Endpoint                    | Descrizione                                     | Autenticazione |
| :----: | --------------------------- | ----------------------------------------------- | :------------: |
| `POST` | `/api/auth/register`        | Registra un nuovo utente con password hashata   |        ❌       |
| `POST` | `/api/auth/login`           | Esegue il login e crea una sessione autenticata |        ❌       |
| `POST` | `/api/auth/logout`          | Invalida la sessione attiva lato server         |        ✅       |
|  `GET` | `/api/posts?page=0&size=20` | Restituisce la lista paginata dei post          |        ✅       |
| `POST` | `/api/posts`                | Pubblica un nuovo post (massimo 280 caratteri)  |        ✅       |

---

## 🗂️ Struttura del Progetto

Una possibile struttura del progetto è la seguente:

```text
post-board/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── ...
│   ├── package.json
│   └── angular.json
│
└── README.md
```

---

## 🔒 Sicurezza

Il progetto adotta un approccio **session-based** per la gestione dell'autenticazione.

Le password degli utenti non vengono memorizzate in chiaro, ma vengono protette tramite:

```text
BCryptPasswordEncoder
```

Il cookie di sessione `JSESSIONID` viene utilizzato per mantenere lo stato di autenticazione tra frontend e backend.

Il frontend utilizza:

```typescript
withCredentials: true
```

per consentire al browser di includere il cookie di sessione nelle richieste verso il backend.

---

## 👤 Autore

**Alessandro Mercede**

---

## 📄 Licenza

Progetto realizzato per valutare le capacità del sottoscritto per un colloquio di lavoro.

````