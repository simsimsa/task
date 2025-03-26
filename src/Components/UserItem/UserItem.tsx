import styles from "./UserItem.module.css";

interface UserItemProps {
    userId: number;
    onClick: () => void;
}

function UserItem({ userId, onClick }: UserItemProps) {
    return (
        <div className={styles["userItem"]} onClick={onClick}>
            <img src="/userIcon.svg" alt="" width={25} height={25} />
            <div className={styles["userItemBody"]}>Пользователь {userId}</div>
        </div>
    );
}

export default UserItem;
