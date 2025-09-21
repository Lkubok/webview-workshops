# React Native WebView Integration Workshop Agenda

**Duration:** 4 hours

⸻

## 0. Introduction & Topic Overview (20 min) 9:00-9:20

- Quick discussion: “Who has worked with React Native WebView before?”
- High-level overview of why WebView integration is important in mobile apps
- Examples of common use-cases

⸻

## 1. Our Approach to Loyalty App Integration (10 min) 9:20 - 9:30

- Present the integration of our loyalty app with myVaillant Pro service app
- Show exchange token solution on the IDM (Keycloak) side
- Explain authentication flow: mobile app → WebView → Keycloak
- Discuss challenges and how we solved them

⸻

## 2. Tools & Architecture Overview (10 min) 9:30-9:40

- Monorepo setup with pnpm and Turborepo
- Custom Keycloak instance on private server
- Keycloak clients, roles, realms
- How we isolate users per client ??
- Public vs. confidential clients for mobile apps
- Why PKCE is important for secure mobile authentication

⸻

## 3. Token Management & PKCE (10 min) 9:40-9:50

- Overview of PKCE authentication flow in mobile apps
- How to exchange code for token in a mobile context
- How to refresh tokens inside WebView
- Demo of token lifecycle handling and best practices

⸻

## 4. Communication Bridges (10 min) 9:50 - 10:00

- Two-way communication between WebView and React Native app
- Passing messages, events, and user context
- Practical examples of triggering actions in the app from WebView
- Tips on structuring communication and avoiding pitfalls

⸻

## 5. Hands-on Coding Session (90 min) 10:00-12:00

- TODO: (Need to clarify examples)

⸻

## 6. Wrap-Up & Discussion (30 min) 12:00 - 12:30

- Discuss remaining challenges or questions
- Collect feedback about the workshop
- Suggest next steps for implementing WebView integrations in Vaillant :D

⸻
