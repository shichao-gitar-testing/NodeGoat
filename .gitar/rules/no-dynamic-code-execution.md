---
title: "No dynamic code execution with request data"
when: "A pull request introduces eval(), new Function(), setTimeout/setInterval with a string argument, vm.runIn*, or child_process (exec, execSync, spawn with shell: true) where any part of the input can come from req.query, req.body, req.params, req.headers, or req.cookies"
actions: "Request changes with a comment that this enables remote code execution. Recommend replacing it with safe parsing (JSON.parse, parseInt/parseFloat with validation), a lookup table of allowed operations, or execFile with a fixed command and an argument array. Include a corrected code snippet in the comment."
---

# Why

Executing strings derived from HTTP input gives an attacker arbitrary code execution on the server.

# Flag

- `eval(req.body.expr)`, `new Function(req.query.code)`, `exec("ls " + req.query.dir)`.
- Indirect flows, e.g. assigning request data to a variable that is later passed to eval/exec.

# Do not flag

- Dynamic execution of constants, or code in `test/` that never receives request data.
