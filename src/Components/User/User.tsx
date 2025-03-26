import { useState, KeyboardEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateUser } from "../../store/store";
import styles from "./User.module.css";

export default function User() {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const [formData, setFormData] = useState({
        userId: 0,
        name: "",
        department: "",
        company: "",
        jobTitle: "",
    });

    // Обновляем форму при изменении currentUser
    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser);
        }
    }, [currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(updateUser(formData));
        }
    };

    if (!currentUser) {
        return <div className={styles.empty}>Пользователь не выбран</div>;
    }

    return (
        <form className={styles.user}>
            <div className={styles.name}>
                <input
                    type="text"
                    name="name"
                    placeholder="не указано"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={styles.nameInput}
                />
            </div>
            <div className={styles.userInfo}>
                <img src="/avatarUser.svg" alt="avatar" />
                <div>
                    <div className={styles.userInfoForm}>
                        <label htmlFor="department" className={styles.label}>
                            Должность
                        </label>
                        <input
                            type="text"
                            name="department"
                            placeholder="не указано"
                            autoComplete="off"
                            value={formData.department}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.userInfoForm}>
                        <label htmlFor="jobTitle" className={styles.label}>
                            Отдел
                        </label>
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="не указано"
                            autoComplete="off"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.userInfoForm}>
                        <label htmlFor="company" className={styles.label}>
                            Компания
                        </label>
                        <input
                            type="text"
                            name="company"
                            placeholder="не указано"
                            autoComplete="off"
                            value={formData.company}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
