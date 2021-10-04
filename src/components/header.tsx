import Link from "next/link"

import User from "@/components/user"
import Auth from "@/components/auth"

import { Header as HeaderDSFR } from "react-dsfr"

const Header = (): JSX.Element => (
  <HeaderDSFR
    baseline="Carnets de bord des produits @SocialGouv"
    service="Carnets"
  >
    <>
      <Link href="/stat">
        <a>Statistiques</a>
      </Link>
      <Auth />
      <User />
    </>
  </HeaderDSFR>
)

export default Header
