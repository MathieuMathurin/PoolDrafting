import { Pipe, PipeTransform } from '@angular/core';

export class AccentReplacer {
    pattern: RegExp;
    representation: string;
}

let replacers: AccentReplacer[] = [
    { pattern: /[\300-\306]/g, representation: 'A' },
    { pattern: /[\340-\346]/g, representation: 'a' },
    { pattern: /[\310-\313]/g, representation: 'E' },
    { pattern: /[\350-\353]/g, representation: 'e' },
    { pattern: /[\314-\317]/g, representation: 'I' },
    { pattern: /[\354-\357]/g, representation: 'i' },
    { pattern: /[\322-\330]/g, representation: 'O' },
    { pattern: /[\362-\370]/g, representation: 'o' },
    { pattern: /[\331-\334]/g, representation: 'U' },
    { pattern: /[\371-\374]/g, representation: 'u' },
    { pattern: /[\321]/g, representation: 'N' },
    { pattern: /[\361]/g, representation: 'n' },
    { pattern: /[\307]/g, representation: 'C' },
    { pattern: /[\347]/g, representation: 'c' },
];

export function replaceAccents(input: string): string {
    if (input) {
        replacers.forEach(replacer => {
            input = input.replace(replacer.pattern, replacer.representation);
        });
    }

    return input;
}

@Pipe({ name: 'replaceAccents' })
export class ReplaceAccentsPipe implements PipeTransform {
    transform(term: string): string {
        return replaceAccents(term);
    }
}