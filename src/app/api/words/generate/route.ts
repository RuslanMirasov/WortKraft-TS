export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch('http://localhost:5678/webhook/create-new-word', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      word: body.word,
      level: body.level,
      category: body.category,
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
