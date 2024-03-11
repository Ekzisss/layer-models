import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  console.log('start2');
  const result = await fetch('https://layer-backend.onrender.com');
  const data = await result.json();
  console.log(data);

  return response.json({ datetime: data.datetime });
}
