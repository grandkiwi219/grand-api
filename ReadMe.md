# grand-api

I made this module simple.   
간단하게 만들어봤습니다.

---

example)

```javascript
const Api = require("grand-api");
const Client = new Api("https://api.grandkiwi.kro.kr");

console.log(Client.url);
/*
  => 'https://api.grandkiwi.kro.kr'
 */


Client.setPath("/background.json"); 

console.log(Client.path);
/*
  => '/background.json'
 */


Client.setHeader("header");

console.log(Client.header);
/*
  => 'header'
 */


Client.setQuery(["key=key", "key2=key2"]);

console.log(Client.query);
/*
  => ['key=key', 'key2=key2']
 */


console.log(Client.result(true));
/*
  => {
       url: 'https://api.grandkiwi.kro.kr/background.json?key=key&key2=key2',
       header: 'header'
     }
 */


async function Run () {
    return console.log(await Client.data());
}

Run();
/*
  => json data
 */


console.log(Client);
/*
  => {
       url: 'https://api.grandkiwi.kro.kr',
       type: null,
       path: '/background.json',
       header: 'header',
       query: ['key=key', 'key2=key2'],
       version: '1.0.5'
     }
 */
```
