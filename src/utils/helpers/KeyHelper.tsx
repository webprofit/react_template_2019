export class KeyHelper {

    genKey(args: string[]): string {

        function encode(s: string): string {
            const re = /\//gi;

            return s ? s.replace('>', '')
                .replace('<', '')
                .replace('=', '')
                .replace('!', '')
                .replace('.', '')
                .replace(re, '_')
                .replace(' ', '')
                :'_';
        }

        let res = '';

        args.forEach(x => x = encode(x));
        res = args.join('_');

        return res;
    }
}