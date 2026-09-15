// Existing public Supabase form contract. Callers own localized UI and mail fallback.
export async function postForm(config, table, payload, fetcher = fetch) {
  const response = await fetcher(`${config.supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    signal: AbortSignal.timeout(15000),
    headers: {
      'Content-Type':'application/json',
      apikey:config.supabaseAnonKey,
      Authorization:`Bearer ${config.supabaseAnonKey}`,
      Prefer:'return=minimal',
    },
    body:JSON.stringify(payload),
  });
  return response;
}
