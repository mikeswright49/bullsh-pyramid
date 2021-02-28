import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { GameContext } from './game-provider';
import { TRANSLATIONS } from '../translations/translations';

const INTERPOLATE_REGEX = /{{.*?}}/gi;
const INTERPOLATE_PROPERTY_REGEX = /{{(.*)?}}/i;
const INTERPOLATE_CAPTURE_COUNT = 2;

export type Translations = {
    translations: { [key: string]: string };
    translate: (key: string, variables?: { [key: string]: string | number | boolean }) => string;
};

export const TranslationContext = React.createContext<Translations>({
    translate: (a) => a,
    translations: {},
});

export function TranslationProvider(props: React.PropsWithChildren<unknown>) {
    const { language } = useContext(GameContext);
    const [translations, setTranslations] = useState({});
    useEffect(() => {
        setTranslations(TRANSLATIONS[language || 'en']);
    }, [language]);

    /**
     * Returns the nested property value (userMetadata.giftcard.bacon)
     * @param source property value
     */
    function getProperty(source: string[], parent: unknown): string {
        if (!source || !parent) {
            return;
        }
        if (source.length > 1) {
            const property: string = source.shift();
            return this.getProperty(source, parent[property.trim()]);
        }
        return parent[source[0].trim()];
    }

    /**
     * Evaluates the {{}} interpolated strings
     * @param source Source content to be parsed
     * @param data Data object to read values off of
     */
    function evaluateInterpolate(
        source: string,
        data: { [key: string]: string | number | boolean }
    ): string {
        if (!data) {
            return source;
        }

        const matches = source.match(INTERPOLATE_REGEX) || [];
        matches.forEach((match: string) => {
            const properties = INTERPOLATE_PROPERTY_REGEX.exec(match);
            if (properties && properties.length === INTERPOLATE_CAPTURE_COUNT) {
                const property = getProperty(properties[1].split('.'), data);
                source = source.replace(match, property || '');
            }
        });
        return source;
    }

    function translate(key: string, variables?: { [key: string]: string | number | boolean }) {
        if (!translations) {
            return '';
        }
        return evaluateInterpolate(translations[key], variables);
    }

    return (
        <TranslationContext.Provider value={{ translations, translate }}>
            {props.children}
        </TranslationContext.Provider>
    );
}
