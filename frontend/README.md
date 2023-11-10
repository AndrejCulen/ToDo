Installation
-----------------
- `npm install`
- `npm run dev` will start server on `http://localhost:3000`
- press o in command line for opening a browser window


Provedené úpravy oproti poslední verzi
-----------------
Aplikace
-------
- přidán optimistic update pro veškeré mazání - okamžitá response v UI
- tmavé téma - přidány dvě palety do `styles/theme.tsx`, podle nastavení systému/browseru se nastavuje dark/light mode
- tlačítko "vše" lépe pojmenováno
- lepší odsazení na mobilu

Kód
----
- struktura kódu rozdělena do více komponent pro přehlednější strukturu
- `index.css` odstraněn. Přidány základní styly do `globalStyles.tsx`
- textInput a checkbox -  odstraněna mutation logika pro lepší znovupoužití komponenty
- `api.tsx` - vytaženo z components, funkce začínají malým písmenem, aby se nepletly s komponentami
- upravena lokální proměnná na `activeTab`
- redux - upravené využití pro `activeTab` a `selectedData` state. Je použit napříč více komponentami a už jen nenahrazuje local state
- pro SVG je nově použitý [`vite plugin`](https://www.npmjs.com/package/vite-plugin-svgr) a svg jsou použity jako `React component`

Shrnutí
---
Příště bych v kombinaci s Reduxem raději použil RTK Query.
Redux jsem se snažil demonstrovat na výše uvedených statech. V ostatních případech jsem zůstal u local states. Po přečtení Redux dokumentace jsem uznal za vhodné state inputů a editace konkrétní komponenty v listu managovat takto.
