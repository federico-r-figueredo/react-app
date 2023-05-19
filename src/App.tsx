import "bootstrap/dist/css/bootstrap.css";
import Container from "./components/Container/Container";
import { useEffect, useState } from "react";
import { CanceledError } from "./services/apiClient";
import userService, { User } from "./services/userService";

function App() {
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

    function addUser(): void {
        const originalUsers = [...users];
        const newUser = { id: 0, name: "fedex" };
        setUsers([newUser, ...users]);

        userService
            .create<User>(newUser)
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch((err) => {
                setError(err.message);
                setUsers(originalUsers);
            });
    }

    function updateUser(user: User): void {
        const originalUsers = [...users];
        const updatedUser = { ...user, name: user.name + "!" };
        setUsers(users.map((x) => (x.id === user.id ? updatedUser : x)));

        userService.update<User>(updatedUser).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    }

    function deleteUser(user: User): void {
        const originalUsers = [...users];
        setUsers(users.filter((x) => x.id !== user.id));

        userService.delete(user.id).catch((err) => {
            setError(err.message);
            setUsers(originalUsers);
        });
    }

    return (
        <Container>
            <div className="w-50 mx-auto">
                {error && <p className="text-danger">{error}</p>}
                {isLoading && <div className="spinner-border"></div>}
                <button
                    className="btn btn-outline-primary mb-3"
                    onClick={addUser}
                >
                    Add User
                </button>
                <ul className="list-group">
                    {users.map((user) => (
                        <li
                            className="list-group-item d-flex justify-content-between"
                            key={user.id}
                        >
                            {user.name}
                            <div>
                                <button
                                    className="btn btn-outline-secondary mx-2"
                                    onClick={() => updateUser(user)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => deleteUser(user)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}

export default App;
