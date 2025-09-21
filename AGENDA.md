# React Native WebView Integration Workshop Agenda

**Duration:** 4 hours

---

## 0. Introduction & Topic Overview (20 min) 9:00–9:20

- Welcome and introduction of the workshop topic
- Quick discussion: “Who has worked with React Native WebView before?”
- High-level overview of why WebView integration is important in mobile apps
- Examples of common use-cases

---

## 1. Our Approach to Loyalty App Integration (10 min) 9:20–9:30

- Present the integration of our loyalty app with myVaillant Pro service app
- Show exchange token solution on the IDM (Keycloak) side
- Explain authentication flow: mobile app → WebView → Keycloak
- Discuss challenges and how we solved them
- **Hash Params for Token Passing:**
  - Why passing tokens through hash params (e.g., `#access_token=...`) is more secure than query params
  - Hash params are not sent to the server, reducing risk of token leakage via logs or referrer headers

---

## 2. Tools & Architecture Overview (10 min) 9:30–9:40

- Monorepo setup with pnpm and Turborepo
- Custom Keycloak instance on private server
- Keycloak clients, roles, realms
- How we isolate users per client
- Public vs. confidential clients for mobile apps
- Why PKCE is important for secure mobile authentication

---

## 3. Token Management & PKCE (10 min) 9:40–9:50

- Overview of PKCE authentication flow in mobile apps
- How to exchange code for token in a mobile context
- How to refresh tokens inside WebView
- Demo of token lifecycle handling and best practices

---

## 4. Communication Bridges (10 min) 9:50–10:00

- Two-way communication between WebView and React Native app
- Passing messages, events, and user context
- Practical examples of triggering actions in the app from WebView
- Tips on structuring communication and avoiding pitfalls

---

## 5. Hands-on Coding Session (90 min) 10:00–12:00

### Exercise 1 – Load Your Own Next.js App

- Switch the WebView URL to your prepared Next.js app running locally or on your server.
- Verify the app loads properly in the WebView.

### Exercise 2 – Role-Based UI Blocking in Next.js

- Parse the `resource_access` section of the token.
- Conditionally render a “Secret Dashboard” section only for users with `dashboard-app-user` role.
- Verify that logging in with a user lacking that role hides the section.

### Exercise 3 – Refresh Token Inside WebView

- Add a refresh-token call in Next.js (using your backend).
- Implement an interval or `useEffect` hook to silently refresh the token.
- Display the token expiration countdown on the page to show it’s refreshing correctly.

### Exercise 4 – RN ↔ WebView Two-Way Communication

- In the Next.js app (inside the WebView), add a button that posts a message to React Native.
- In React Native, implement `onMessage` handler to receive this message and show an alert/toast.
- Add a button in the React Native app that sends data (like user info) back to the Next.js app using `injectJavaScript` or `postMessage`.
- Display the received data in the Next.js UI.

---

## 6. Wrap-Up & Discussion (30 min) 12:00–12:30

- Discuss remaining challenges or questions
- Collect feedback about the workshop
- Suggest next steps for implementing WebView integrations in Vaillant :D

---

**Notes:**

- Include short breaks as needed (e.g., 5–10 min after the introduction or halfway through coding)
- Keep demos concise but interactive to engage participants
- Prepare a small “starter repo” for hands-on coding to save time
