# ElevenLabs TTS Setup Guide

## 1. Get Your ElevenLabs API Key

1. Go to [ElevenLabs](https://elevenlabs.io) and sign up/log in
2. Navigate to your [API Settings](https://elevenlabs.io/app/settings/api-keys)
3. Copy your API key

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# In k:\Git clone\Quant.ai-HealthBot
ELEVENLABS_API_KEY=your_api_key_here
```

**Important:** Never commit this file to Git. It's already in `.gitignore`.

## 3. Verify Voice IDs (Optional)

The implementation uses these default voices:
- **Male**: Brian (`nPczCjzI2devNBz1zQrb`)
- **Female**: Lily (`pFZP5JQG7iQjIQuC4Bku`)

To use different voices, update the `VOICE_IDS` in `src/app/api/tts/route.ts`.

## 4. Start the Development Server

```powershell
npm run dev
```

## 5. Test TTS

1. Navigate to `http://localhost:3000/chat`
2. Click the **Male/Female** voice toggle in the header
3. Send a message in any supported language
4. Listen to the AI response automatically play
5. Click the speaker icon on any message to replay

## Supported Languages

The TTS automatically detects and speaks these languages:
- Hindi (हिन्दी)
- English
- Hinglish
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Kannada (ಕನ್ನಡ)
- Bengali (বাংলা)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)

## Features

✅ **Auto-play**: AI responses automatically speak after generation
✅ **Voice preference**: Choose Male or Female voice (persisted in localStorage)
✅ **Per-message controls**: Click speaker icon to replay any message
✅ **Smart prevention**: No auto-play while you're typing
✅ **Avatar sync**: 3D avatar animates when speaking
✅ **Secure**: API key never exposed to frontend
✅ **Mobile-ready**: Works on all modern browsers

## Troubleshooting

**Audio doesn't play:**
- Check browser console for errors
- Verify `ELEVENLABS_API_KEY` is set correctly in `.env.local`
- Restart the dev server after adding environment variables

**API errors:**
- Check your ElevenLabs account quota/credits
- Verify the voice IDs are correct for your account
- Check the browser Network tab for error responses

**No auto-play:**
- Some browsers require user interaction before playing audio
- Click the speaker icon manually once, then auto-play should work
