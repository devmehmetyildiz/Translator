import validator from './Validator'

export default function PrintBodyReplacer(body, meta, columns, subcolumns) {

    Object.keys(meta).forEach(firstLayer => {
        if (meta[firstLayer] && Array.isArray(meta[firstLayer])) {
            if (body.includes(`{{${firstLayer}-`)) {
                const regexString = `{{${firstLayer}-(.*?)}}`;
                const matches = body.replace(/[\r\n]/gm, '').match(new RegExp(regexString, 'g')) || [];
                if (matches.length > 0) {
                    let oldlayer = matches[0]
                    let layer = matches[0].replace(`{{${firstLayer}-`, '').replace('}}', '')
                    let newlayer = ''
                    for (const job of meta[firstLayer]) {
                        let text = ''
                        Object.keys(job).forEach(key => {
                            text = replaceAll(layer, `{${key}}`, job[key])
                        })
                    }
                    body = replaceAll(body.replace(/[\r\n]/gm, ''), oldlayer, newlayer)
                }
            }
        }
        else if (meta[firstLayer] && typeof meta[firstLayer] === 'object') {
            Object.keys(meta[firstLayer]).forEach(secondLayer => {
                if (meta[firstLayer][secondLayer] && typeof meta[firstLayer][secondLayer] === 'object') {
                    Object.keys(meta[firstLayer][secondLayer]).forEach(thirdLayer => {
                        if (meta[firstLayer][secondLayer][thirdLayer] && typeof meta[firstLayer][secondLayer][thirdLayer] === 'object') {
                            Object.keys(meta[firstLayer][secondLayer][thirdLayer]).forEach(fourthLayer => {
                                if (body.includes(`{{${firstLayer}.${secondLayer}.${thirdLayer}.${fourthLayer}}}`)) { body = replaceAll(body, `{{${firstLayer}.${secondLayer}.${thirdLayer}.${fourthLayer}}}`, meta[firstLayer][secondLayer][thirdLayer][fourthLayer]) }
                            })
                        } else {
                            if (body.includes(`{{${firstLayer}.${secondLayer}.${thirdLayer}}}`)) { body = replaceAll(body, `{{${firstLayer}.${secondLayer}.${thirdLayer}}}`, meta[firstLayer][secondLayer][thirdLayer]) }
                        }
                    })
                } else {
                    if (body.includes(`{{${firstLayer}.${secondLayer}}}`)) { body = replaceAll(body, `{{${firstLayer}.${secondLayer}}}`, meta[firstLayer][secondLayer]) }
                }
            })
        }
        else {
            if (body.includes(`{{${firstLayer}}}`)) {
                body = replaceAll(body, `{{${firstLayer}}}`, validator.isUUID(meta[firstLayer]) ? (columns || []).find(u => u.accessor === firstLayer).Cell({ value: meta[firstLayer] }) : meta[firstLayer])
            }
        }
    });
    return body;
}

function replaceAll(str, find, replace) {
    let res = str.split(find).join(replace ? replace : '')
    return res
}

function escapeStringRegexp(str) {
    return str.replace("\n", '');
}

