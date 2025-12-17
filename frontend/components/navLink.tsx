import Link from "next/link";
import styles from "../styles/navBar.module.css";

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink = ({ href, text }: NavLinkProps) => {
  return (
    <Link href={href} className={styles.navLink}>
      {text}
    </Link>
  );
};

export default NavLink;
