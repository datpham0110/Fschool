import { resEN } from './en'
import { resVI } from './vi'
import { appConfig } from '../../Config';

//-- Định nghĩa các ngôn ngữ 
const langueSuport =
{
    'en': resEN,
    'vi': resVI
};


const RootLang = {
    lang: resEN,
    _keys: 'en', //not delete
};

function changeLangue(langue) {
    if (langueSuport[langue] == undefined)
        langue = appConfig.defaultLang;
    RootLang.lang = langueSuport[langue];
    RootLang._keys = langue;
}

export { RootLang, changeLangue };




