import Link from "next/link"

import Logo from "@/components/common/logo"

const Footer = () => (
  <footer>
    <div className="flex container mx-auto pb-5">
      <div className="flex-1">
        <Logo big />
      </div>
      <div className="info">
        <p>
          <strong>Carnets</strong> est une application permettant de publier et
          de mettre à jour les supports de présentation du standup hebdomadaire
          de la Fabrique Numérique.
        </p>
        <p>
          Pour en savoir plus sur l&apos;utilisation de <strong>Carnets</strong>
          , visitez le{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SocialGouv/www/wiki/Inscrire-son-%C3%A9quipe-au-standup"
          >
            wiki
          </a>
          .
        </p>
      </div>
    </div>
    <div className="links">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.fabrique.social.gouv.fr/"
      >
        La Fabrique Numérique
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://standup.fabrique.social.gouv.fr/"
      >
        Standup
      </a>
      <Link href="/legal">
        <a>Mentions légales</a>
      </Link>
      <a href="#">Paramètres d&apos;affichage</a>
    </div>
  </footer>
)

export default Footer
