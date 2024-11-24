// Enum для языков
export enum LanguageEnum {
  English = 'en',
  Chinese = 'zh',
  Espanol = 'es',
  Deutsch = 'de',
  French = 'fr',
  Japanese = 'ja',
  Russian = 'ru',
}

export type Tag = [word: string, pos: string]

export async function textToTags(text: string, lang: LanguageEnum): Promise<{tags: Tag[], detectedLanguages: { lang: LanguageEnum, score: number }[]}> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ "text": text, "lang": lang });
    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://part-of-speech-tool.info/api/v2/pos_tagging/", requestOptions);
        let data = await response.json();
        return {
            tags: data.pos_tags,
            detectedLanguages: data.detected_languages
        } 
    } catch (error) {
        console.error('Ошибка при получении POS-тегов:', error);
        return {
            tags: [],
            detectedLanguages: []
        };
    }
}
