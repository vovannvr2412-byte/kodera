const SITE_TYPES = new Set(['Лендинг', 'Визитка', 'Магазин', 'Не знаю', 'Не указан']);

function clean(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > 10_000) {
    return res.status(413).json({ error: 'Слишком большой запрос' });
  }

  if (req.headers['sec-fetch-site'] === 'cross-site') {
    return res.status(403).json({ error: 'Запрос отклонён' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Некорректный запрос' });
    }
  }

  const name = clean(body?.name, 80);
  const phone = clean(body?.phone, 32);
  const requestedSiteType = clean(body?.siteType, 40);
  const siteType = SITE_TYPES.has(requestedSiteType) ? requestedSiteType : 'Не указан';
  const consent = body?.consent === true;
  const honeypot = clean(body?.website, 120);

  if (honeypot) return res.status(200).json({ ok: true });

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Укажите имя' });
  }

  if (!/^\+?[0-9()\s-]{7,24}$/.test(phone)) {
    return res.status(400).json({ error: 'Проверьте номер телефона' });
  }

  if (!consent) {
    return res.status(400).json({ error: 'Необходимо согласие на обработку данных' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL || 'volodimirnedosekin@yandex.ru';
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'Kodera <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(503).json({ error: 'Отправка временно не настроена' });
  }

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeSiteType = escapeHtml(siteType);
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `Новая заявка Kodera — ${siteType}`,
        html: `
          <h1>Новая заявка с сайта Kodera</h1>
          <p><strong>Имя:</strong> ${safeName}</p>
          <p><strong>Телефон:</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
          <p><strong>Тип сайта:</strong> ${safeSiteType}</p>
          <p><strong>Время:</strong> ${submittedAt} (МСК)</p>
        `,
        text: `Новая заявка с сайта Kodera\nИмя: ${name}\nТелефон: ${phone}\nТип сайта: ${siteType}\nВремя: ${submittedAt} (МСК)`
      })
    });

    if (!emailResponse.ok) {
      console.error('Resend delivery failed with status', emailResponse.status);
      return res.status(502).json({ error: 'Почтовый сервис не принял заявку' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Lead delivery failed', error instanceof Error ? error.message : 'unknown error');
    return res.status(502).json({ error: 'Не удалось доставить заявку' });
  }
};
