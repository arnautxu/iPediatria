import LegalLayout from '../components/ui/LegalLayout';

export default function Cookies() {
  return (
    <LegalLayout title="Política de cookies" lastUpdate="27 d'abril de 2025">
      <h2>1. Què són les cookies?</h2>
      <p>
        Les cookies són petits fitxers de text que un lloc web instal·la al vostre navegador per
        recordar informació sobre la vostra visita. Permeten que el lloc funcioni correctament,
        recordin preferències i ofereixin una experiència més personalitzada.
      </p>

      <h2>2. Quines cookies utilitzem?</h2>
      <p>
        En aquest lloc web utilitzem cookies pròpies (estrictament necessàries) i de tercers
        (proporcionades per Adobe Fonts per servir la tipografia corporativa).
      </p>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Proveïdor</th>
            <th>Finalitat</th>
            <th>Durada</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ipediatria-lang</td>
            <td>iPediatria (pròpia)</td>
            <td>Recordar l'idioma seleccionat</td>
            <td>Persistent</td>
          </tr>
          <tr>
            <td>ipediatria-cookies-consent</td>
            <td>iPediatria (pròpia)</td>
            <td>Recordar el consentiment de cookies</td>
            <td>Persistent</td>
          </tr>
          <tr>
            <td>typekit fonts</td>
            <td>Adobe Fonts (tercer)</td>
            <td>Carregar la tipografia Myriad Pro</td>
            <td>Sessió</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Tipus de cookies</h2>
      <h3>Cookies estrictament necessàries</h3>
      <p>
        Imprescindibles perquè el lloc funcioni correctament. No requereixen consentiment.
        Inclouen el recordatori de l'idioma i del propi consentiment.
      </p>

      <h3>Cookies de tercers (Adobe Fonts)</h3>
      <p>
        Adobe Fonts (Typekit) utilitza cookies pròpies per servir la tipografia. No tracten dades
        personals identificables ni s'usen amb finalitats publicitàries.
      </p>

      <h2>4. Com gestionar les cookies</h2>
      <p>
        Quan visiteu el nostre lloc per primera vegada, us oferim la possibilitat d'acceptar
        totes les cookies o limitar-les a les estrictament necessàries. Podeu canviar la vostra
        decisió en qualsevol moment esborrant la cookie <code>ipediatria-cookies-consent</code> al
        vostre navegador, o utilitzant les opcions del navegador per gestionar les cookies:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/ca/kb/galetes-informacio-llocs-web-emmagatzemen-ordinador" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/ca-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/ca-es/microsoft-edge/eliminar-galetes-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>5. Actualitzacions</h2>
      <p>
        Aquesta política pot actualitzar-se per adaptar-la a canvis legislatius o tecnològics.
        L'última actualització consta a la part superior d'aquest document.
      </p>

      <h2>6. Contacte</h2>
      <p>
        Per a qualsevol consulta sobre la política de cookies, podeu contactar a{' '}
        <a href="mailto:info@ipediatria.cat">info@ipediatria.cat</a>.
      </p>
    </LegalLayout>
  );
}
