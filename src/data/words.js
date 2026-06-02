export const commonWords = [
  "the","be","to","of","and","a","in","that","have","it","for","not","on","with",
  "he","as","you","do","at","this","but","his","by","from","they","we","say","her",
  "she","or","an","will","my","one","all","would","there","their","what","so","up",
  "out","if","about","who","get","which","go","me","when","make","can","like","time",
  "no","just","him","know","take","people","into","year","your","good","some","could",
  "them","see","other","than","then","now","look","only","come","its","over","think",
  "also","back","after","use","two","how","our","work","first","well","way","even",
  "new","want","because","any","these","give","day","most","us","great","between",
  "need","large","often","hand","high","place","hold","turn","was","been","each",
  "during","without","again","those","form","following","showed","around","felt",
  "three","small","set","put","end","does","another","well","large","need","big",
  "down","more","very","when","much","name","same","tell","boy","follow","came",
  "long","began","show","here","play","man","read","off","had","been","help","made",
  "may","part","close","move","night","real","point","today","later","off","face",
  "head","body","leave","sure","ask","ever","next","keep","never","found","found",
  "children","side","feet","car","mile","night","walked","white","sea","began",
  "grow","took","river","four","carry","state","once","book","hear","stop","without",
  "second","later","miss","idea","body","music","color","stand","sun","question",
  "fish","area","mark","horse","birds","problem","complete","room","knew","since",
  "ever","piece","told","usually","didn","friends","easy","plants","light","voice",
  "power","town","fine","drive","led","buy","age","ago","ago","six","learn","run",
  "along","until","happen","appear","heart","road","almost","such","enough","soon",
  "across","though","door","free","matter","study","life","nothing","half","unit",
  "hold","center","line","feel","yet","earth","travel","mile","class","hard","force",
  "list","act","cut","star","fall","plan","figure","produce","chance","heat","cold",
  "ten","rest","simple","yes","subject","perhaps","test","answer","north","south",
  "west","east","step","open","strong","close","front","feel","sat","group","already",
  "cost","morning","farm","decided","land","watch","type","fast","feet","check","seem",
  "wait","paper","contain","warm","reach","store","past","happy","break","fly","lead",
  "grow","bank","return","mean","explain","build","language","shape","cost","pull",
  "draw","seem","deep","table","stay","wide","full","cut","change","print","raise",
  "prepare","family","lot","hundred","tree","fire","hot","rule","low","try","carry",
  "fill","push","west","call","office","spend","able","king","street","love","reason",
  "common","kind","cross","catch","sentence","mountain","wish","drop","single","plan"
]

export function generateWords(count = 60) {
  const words = []
  for (let i = 0; i < count; i++) {
    words.push(commonWords[Math.floor(Math.random() * commonWords.length)])
  }
  return words
}
