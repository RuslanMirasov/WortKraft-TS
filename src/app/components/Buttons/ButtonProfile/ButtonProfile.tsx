import Link from "next/link";
import { Avatar } from "../../../components";
import css from "./ButtonProfile.module.scss";

const ButtonProfile = () => {
  const profile = {
    name: "Mirasov Ruslan",
    email: "info@mirasov.dev",
    image:
      "https://firebasestorage.googleapis.com/v0/b/wortkraft-c3080.appspot.com/o/avatars%2F671cfa930e2cdead6122d0a9.jpg?alt=media&token=87772568-6b4f-4fbd-bb66-4759cb3606f3",
  };

  const { name, email, image } = profile;
  return (
    <Link href="./profile" className={css.ButtonProfile}>
      <Avatar email={email} name={name} image={image} />
      <p>
        <span>Hallo</span>
        <span>{name}</span>
      </p>
    </Link>
  );
};

export default ButtonProfile;
