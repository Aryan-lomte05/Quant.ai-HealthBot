import { NextRequest, NextResponse } from 'next/server';

/**
 * ElevenLabs TTS API Route
 * Generates natural, multilingual speech using ElevenLabs API
 * 
 * Security: API key is stored server-side only, never exposed to frontend
 * Model: eleven_multilingual_v2 - auto-detects language from text
 */

// ElevenLabs Voice IDs
const VOICE_IDS = {
    male: 'nPczCjzI2devNBz1zQrb',   // Brian - warm, trustworthy male voice
    female: 'pFZP5JQG7iQjIQuC4Bku',  // Lily - calm, reassuring female voice
} as const;

// Healthcare-optimized voice settings
const VOICE_SETTINGS = {
    stability: 0.6,        // Calm, consistent delivery
    similarity_boost: 0.7, // Clear, natural speech
    style: 0.0,            // Neutral style for medical context
    use_speaker_boost: true,
};

type VoicePreference = 'male' | 'female';

interface TTSRequestBody {
    text: string;
    voice: VoicePreference;
}

export async function POST(request: NextRequest) {
    try {
        // Validate API key
        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            console.error('ELEVENLABS_API_KEY not configured');
            return NextResponse.json(
                { error: 'TTS service not configured' },
                { status: 500 }
            );
        }

        // Parse and validate request body
        const body: TTSRequestBody = await request.json();
        const { text, voice = 'male' } = body;

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Invalid request: text is required' },
                { status: 400 }
            );
        }

        if (text.length > 5000) {
            return NextResponse.json(
                { error: 'Text too long (max 5000 characters)' },
                { status: 400 }
            );
        }

        if (!['male', 'female'].includes(voice)) {
            return NextResponse.json(
                { error: 'Invalid voice preference' },
                { status: 400 }
            );
        }

        // Select voice ID based on preference
        const voiceId = VOICE_IDS[voice];

        // Debug logging
        console.log(`[TTS] Generating audio with voice: ${voice} (${voiceId})`);
        console.log(`[TTS] Text length: ${text.length} characters`);

        // Call ElevenLabs TTS API with multilingual model
        const elevenLabsResponse = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey,
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_multilingual_v2', // Auto-detects language
                    voice_settings: VOICE_SETTINGS,
                }),
            }
        );

        if (!elevenLabsResponse.ok) {
            const errorText = await elevenLabsResponse.text();
            console.error('ElevenLabs API error:', errorText);

            // Handle specific error cases
            if (elevenLabsResponse.status === 401) {
                return NextResponse.json(
                    { error: 'TTS authentication failed' },
                    { status: 500 }
                );
            }

            if (elevenLabsResponse.status === 429) {
                return NextResponse.json(
                    { error: 'TTS rate limit exceeded. Please try again later.' },
                    { status: 429 }
                );
            }

            return NextResponse.json(
                { error: 'TTS generation failed' },
                { status: 500 }
            );
        }

        // Stream audio response to client
        const audioBuffer = await elevenLabsResponse.arrayBuffer();

        console.log(`[TTS] Successfully generated ${audioBuffer.byteLength} bytes of audio for ${voice} voice`);

        return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.byteLength.toString(),
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            },
        });
    } catch (error) {
        console.error('TTS API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
