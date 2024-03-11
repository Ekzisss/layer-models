// export default function handler(req, res) {
//   res.status(200).end('Hello Cron!');
// }

import { NextResponse } from 'next/server';

export default async function GET() {
  // Замените URL на URL вашего сервера
  try {
    const response = await fetch('https://layer-backend.onrender.com');
    const data = await response.json();

    // Обработайте полученные данные как необходимо
    console.log(data);

    // Верните ответ, если это необходимо
    return NextResponse.json({ message: 'GET request sent successfully' });
  } catch (error) {
    console.log(error);
  }
}
