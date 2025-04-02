# Developer Guide & Guidelines
Acest document reprezinta un ghid pentru developeri in ce inseamna organizarea proiectului, organizarea si stilul codului. Acest document, de asemenea, serveste si ca un mic ghid pentru incepatori.
## (1) General Guidelines 

 1. Nu instalati in proiect librarii de componente UI.
 2. Nu editati manual in /package.json. 
 3. Respectati stilul de cod, descris la (3).
 4. Creati fisiere/foldere in folderele descrise la (2.1).
 5. Editati fisierele descrise la (2.1).
 6. Toate fisierele CSS, se salveaza ca nume.module.css. Se folosesc precum e descris la (2.5).
 7. Fontul global va fi Inter. Nu adaugati fonturi care nu sunt in design.

## (2) Structura Proiectului
### (2.1) Foldere si fisiere de interes pentru dezvoltator
Aceastea sunt/se afla in: 
 - /public
	 - contine: imagini, vectori, orice resurse ce se vor incarca in pagina
 - /src
	 - /src/app - tot codul aferent paginilor frontend
	 - /src/lib - tot codul refolosibil - impartit intre pagini
		 - /src/lib/components - componentele impartite intre pagini
		 - /src/lib/fonts - fiecare font se instantiaza aici si se importeaza in pagini/componente (mai mult mai jos)
 - /next.config.mjs - fisier configuratie next.js

### (2.2) Structura folderului /src/app
Toate folderele reprezinta cate un route accesibil din browser. Iar, toate paginile accesibile sunt reprezentate printr-un fisier page.js in folderul lui.
Exemplu:
 - fisierul /src/app/auth/login/page.js este responsabil pentru pagina in browser /auth/login/
 - fisierul /src/app/page.js este responsabil pentru pagina / (adica exemplu.com/)

Fisierele numite layout.js dau layout-ul implicit in care se plaseaza continutul page.js din acelasi folder. 
Exemplu:

    // in: /src/app/layout.js
    function RootLayout(props) {
	    return (
		    <div>
			    <div>rootLayout</div>
			    {props.children}
			</div>);
	}
	//in: /src/app/page.js 
	function RootPage(props) {
		return <div>cartofi prajiti</div>
	}
Codul acesta va afisa la pagina / continutul:

    <div>
		<div>rootLayout</div>
		<div>cartofi prajiti</div>
	</div>
! Layout-urile se pun unul peste altul. Ex: Daca am /layout.js si /auth/layout.js Se va pune in pagina, /layout.js completat cu /auth/layout.js completat apoi cu /auth/page.js 

Fisierele css aferente paginilor se pun in acelasi folder cu extensia .module.css. 
### (2.3) Folderul /src/lib
Tot codul ce este impartit intre pagini se stocheaza aici.
! Codul se muta in /lib atunci cand se refoloseste pentru prima oara, pana atunci se va stoca in page.js sau folderul pagini.
Toate fonturile se instantiaza in /lib/fonts/numefont.js.
Componentele refolosite se stocheaza in /lib/components/nume/nume.js. Iar fisierele css in acelasi folder.
### (2.4) Configuratia next.js
 Next.js se configureaza in /next.config.mjs. Modificati aici doar ce aveti nevoie, nu puneti optiuni redundante.
### (2.5) Fisiere CSS
Toate fisierele css, vor fi stocate ca nume.module.css. Si se folosesc astfel:

    import styles from 'path/to/style.module.css'
    function Page() {
	    return (
		    <div className={styles.numeClasa}>
			    text
			</div>
		);
	}
! Atentie in fisierele .module.css se lucreaza doar pe clase (nu nume eticheta sau id)

    div { ... } /* gresit */
    span { ... } /* gresit */
    .numeClasa { ... } /* corect */
    .someClass > div { ... } /* corect */
    .someClass:not(span) { ... } /* corect */

## (3) Coding style & nomenclature

### (3.1) Nomenclatura
Toate numele de variabile, functii, clase trebuie sa fie cu sens.

Toate paginile/componentele se vor numi in stil PascalCase - prima litera din fiecare cuvant este uppercase. (Ex: HomePage, LoginButton, NavigationPanel)

Toate clasele CSS se vor numi in stil camelCase - prima litera mica, iar apoi prima litera din fiecare cuvant este uppercase. (Ex: layoutContainer, buttonWrapper, navbar, optionsPanel, header, headerTitle, cardDescription). 

### (3.2) Stil pagina vs stil componenta.
Pentru functiile care exporteaza pagini vom folosi definitia intuitiva:

    function LoginPage() { ... }
    function SomePage(props) { ... }
 Pentru functiile care definesc componente se va folosi stilul arrow function:

    const Sidebar = () => { ... }
    const LoginButon = (props) => { ... }

 (Obs) In loc de props puteti pune si explicit ( { somePropertyINeed }), oriunde.
		    
### (3.3) Stil intern pentru clase CSS
Desi nu conteaza prea mult, incercati sa ordonati regulile din clasele CSS.
Ordinea pe care o recomand:

    .someClass {
    /* mai intai, reguli de marime si ordine */
	    width: 10px;
	    max-height: 10px; 
	    flex-grow: 1; 
	    grid-area: ;...
	
	/* reguli pozitionare */
		margin, padding, ...
	/* reguli display */
		display, justify-content, align-items, flex-flow, grid-te...
	/* reguli border */
		border, border-radius, box-shadow
	/* reguli text */
		font-size, color, text-decoration ...
		...
	}
	
### (3.4) ! Folositi marimile, culorile, si clasele din app/globals.css
In fisierul globals.css sunt definite mai multe variabile si clase pentru a fi folosite in toate paginile.
Cand le folositi, importati fisierul direct.

    import '@/app/globals.css'
La momentul scrierii variabilele definite sunt:

    --background: #ffffff;
    --foreground: #09090B;
    --border-gray: #e4e4e7;
    --text-gray: #09090B;
    --font-size-lg: 38px;
    --font-size-md: 24px;
    --font-size-sm: 16px;
    --font-size-xs: 14px;
		
Mai sunt definite si cateva clase, intrati in fisier si descoperiti.
Exemplu folosire variabila:

    background-color: var(--foreground);
    font-size: var(--font-size-sm);

## (4) Folosirea fontului.
Pentru a folosi fontul Inter, importati variantele necesare explicit.

    import  { InterHeading, InterLight }  from  '@/lib/fonts/Inter'
    
    import styles from './TestComponent.module.css'
    
    const TestComponent = () => {
    
	    return <div className={styles.container}>
		    <div className={styles.testHeading + ' ' + InterHeading.className}>
			    This is the heavy variant of Inter.
		    </div>
		    <div className={styles.InterLight}>
			    This is the lightest variant in the Design.
		    </div>
	    </div>
    }
