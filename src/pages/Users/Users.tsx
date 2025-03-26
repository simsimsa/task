import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import styles from "./Users.module.css";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../../store/store";
import { UsersService } from "../../userServices";
import UserItem from "../../Components/UserItem/UserItem";

const ITEM_SIZE = 80;

export const Users: React.FC = () => {
    const [userIds, setUserIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                const ids = await UsersService.getUserIds();
                if (ids.length === 0) {
                    setError("Файл с пользователями не загружен или пуст");
                }
                setUserIds(ids);
            } catch (err) {
                setError("Ошибка загрузки данных пользователей");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleUserClick = async (userId: number) => {
        const user = await UsersService.getUserById(userId);
        if (user) {
            dispatch(setCurrentUser(user));
        }
    };

    const Row: React.FC<{ index: number; style: React.CSSProperties }> = ({
        index,
        style,
    }) => (
        <div style={style}>
            <UserItem
                userId={userIds[index]}
                onClick={() => handleUserClick(userIds[index])}
            />
        </div>
    );

    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.users}>
            <div className={styles.usersHeader}>
                Список пользователей ({userIds.length.toLocaleString()})
            </div>
            <div className={styles.usersContent}>
                {userIds.length > 0 ? (
                    <List
                        height={600}
                        itemCount={userIds.length}
                        itemSize={ITEM_SIZE}
                        width="100%"
                    >
                        {Row}
                    </List>
                ) : (
                    <div className={styles.empty}>
                        Нет данных для отображения
                    </div>
                )}
            </div>
        </div>
    );
};
