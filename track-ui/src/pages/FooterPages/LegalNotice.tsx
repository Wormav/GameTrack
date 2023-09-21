import React from 'react';
import StyledContainer from './footerPages.styles';

export default function LegalNotice() {
  return (
    <StyledContainer id="container">
      <h1>Mentions légales</h1>
      <h2>Auteurs du site :</h2>
      <p>Site réalisé par Ziakor et Wormav</p>
      <h2>Contact :</h2>
      <a href="mailto:mail@mail.com">mail@mail.com</a>
      <h2>Hébergement :</h2>
      <ul>
        <li>Raison sociale : OVH SAS</li>
        <li>Adresse : 2 rue Kellermann - 59100 Roubaix - France</li>
        <li>Immatriculation : 42476141900045 au RCS de Lille Métropole</li>
        <li>N° TVA Intracommunautaire : FR22424761419</li>
        <li>Capital : 10069020 €</li>
      </ul>
      <p>
        OVH SAS est une filiale de la société OVH Groupe
        SAS, société immatriculée au RCS de Lille sous le numéro 537 407 926.
      </p>
    </StyledContainer>
  );
}
