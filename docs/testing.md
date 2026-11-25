# Testing

Four kinds of tests. All of them run on every push in GitHub Actions
([.github/workflows/ci.yml](../.github/workflows/ci.yml)).

| Command             | What it checks                                              | Needs                   |
| ------------------- | ----------------------------------------------------------- | ----------------------- |
| `npm test`          | Unit tests: formatting, validation, tokens, translations    | Nothing                 |
| `npm run test:db`   | Database security (RLS): merchants can't touch others' data | Local Supabase (Docker) |
| `npm run test:e2e`  | Real browser at 360px: pages, language switch, full M1 flow | `npm run build` first   |
| `npm run typecheck` | TypeScript                                                  | Nothing                 |

## Database and full-flow tests

`tests/db/*` and `tests/e2e/merchant-flow.spec.ts` need a **local**
Supabase. They never touch the real project, and they skip themselves when
no local Supabase is running, so on a PC without Docker they show as
"skipped". CI always runs them.

To run them on your PC:

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   and start it.
2. Start the local Supabase. It applies every migration from scratch and
   gives you a test inbox (Mailpit) at http://127.0.0.1:54324:

   ```bash
   npx supabase start
   ```

3. Load its settings into your shell and run the tests (Git Bash):

   ```bash
   set -a; source <(bash scripts/supabase-test-env.sh); set +a
   npm run test:db
   npm run build && npm run test:e2e
   ```

4. Stop it when done: `npx supabase stop`.

## What the RLS tests prove

Two merchants, Alice and Bob. Alice **cannot**: read Bob's profile, edit or
delete Bob's shop, create a shop in someone else's name, verify her own
shop, give her shop to someone else, make herself admin, upload into or
delete from Bob's storage folder. Logged-out visitors can read shop pages and
categories, and nothing else.
