<p align="right">
  <a href="#polski">🇵🇱 Polski</a> | <a href="#english">🇬🇧 English</a>
</p>

<h2 id="polski">🇵🇱 FitMindAI – Frontend</h2>

**FitMindAI** to nowoczesna aplikacja webowa typu e-commerce, która umożliwia użytkownikowi:

- założenie konta,  
- przeglądanie i wyszukiwanie produktów,  
- dodawanie produktów do koszyka,  
- składanie zamówień,  
- płatność kartą,  
- zapytanie chatbota AI o rekomendacje produktowe.

### Opis projektu

Projekt został zbudowany w technologii **React**, jednej z najpopularniejszych bibliotek frontendowych na świecie. Strona jest szybka, interaktywna i bardzo responsywna.

Funkcje strony:

- animowane slajdy banerowe,  
- efekt "Marquee" z informacjami o sklepie i opiniach,  
- pięknie zaanimowane, responsywne przyciski i komponenty interfejsu.

Dane produktowe pobierane są z bazy **PostgreSQL** przez napisane przeze mnie API (`FitMindAI-backend`, dostępne w osobnym repozytorium). Frontend współpracuje z backendem bezproblemowo.

Użytkownik po dodaniu produktów do koszyka przechodzi do sekcji płatności, gdzie wpisuje adres dostawy i opłaca zamówienie. Wykorzystałem **Stripe** – jedno z najbezpieczniejszych rozwiązań płatniczych na rynku.

Dodatkowo, użytkownik może wygenerować fakturę zamówienia – co jest kluczową funkcją w sklepie internetowym.

### Sprzedawcy w FitMindAI

W sklepie **FitMindAI** użytkownicy mogą także zostać sprzedawcami i zarządzać własnym asortymentem. Do ich dyspozycji jest panel, w którym mogą:

- dodawać, edytować i usuwać swoje produkty,  
- zarządzać stanem magazynowym,  
- przeglądać statystyki sprzedaży:  
  - przychody,  
  - ilość sprzedanych produktów,  
  - popularność poszczególnych pozycji,  
- monitorować zamówienia i statusy realizacji.

Ta funkcja pozwala sprzedawcom samodzielnie kontrolować swój biznes bezpośrednio w aplikacji, co znacznie ułatwia prowadzenie sprzedaży i rozwój.

---

### 🛠 Stack technologiczny

- React 18  
- Vite  
- Tailwind CSS  
- Material UI  
- Emotion  
- Redux Toolkit  
- React Router  
- React Query  
- Axios  
- Stripe JS  
- Framer Motion  
- React Hook Form  
- Swiper  
- React Icons, Lucide React  
- React Markdown  
- Toasty, Spinnery, Animacje  
- ESLint, PostCSS, ShadCN, Radix UI

---

<h2 id="english">🇬🇧 FitMindAI – Frontend</h2>

**FitMindAI** is a modern web-based e-commerce application that allows users to:

- create an account,  
- browse and search for products,  
- add items to the shopping cart,  
- place orders,  
- pay via credit card,  
- get personalized product suggestions from an AI chatbot.

### Project Overview

The project was built using **React**, one of the most popular frontend libraries globally. The app is fast, interactive, and highly responsive.

Site features:

- animated banner sliders,  
- "Marquee" effects with shop info and testimonials,  
- beautifully animated, responsive UI components and buttons.

Product data is fetched from a **PostgreSQL** database through my custom API (`FitMindAI-backend`, available in a separate repository). The frontend integrates seamlessly with the backend.

After adding items to the cart, the user can proceed to checkout, enter a shipping address, and securely pay using **Stripe** – one of the most secure and widely-used payment solutions in the industry.

Users can also generate an invoice – a must-have feature for e-commerce platforms.

### Seller Features in FitMindAI

In **FitMindAI**, users can also become sellers and manage their own product offerings. They have access to a dedicated dashboard where they can:

- add, edit, and remove their products,  
- manage inventory levels,  
- view sales statistics:  
  - revenue,  
  - number of products sold,  
  - popularity of individual items,  
- track orders and fulfillment status.

This feature empowers sellers to independently control their business directly within the app, making sales management and growth easier.

---

### 🛠 Tech Stack

- React 18  
- Vite  
- Tailwind CSS  
- Material UI  
- Emotion  
- Redux Toolkit  
- React Router  
- React Query  
- Axios  
- Stripe JS  
- Framer Motion  
- React Hook Form  
- Swiper  
- React Icons, Lucide React  
- React Markdown  
- Toasts, Spinners, Animations  
- ESLint, PostCSS, ShadCN, Radix UI

---

<p align="center">
  👤 Author: <strong>Bartek Rafalik</strong><br>
  🔗 <a href="https://github.com/elfredoo/FitMindAI-backend">Backend Repository</a>
</p>
