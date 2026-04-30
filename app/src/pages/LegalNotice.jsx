import LegalLayout from '../components/ui/LegalLayout';

export default function LegalNotice() {
  return (
    <LegalLayout title="Avís legal" lastUpdate="27 d'abril de 2025">
      <h2>1. Dades identificatives</h2>
      <p>
        En compliment del que disposa la Llei 34/2002, de Serveis de la Societat de la Informació
        i del Comerç Electrònic (LSSI-CE), us informem que el titular d'aquest lloc web és:
      </p>
      <ul>
        <li><strong>Denominació social:</strong> iPediatria SLP</li>
        <li><strong>CIF:</strong> B55295737</li>
        <li><strong>Adreça:</strong> Plaça de Catalunya, 5 baixos, 17200 Palafrugell (Girona)</li>
        <li><strong>Correu electrònic:</strong> info@ipediatria.cat</li>
        <li><strong>Telèfon:</strong> +34 605 166 166</li>
      </ul>

      <h2>2. Objecte</h2>
      <p>
        Aquest lloc web té com a objectiu informar sobre els serveis mèdics oferts per iPediatria
        SLP, incloent pediatria, medicina familiar, visites a domicili i consultori online. La
        informació publicada té caràcter divulgatiu i en cap cas substitueix la consulta professional.
      </p>

      <h2>3. Condicions d'ús</h2>
      <p>
        L'accés i ús d'aquest lloc web atribueix la condició d'usuari i implica l'acceptació plena
        de totes les condicions incloses en aquest avís legal. L'usuari es compromet a fer un ús
        adequat del lloc web i a no utilitzar-lo per a activitats il·lícites.
      </p>

      <h2>4. Propietat intel·lectual</h2>
      <p>
        Tots els continguts del lloc web (textos, imatges, logos, dissenys gràfics, codi font, etc.)
        són propietat d'iPediatria SLP o dels seus llicenciants i es troben protegits per la
        normativa vigent en matèria de propietat intel·lectual i industrial.
      </p>

      <h2>5. Responsabilitat</h2>
      <p>
        iPediatria SLP no es responsabilitza dels danys que puguin derivar-se d'errors en l'accés,
        de la qualitat de la connexió o del programari de l'usuari. La informació mèdica oferta no
        substitueix una consulta professional individualitzada.
      </p>

      <h2>6. Llei aplicable i jurisdicció</h2>
      <p>
        Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia
        derivada de l'ús d'aquest lloc web, les parts se sotmeten als jutjats i tribunals de
        Girona.
      </p>

      <h2>7. Contacte</h2>
      <p>
        Per a qualsevol consulta relacionada amb aquest avís legal, podeu contactar amb nosaltres
        a través de <a href="mailto:info@ipediatria.cat">info@ipediatria.cat</a>.
      </p>
    </LegalLayout>
  );
}
