import styles from "./ProfilePage.module.scss";
import {UpdateNameForm} from "@/features/update-name";
import {UpdatePasswordForm} from "@/features/update-password";
import {useUser} from "@/entities/user";
import {Text} from "@/shared/ui";

export const ProfilePage = () => {
    const {user} = useUser();

    return (
        <div className={styles.page}>
            <Text as="h1" size="4xl" weight="bold" className={styles.title}>
                Личный кабинет
            </Text>

            <Text size="base" className={styles.roleInfo}>
                Роль: {user?.is_admin ? "Администратор" : "Пользователь"}
            </Text>

            <div className={styles.forms}>
                <UpdateNameForm/>
                <UpdatePasswordForm/>
            </div>
        </div>
    );
};