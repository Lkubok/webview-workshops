# Exchange token diagram

**Example structure:**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │Exchange Endpoint│    │   Keycloak      │
│                 │    │                 │    │                 │
│ 1. Has Token ──────► │ 2. Validate ───────► │ 3. Confirm      │
│                 │    │                 │    │                 │
│ 6. Get Scoped ◄────── │ 5. New Token ◄────── │ 4. Issue Token  │
│    Token        │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│    WebView      │    │  External App   │
│                 │    │                 │
│ 7. Navigate ───────► │ 8. Extract      │
│ #token=xyz      │    │    Token        │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
```
