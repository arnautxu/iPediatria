import LegalLayout from '../components/ui/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout title="Política de privacitat" lastUpdate="27 d'abril de 2025">
      <h2>1. Responsable del tractament</h2>
      <p>
        El responsable del tractament de les vostres dades personals és <strong>iPediatria SLP</strong>
        {' '}(CIF B55295737), amb domicili a Plaça de Catalunya, 5 baixos, 17200 Palafrugell.
        Podeu contactar amb nosaltres a <a href="mailto:info@ipediatria.cat">info@ipediatria.cat</a>.
      </p>

      <h2>2. Finalitats del tractament</h2>
      <p>Les vostres dades es tracten per a les següents finalitats:</p>
      <ul>
        <li>Atendre consultes rebudes a través del formulari de contacte.</li>
        <li>Gestionar la prestació de serveis mèdics sol·licitats.</li>
        <li>Mantenir la història clínica dels pacients (en el cas dels pacients).</li>
        <li>Enviar comunicacions informatives quan s'hagi donat consentiment exprés.</li>
      </ul>

      <h2>3. Base legal</h2>
      <p>
        El tractament es basa en el consentiment de l'usuari, en l'execució del contracte de
        prestació de serveis mèdics i en el compliment d'obligacions legals (sobretot en matèria
        sanitària).
      </p>

      <h2>4. Conservació de les dades</h2>
      <p>
        Les dades es conserven mentre duri la relació professional i, posteriorment, durant els
        terminis legals exigits per la normativa sanitària i comptable. Les dades de contacte
        s'eliminen quan deixen de ser necessàries.
      </p>

      <h2>5. Destinataris</h2>
      <p>
        Les dades no es cedeixen a tercers, llevat d'obligació legal. Poden tenir accés, com a
        encarregats del tractament, els proveïdors tecnològics que ens donen suport (allotjament,
        plataforma de consultori online), sempre amb les garanties adequades.
      </p>

      <h2>6. Drets de les persones interessades</h2>
      <p>D'acord amb el RGPD, podeu exercir els següents drets:</p>
      <ul>
        <li><strong>Accés:</strong> sol·licitar informació sobre les dades que tractem.</li>
        <li><strong>Rectificació:</strong> corregir dades inexactes.</li>
        <li><strong>Supressió:</strong> sol·licitar l'eliminació de les dades.</li>
        <li><strong>Limitació:</strong> limitar el tractament en determinades circumstàncies.</li>
        <li><strong>Portabilitat:</strong> rebre les dades en format estructurat.</li>
        <li><strong>Oposició:</strong> oposar-vos al tractament basat en interès legítim.</li>
      </ul>
      <p>
        Per a exercir aquests drets, podeu enviar-nos un correu a{' '}
        <a href="mailto:info@ipediatria.cat">info@ipediatria.cat</a>
        {' '}amb una còpia del vostre DNI. També teniu dret a presentar una reclamació davant
        l'<a href="https://apdcat.gencat.cat" target="_blank" rel="noopener noreferrer">Autoritat
        Catalana de Protecció de Dades</a>.
      </p>

      <h2>7. Mesures de seguretat</h2>
      <p>
        Apliquem les mesures tècniques i organitzatives apropiades per garantir la confidencialitat,
        integritat i disponibilitat de les dades, d'acord amb el risc i el tipus de dada tractada.
      </p>
    </LegalLayout>
  );
}
