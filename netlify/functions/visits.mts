import { json, store, updateJSON } from '../lib/store'

type Visits = { total: number }

// GET: devolve o total de visitantes. POST: registra uma visita nova e devolve o total.
export default async (req: Request) => {
  try {
    if (req.method === 'POST') {
      const data = await updateJSON<Visits>('visits', { total: 0 }, (current) => ({ total: current.total + 1 }))
      return json({ total: data.total })
    }
    if (req.method === 'GET') {
      const data = (await store().get('visits', { type: 'json' })) as Visits | null
      return json({ total: data?.total ?? 0 })
    }
    return json({ error: 'Método não permitido' }, 405)
  } catch {
    return json({ error: 'Não foi possível acessar o contador' }, 500)
  }
}
