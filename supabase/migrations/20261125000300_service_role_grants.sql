-- M1 · Give the server's secret key (service_role) full access to our tables.
--
-- Newer Supabase projects no longer grant table privileges to service_role
-- automatically, so admin server code (e.g. verifying shops in M5) would get
-- "permission denied". service_role bypasses RLS by design and is only used
-- in server code (src/lib/supabase/admin.ts), never in the browser.

grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant execute on all functions in schema public to service_role;

-- Tables created by later migrations get the same access automatically.
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
alter default privileges in schema public grant execute on functions to service_role;
