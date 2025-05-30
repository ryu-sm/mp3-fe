const kanaMap = {
  ｶﾞ: 'ガ',
  ｷﾞ: 'ギ',
  ｸﾞ: 'グ',
  ｹﾞ: 'ゲ',
  ｺﾞ: 'ゴ',
  ｻﾞ: 'ザ',
  ｼﾞ: 'ジ',
  ｽﾞ: 'ズ',
  ｾﾞ: 'ゼ',
  ｿﾞ: 'ゾ',
  ﾀﾞ: 'ダ',
  ﾁﾞ: 'ヂ',
  ﾂﾞ: 'ヅ',
  ﾃﾞ: 'デ',
  ﾄﾞ: 'ド',
  ﾊﾞ: 'バ',
  ﾋﾞ: 'ビ',
  ﾌﾞ: 'ブ',
  ﾍﾞ: 'ベ',
  ﾎﾞ: 'ボ',
  ﾊﾟ: 'パ',
  ﾋﾟ: 'ピ',
  ﾌﾟ: 'プ',
  ﾍﾟ: 'ペ',
  ﾎﾟ: 'ポ',
  ｳﾞ: 'ヴ',
  ﾜﾞ: 'ヷ',
  ｦﾞ: 'ヺ',
  ｱ: 'ア',
  ｲ: 'イ',
  ｳ: 'ウ',
  ｴ: 'エ',
  ｵ: 'オ',
  ｶ: 'カ',
  ｷ: 'キ',
  ｸ: 'ク',
  ｹ: 'ケ',
  ｺ: 'コ',
  ｻ: 'サ',
  ｼ: 'シ',
  ｽ: 'ス',
  ｾ: 'セ',
  ｿ: 'ソ',
  ﾀ: 'タ',
  ﾁ: 'チ',
  ﾂ: 'ツ',
  ﾃ: 'テ',
  ﾄ: 'ト',
  ﾅ: 'ナ',
  ﾆ: 'ニ',
  ﾇ: 'ヌ',
  ﾈ: 'ネ',
  ﾉ: 'ノ',
  ﾊ: 'ハ',
  ﾋ: 'ヒ',
  ﾌ: 'フ',
  ﾍ: 'ヘ',
  ﾎ: 'ホ',
  ﾏ: 'マ',
  ﾐ: 'ミ',
  ﾑ: 'ム',
  ﾒ: 'メ',
  ﾓ: 'モ',
  ﾔ: 'ヤ',
  ﾕ: 'ユ',
  ﾖ: 'ヨ',
  ﾗ: 'ラ',
  ﾘ: 'リ',
  ﾙ: 'ル',
  ﾚ: 'レ',
  ﾛ: 'ロ',
  ﾜ: 'ワ',
  ｦ: 'ヲ',
  ﾝ: 'ン',
  ｧ: 'ァ',
  ｨ: 'ィ',
  ｩ: 'ゥ',
  ｪ: 'ェ',
  ｫ: 'ォ',
  ｯ: 'ッ',
  ｬ: 'ャ',
  ｭ: 'ュ',
  ｮ: 'ョ',
  '｡': '。',
  '､': '、',
  ｰ: 'ー',
  '-': 'ー',
  '−': 'ー',
  '－': 'ー',
  '｢': '「',
  '｣': '」',
  '･': '・',
  0: '０',
  1: '１',
  2: '２',
  3: '３',
  4: '４',
  5: '５',
  6: '６',
  7: '７',
  8: '８',
  9: '９',
};

const zenHanMap = {
  ァ: 'ｧ',
  ア: 'ｱ',
  ィ: 'ｨ',
  イ: 'ｲ',
  ゥ: 'ｩ',
  ウ: 'ｳ',
  ェ: 'ｪ',
  エ: 'ｴ',
  ォ: 'ｫ',
  オ: 'ｵ',
  カ: 'ｶ',
  ガ: 'ｶﾞ',
  キ: 'ｷ',
  ギ: 'ｷﾞ',
  ク: 'ｸ',
  グ: 'ｸﾞ',
  ケ: 'ｹ',
  ゲ: 'ｹﾞ',
  コ: 'ｺ',
  ゴ: 'ｺﾞ',
  サ: 'ｻ',
  ザ: 'ｻﾞ',
  シ: 'ｼ',
  ジ: 'ｼﾞ',
  ス: 'ｽ',
  ズ: 'ｽﾞ',
  セ: 'ｾ',
  ゼ: 'ｾﾞ',
  ソ: 'ｿ',
  ゾ: 'ｿﾞ',
  タ: 'ﾀ',
  ダ: 'ﾀﾞ',
  チ: 'ﾁ',
  ヂ: 'ﾁﾞ',
  ッ: 'ｯ',
  ツ: 'ﾂ',
  ヅ: 'ﾂﾞ',
  テ: 'ﾃ',
  デ: 'ﾃﾞ',
  ト: 'ﾄ',
  ド: 'ﾄﾞ',
  ナ: 'ﾅ',
  ニ: 'ﾆ',
  ヌ: 'ﾇ',
  ネ: 'ﾈ',
  ノ: 'ﾉ',
  ハ: 'ﾊ',
  バ: 'ﾊﾞ',
  パ: 'ﾊﾟ',
  ヒ: 'ﾋ',
  ビ: 'ﾋﾞ',
  ピ: 'ﾋﾟ',
  フ: 'ﾌ',
  ブ: 'ﾌﾞ',
  プ: 'ﾌﾟ',
  ヘ: 'ﾍ',
  ベ: 'ﾍﾞ',
  ペ: 'ﾍﾟ',
  ホ: 'ﾎ',
  ボ: 'ﾎﾞ',
  ポ: 'ﾎﾟ',
  マ: 'ﾏ',
  ミ: 'ﾐ',
  ム: 'ﾑ',
  メ: 'ﾒ',
  モ: 'ﾓ',
  ャ: 'ｬ',
  ヤ: 'ﾔ',
  ュ: 'ｭ',
  ユ: 'ﾕ',
  ョ: 'ｮ',
  ヨ: 'ﾖ',
  ラ: 'ﾗ',
  リ: 'ﾘ',
  ル: 'ﾙ',
  レ: 'ﾚ',
  ロ: 'ﾛ',
  ヮ: '',
  ワ: 'ﾜ',
  ヲ: 'ｦ',
  ン: 'ﾝ',
  ヴ: 'ｳﾞ',
  '・': '･',
  '。': '.',
  ー: '-',
  '−': '-',
  '－': '-',
  '０': '0',
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
};

export const convertToHalfWidth = (string) => {
  let characters = getCharacters(string);
  let halfWidthString = '';
  characters.forEach((character) => {
    halfWidthString += mapToHankaku(character);
  });
  return halfWidthString;
};

export const convertToFullWidth = (string) => {
  let convertString = string;
  let fullWidthString = '';
  Object.entries(kanaMap).forEach(([key, replacement]) => {
    convertString = convertString.replaceAll(key, replacement);
  });
  let characters = getCharacters(convertString);
  characters.forEach((character) => {
    fullWidthString += mapToZenkaku(character);
  });

  return fullWidthString;
};

export const getCharacters = (string) => string.split('');

export const mapToHankaku = (character) => {
  if (typeof zenHanMap[character] === 'undefined') {
    return character;
  } else {
    return zenHanMap[character];
  }
};

export const mapToZenkaku = (character) => {
  if (typeof kanaMap[character] === 'undefined') {
    return character.replace(/[a-zA-Z]/g, (fullwidthChar) =>
      String.fromCharCode(fullwidthChar.charCodeAt(0) + 0xfee0)
    );
  } else {
    return kanaMap[character];
  }
};

export const normalizeString = (string) => {
  if (string === null) {
    return '';
  }
  string = string.replaceAll('　', '');
  string = string.replaceAll(' ', '');
  string = convertToHalfWidth(string);
  string = string.toLowerCase();
  return string;
};
