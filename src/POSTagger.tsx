import React, { useCallback, useEffect, useState } from 'react';
import './POSTagger.css';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Button, Chip, CircularProgress, LinearProgress } from '@mui/material';
import { getTags, LanguageEnum, Tag } from './backend'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import LanguageDropdown, { Language, languages } from './LanguageDropdown';
import { Trans, useTranslation } from 'react-i18next';

const tagsColors = [
    { code: 'ADJ', color: 'hsla(30, 90%, 70%, 0.5)', name: 'Adjective' },  // Красный
    { code: 'ADP', color: 'hsla(120, 90%, 60%, 0.5)', name: 'Adposition' },  // Ярко-зеленый
    { code: 'ADV', color: 'hsla(160, 80%, 60%, 0.5)', name: 'Adverb' },  // Зеленый
    { code: 'AUX', color: 'hsla(210, 80%, 75%, 0.5)', name: 'Auxiliary' },  // Голубой
    { code: 'CCONJ', color: 'hsla(220, 90%, 50%, 0.5)', name: 'Coordinating conjunction' },  // Яркий синий
    { code: 'DET', color: 'hsla(300, 90%, 60%, 0.5)', name: 'Determiner' },  // Пурпурный
    { code: 'INTJ', color: 'hsla(10, 80%, 80%, 0.5)', name: 'Interjection' },  // Оранжевый
    { code: 'NOUN', color: 'hsla(60, 80%, 60%, 0.5)', name: 'Noun' },  // Желтый
    { code: 'NUM', color: 'hsla(100, 80%, 75%, 0.5)', name: 'Numeral' },  // Светло-зеленый
    { code: 'PART', color: 'hsla(170, 80%, 75%, 0.5)', name: 'Particle' },  // Легкий зеленый
    { code: 'PRON', color: 'hsla(220, 70%, 80%, 0.5)', name: 'Pronoun' },  // Синий-зеленый
    { code: 'PROPN', color: 'hsla(270, 90%, 50%, 0.5)', name: 'Proper noun' },  // Фиолетовый
    { code: 'PUNCT', color: 'hsla(320, 90%, 50%, 0.5)', name: 'Punctuation' },  // Ярко-розовый
    { code: 'SCONJ', color: 'hsla(350, 90%, 60%, 0.5)', name: 'Subordinating conjunction' },  // Красно-фиолетовый
    { code: 'SYM', color: 'hsla(30, 80%, 85%, 0.5)', name: 'Symbol' },  // Яркий оранжевый
    { code: 'VERB', color: 'hsla(240, 90%, 45%, 0.5)', name: 'Verb' },  // Темно-синий
    { code: 'X', color: 'hsla(130, 80%, 75%, 0.5)', name: 'Other' }  // Зеленый
]

const SAMPLE_TEXT = `Once upon a time, in a quiet village nestled between misty mountains, there lived a boy named Finn. Every morning, he would climb to the top of the tallest hill to watch the sun rise over the valley, painting the world in shades of gold.

Finn dreamed of adventure beyond the village, of discovering lands unknown and meeting creatures of legend. The villagers often laughed, saying he had his head in the clouds, but Finn’s curiosity only grew with each passing day.

One morning, as he sat beneath an ancient oak, he noticed something unusual. At the base of the tree lay a small stone with a curious symbol etched into its surface. It seemed to glow faintly in the dawn light, sparking a mystery that Finn couldn’t resist exploring.`

export default function POSTagger() {
    const { t, i18n } = useTranslation();  // Получаем доступ к переводам через useTranslation
    const [text, setText] = useState<string>(SAMPLE_TEXT)
    const [tags, setTags] = useState<Tag[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedLang, setSelectedLang] = useState<Language>(languages[0])
    const [isEnabledAutorefresh, setIsEnabledAutorefresh] = useState<boolean>(false)
    
    const onButtonClick = useCallback(() => {
        if (text === '') return
        setIsLoading(true)
        getTags(text, selectedLang.code).then(setTags).finally(() => {
            setIsLoading(false)
        })
    }, [text, selectedLang.code])

    useEffect(() => {
        if (isEnabledAutorefresh) {
            onButtonClick()
        }
    }, [text, selectedLang.code, isEnabledAutorefresh])

    const parseLanguage = useCallback((unknownLang: string): Language | null => {
        if (Object.values(LanguageEnum).includes(unknownLang as LanguageEnum)) {
            let detectedLangEnum = unknownLang as LanguageEnum;
            let detectedLang = languages.find(lng => lng.code === detectedLangEnum)
            if (detectedLang) return detectedLang
        }
        return null
    }, [languages])
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txt = urlParams.get('text')
        const lng = urlParams.get('lang')
        if (txt) {
            setText(txt)
            if (lng) {
                let detectedLanguage = parseLanguage(lng)
                if (detectedLanguage) setSelectedLang(detectedLanguage)
            }
        }
        setIsEnabledAutorefresh(true)
        // i18n.changeLanguage('en')
    }, [])
    
    return (
        <>
        {isLoading && <LinearProgress className='my-1' hidden={!isLoading} />}
        <div className='grid grid-cols-1 lg:grid-cols-2  gap-2'>
            <div className="">
                <strong><Trans i18nKey={'form.text_title'} values={{ language: selectedLang.name }}/></strong>
                <span className='mx-2'>
                    <LanguageDropdown
                        defaultLanguage={selectedLang}
                        onSelectedNewLanguage={(newLang) => {
                            setSelectedLang(newLang)
                        }}
                    />
                </span>
                :
                <TextareaAutosize
                    className='whitespace-pre-wrap w-full my-2 text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border'
                    aria-label="empty textarea"
                    placeholder="Empty"
                    minRows={6}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                />
                <div>
                    <Button
                        className="float-right"
                        disabled={isLoading}
                        variant="contained"
                        color="primary"
                        onClick={onButtonClick}
                        startIcon={isLoading ? <CircularProgress color='warning' size={'1em'} /> : (<AutoFixHighIcon/>)}
                    >
                        {t('form.convert_button')}
                    </Button>
                </div>
            </div>
            <div className="">
                <p>{t('form.tags_title')}:</p>
                <div
                    className='bg-slate-100 whitespace-pre-wrap w-full my-2 text-sm font-normal font-sans leading-normal p-3 rounded-xl shadow-lg shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border'
                >
                    {tags.map((tag, i) => 
                        tag[1] === 'SPACE' ? tag[0]:
                        <span
                            key={'tag-id-' + i}
                            data-processed={true}
                            style={{
                                backgroundColor: tagsColors.find(t => t.code === tag[1])?.color || 'hsla(0, 0%, 80%, 0.5)'
                            }}
                        >
                            {tag[0]}
                            <div className='tooltip text-center'>
                                <p>{tagsColors.find(t => t.code === tag[1])?.name}</p>
                                <span>▼</span>
                            </div>
                        </span>
                    )}
                </div>
                <div className="">
                {tagsColors.map(tagsColor =>
                    <Chip
                        key={`chip-${tagsColor.code}`}
                        className='m-1'
                        size="medium"
                        variant="filled"
                        style={{backgroundColor: tagsColor.color}}
                        label={t(`tags.${tagsColor.name}`)}
                    />
                )}
                </div>
            </div>
        </div>
        </>
    );
}
