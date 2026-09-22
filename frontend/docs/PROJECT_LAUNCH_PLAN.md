# CosmicCrate launch integration plan

## Purpose

CosmicCrate is a React/Vite gifting storefront for curated zodiac hampers. The launch goal is a reliable customer journey: discover a hamper, select a variant, submit an order securely, and give the team a trustworthy way to manage and fulfil it.

This document is the execution plan for moving from the current prototype to a launch-ready application.

## Current state

- The active application renders the newer `src/landing-page` experience.
- Older product, product-detail, and order-modal components exist in `src/components`; the Redux order flow lives there, but it is not currently reachable from the active landing page.
- Redux, Redux-Saga, and a single Axios order service are now wired for `POST /api/orders`.
- The local Node server validates basic fields and stores orders in `server/orders-store.json`.
- The JSON-file server is suitable for local development only. It must not be the production order system because it has no authentication, database, rate limits, audit trail, backups, monitoring, or safe concurrent writes.

## Target architecture

```text
Customer browser
  -> React/Vite UI
  -> Redux state (only shared UI/request state)
  -> API client
  -> HTTPS backend API
  -> PostgreSQL database
  -> Admin/fulfilment tools, notifications, analytics
```

The browser will never hold database credentials, payment secrets, email-service keys, or admin-only data. Environment variables prefixed with `VITE_` are public build-time values and must contain only public configuration such as an API URL.

## Delivery plan

### Phase 0 — Confirm the launch scope

1. Define the first launch journey: catalogue, product detail, pre-order/order, confirmation, and team fulfilment.
2. Decide whether launch is **enquiry/pre-order only** or includes online payment. Do not add payment handling until the provider, refund policy, tax rules, and fulfilment process are agreed.
3. Confirm business data: product catalogue, inventory policy, serviceable locations, delivery fees, cancellation policy, privacy policy, and support contact.
4. Choose one UI direction and merge the active landing page with the existing product/order experience. Remove or retire duplicate screens only after the replacement is live.

**Done when:** every visible CTA has a defined destination and a customer can reach the order flow from the live home page.

### Phase 1 — Frontend foundations

1. Keep feature code together: `features/orders`, `features/products`, and shared `services`, `store`, and `components` folders.
2. Use Redux only for shared or asynchronous state: order submission, catalogue cache, session/admin state, and global notifications. Keep input typing, open/close state, and other local-only UI state in React component state.
3. Keep one API client and one service per domain. Components dispatch actions; sagas call services; reducers only update state. Components must not call `fetch` or Axios directly for domain operations.
4. Add an error boundary, not-found page, loading/empty/error states, accessible keyboard navigation, and mobile checks.
5. Add tests for form validation, reducers/sagas, API-error rendering, and the full order journey.

**Done when:** the active UI uses the OrderService flow, no duplicate order request code remains, and automated frontend tests pass.

### Phase 2 — Production backend

1. Create a separate backend application with versioned endpoints, for example `/api/v1/orders` and `/api/v1/products`.
2. Replace `orders-store.json` with PostgreSQL and migrations. Store product prices and availability on the server; calculate totals on the server from trusted product data, never from the client-provided price.
3. Define database entities: `products`, `product_variants`, `inventory`, `orders`, `order_items`, `customers`, `order_status_history`, and admin users.
4. Preserve idempotency: require an `Idempotency-Key` or request ID, save it with a unique database constraint, and return the original result on safe retries.
5. Add an authenticated admin API for order status updates and inventory management. Customers should not receive this access.
6. Add an order confirmation notification only after the database transaction succeeds. Send email/SMS through a background job/queue so provider failures do not lose orders.

**Done when:** two simultaneous orders cannot corrupt data, retrying an order does not create duplicates, and an admin can securely view and update fulfilment status.

### Phase 3 — Security and privacy baseline

1. Enforce HTTPS, HSTS, secure headers, restrictive CORS for the real frontend origin, request-size limits, and server-side schema validation.
2. Apply rate limiting and bot protection to public endpoints, especially order, login, password reset, and contact forms.
3. Authenticate admins with a proven provider or secure sessions: password hashing, MFA, short-lived sessions/tokens, role-based access control, and server-side authorization on every protected endpoint.
4. Keep secrets in the deployment secret manager; never commit `.env` files, production keys, customer exports, or payment webhooks to Git.
5. Collect only customer data needed for fulfilment. Encrypt data in transit and at rest, restrict staff access, define retention/deletion rules, and publish a privacy policy before collecting personal information.
6. Log structured operational events without logging full names, phone numbers, addresses, tokens, passwords, or payment data. Keep an admin audit log for order/status changes.
7. Use payment-provider hosted checkout or tokenization. The application must never store card details.

**Done when:** a security review covers authentication, authorization, input validation, secrets, privacy, abuse controls, dependencies, and payment boundaries.

### Phase 4 — Quality and operations

1. Add unit tests, API integration tests, and end-to-end tests for successful orders, validation failures, duplicate requests, unavailable stock, and provider failures.
2. Add CI to run formatting, linting, tests, dependency checks, and production builds on every pull request.
3. Deploy separate development, staging, and production environments with separate databases and secrets.
4. Add database backups, restore testing, error tracking, uptime/health checks, performance monitoring, and alerting for failed order creation.
5. Create runbooks: how to inspect a failed order, resend notifications, update stock, refund/cancel, restore a backup, and roll back a deployment.

**Done when:** staging passes a complete rehearsal order, monitoring reports it, and the team can recover from a failed deployment or database restore exercise.

### Phase 5 — Launch checklist

1. Verify the real domain, HTTPS certificate, environment variables, API CORS origin, analytics consent, SEO metadata, sitemap, and social preview image.
2. Test desktop and mobile browsers, slow networks, keyboard navigation, screen readers, and all primary CTAs.
3. Execute test orders in staging, including duplicate clicks, rejected payment (if applicable), stock changes, and failed notifications.
4. Confirm support ownership, fulfilment cut-off times, inventory ownership, and an incident contact for launch day.
5. Launch with dashboards and alerts watched by a named owner; review orders and errors frequently during the first days.

## API contract principles

- Requests and responses are versioned and documented (OpenAPI is recommended).
- The server is the source of truth for price, stock, totals, status, and timestamps.
- Return consistent errors: `{ "code": "...", "message": "...", "fields": { } }`.
- Accept only expected fields; validate types, lengths, formats, and allowed status transitions.
- Never expose stack traces, database errors, internal IDs beyond what is necessary, or secrets to the browser.

## Recommended execution order

1. Finish the live customer journey by connecting the active landing page to products and ordering.
2. Define the API and database schema before building more frontend state.
3. Build the production backend and admin fulfilment workflow.
4. Add security controls, tests, CI/CD, monitoring, and backups.
5. Rehearse in staging, then launch in small, observable steps.

## Decisions needed before implementation

- Pre-order/enquiry versus paid checkout at launch.
- Backend platform and database host.
- Authentication approach for staff/admins.
- Email/SMS and payment providers.
- Delivery regions, tax/invoicing requirements, and privacy/data-retention policy.
