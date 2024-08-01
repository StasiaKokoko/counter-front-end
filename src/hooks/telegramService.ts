import fetch from 'node-fetch';

interface TelegramResponse {
  ok: boolean;
  description?: string;
}

const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const chatId = 'YOUR_TELEGRAM_CHAT_ID';

export async function sendTelegramMessage(walletAddress?: string, username?: string): Promise<void> {
  // Проверяем, есть ли значения у walletAddress и username
  if (!walletAddress || !username) {
    console.warn('Wallet address or username is missing. Telegram message will not be sent.');
    return;
  }

  const message = `Новый пользователь подключил кошелек:\n\nUsername: ${username}\nWallet Address: ${walletAddress}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    // Приведение типа данных, возвращаемых из response.json()
    const data = (await response.json()) as TelegramResponse;

    if (data.ok) {
      console.log('Message sent successfully');
    } else {
      console.error('Failed to send message:', data.description);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
