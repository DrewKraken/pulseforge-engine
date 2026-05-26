# PulseForge Engine

> **Status: parked / experimental.** A small CLI task pipeline runner I built
> while exploring workflow execution patterns. Not actively maintained —
> kept here as a reference snippet for sequential task orchestration with
> shared state.

## What it does

Runs a sequence of tasks defined in `config.json`. Each task receives shared
execution state and returns a result. Built-in handlers cover the basics:

| Type       | Purpose                                  |
| ---------- | ---------------------------------------- |
| `set`      | Write a value into shared state          |
| `log`      | Print a message (with `{{key}}` interp)  |
| `readFile` | Read file contents into shared state     |
| `wait`     | Pause execution for N ms                 |

## Quick start

```bash
npm install
node index.js
```

Edit `config.json` to define the task sequence. Add new handlers in
`handlers.js` and register them in `index.js`.

## What's actually here

- `index.js` — execution loop (~40 lines)
- `handlers.js` — built-in task handlers (~50 lines)
- `config.json` — example workflow
- `input.txt` — sample input file

Small on purpose. Useful for understanding the core pattern; not a
production tool.

## License

MIT.
