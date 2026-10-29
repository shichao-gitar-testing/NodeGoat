---
title: "No outbound requests to user-controlled URLs (SSRF)"
when: "A pull request adds or changes code under app/routes/ that makes an outbound HTTP request (needle, http, https, fetch, axios, request) using a URL, host, or path derived from req.query, req.body, req.params, or req.headers"
actions: "Request changes with a comment explaining the SSRF risk. Recommend validating the URL against a hard-coded allowlist of hosts, enforcing https, and rejecting private/loopback/link-local addresses (127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16). Suggest a concrete fix that builds the URL server-side from a fixed base and only accepts a validated identifier from the user."
---

# Why

Fetching a URL supplied by the client lets an attacker make the server call internal
services (cloud metadata endpoints, databases, admin panels) and read the response back.

# Flag

- `needle.get(req.query.url + ...)`, `http.get(req.body.target)`, `fetch(userInput)` and similar.
- String concatenation of a user value onto a base URL when the user controls the scheme or host.

# Do not flag

- URLs built entirely from constants or `config/` values.
- Calls where the user value is only a path segment validated against a strict regex and the host is fixed.
