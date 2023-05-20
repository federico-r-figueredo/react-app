import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/apiClient";

function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const { request, cancel } = userService.getAll<User[]>();
        request
            .then((res) => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setIsLoading(false);
            });

        return () => cancel();
    }, []);

    return { users, error, isLoading, setUsers, setError };
}

export default useUsers;
