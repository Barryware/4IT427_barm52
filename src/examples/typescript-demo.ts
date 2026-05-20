// ============================================================
// PROC POUZIVAME TYPESCRIPT MISTO JAVASCRIPTU
// Demo: chyby ktere JS nevidi, ale TS okamzite chyti
// ============================================================

// ----------------------------------------------------------------
// 1) TYPE MISMATCH — JS by tise spojil cisla jako stringy
// ----------------------------------------------------------------
function pricetiCisla(a: number, b: number): number {
  return a + b
}

// TS chyba: Argument of type 'string' is not assignable to parameter of type 'number'
pricetiCisla(5, '3')

// V JS by se to "podarilo" — vratilo by "53" jako string. Tichy bug.


// ----------------------------------------------------------------
// 2) PROPERTY TYPO — JS by vratil undefined, TS to podtrhne
// ----------------------------------------------------------------
interface Uzivatel {
  jmeno: string
  vek: number
  email: string
}

const martin: Uzivatel = {
  jmeno: 'Martin',
  vek: 25,
  email: 'martin@vse.cz',
}

// TS chyba: Property 'jemno' does not exist on type 'Uzivatel'.
// Did you mean 'jmeno'?
console.log(martin.jemno)

// V JS by to vytisklo "undefined" a chyba by se objevila pozdeji,
// treba pri praci s tou hodnotou ("Cannot read property of undefined").


// ----------------------------------------------------------------
// 3) NULL SAFETY — TS te donuti osetrit pripad ze hodnota chybi
// ----------------------------------------------------------------
function pozdrav(uzivatel?: Uzivatel): string {
  // TS chyba: 'uzivatel' is possibly 'undefined'.
  return 'Ahoj ' + uzivatel.jmeno
}

// V JS by to spadlo az za behu: TypeError: Cannot read properties of undefined


// ----------------------------------------------------------------
// 4) BEZPECNY REFACTORING — premenovani pole v jednom miste
//    a TS ti hned ukaze vsechna mista co je treba upravit
// ----------------------------------------------------------------
// Kdyz zmenis 'jmeno' na 'celeJmeno' v interface Uzivatel nahore,
// TS okamzite podtrhne vsechny radky v souboru (i v jinych souborech)
// kde se 'jmeno' jeste pouziva. V JS bys hledal text vyhledavanim
// a riskoval, ze neco prehlednes.
