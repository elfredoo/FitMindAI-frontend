# FitMindAI – Frontend

**FitMindAI** to nowoczesna aplikacja webowa typu e-commerce, która pozwala użytkownikom na:

- zakładanie konta,
- wyszukiwanie i przeglądanie produktów,
- dodawanie produktów do koszyka,
- składanie zamówień,
- dokonywanie płatności kartą,
- korzystanie z chatbota AI w celu uzyskania sugestii produktowych.

## Opis projektu

Projekt został stworzony w oparciu o bibliotekę **React**, jedną z najpopularniejszych technologii frontendowych na świecie. Dzięki niej interfejs użytkownika jest responsywny, dynamiczny i bardzo przyjemny w obsłudze.

Strona zawiera m.in.:

- animowane slajdy z banerami,
- efekt „Marquee” do prezentowania informacji o sklepie i opiniach,
- wiele nowoczesnych, responsywnych komponentów z animacjami.

Dane produktów pobierane są z bazy danych **PostgreSQL** za pośrednictwem dedykowanego API (zobacz repozytorium `FitMindAI-backend`). Frontend współpracuje z backendem w sposób płynny, co zapewnia bezproblemowy przepływ danych.

Użytkownicy mogą składać zamówienia i przechodzić przez proces płatności online. W tym celu zintegrowano **Stripe**, czyli jedno z najpopularniejszych i najbezpieczniejszych rozwiązań do obsługi płatności w branży.

Dodatkowo, aplikacja umożliwia generowanie faktur – co stanowi niezbędną funkcjonalność dla profesjonalnego sklepu e-commerce.

---

## 🛠 Tech Stack

**Frontend:**

- **React 18** – biblioteka do budowy interfejsów użytkownika  
- **Vite** – nowoczesny bundler i dev server  
- **Material UI (`@mui/material`)** – zestaw gotowych komponentów UI  
- **Emotion (`@emotion/react`, `@emotion/styled`)** – stylowanie komponentów (CSS-in-JS)  
- **Tailwind CSS** – nowoczesny utility-first framework CSS  
- **Redux Toolkit & React Redux** – zarządzanie globalnym stanem aplikacji  
- **React Router DOM** – routing i nawigacja  
- **React Query** (`@tanstack/react-query`) – zarządzanie zapytaniami i cache  
- **Axios** – komunikacja HTTP z backendem  
- **Stripe JS & React Stripe JS** – obsługa płatności online  
- **Framer Motion** – animacje i przejścia  
- **React Hook Form** – obsługa i walidacja formularzy  
- **React Hot Toast** – powiadomienia toast  
- **Swiper** – slider / karuzela  
- **React Icons & Lucide React** – ikony SVG  
- **React Markdown** – renderowanie treści w markdownie  
- **React Loader Spinner & React Spinners Kit** – wskaźniki ładowania  
- **Radix UI** – nowoczesne, niskopoziomowe komponenty UI (avatar, tabs, scroll area)  
- **ShadCN** – system kompozycji komponentów oparty o Tailwind CSS  
- **clsx & class-variance-authority** – zarządzanie klasami CSS  
- **PostCSS, autoprefixer** – narzędzia wspierające CSS  
- **ESLint** – analiza jakości kodu  

---

## 🔗 Linki

- 🔙 [Backend (API)](https://github.com/elfredoo/FitMindAI-backend)  
- 👤 Autor: **Bartek Rafalik** 

---

## 🧾 Licencja

Projekt open-source. Używaj i rozwijaj dalej!  
