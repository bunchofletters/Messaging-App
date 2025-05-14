

function OverViewTextRoom() {
    const createAccount = () => {
        const makeTempaccount = async () => {
            try{
                const response = await fetch('http://localhost:8080/account/create_account', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'FE_XP': 'react-frontend', 
                    },
                    body: JSON.stringify({
                        username: "test",
                        password: "test"
                    })
                });
                const message = await response.text()
                console.log(message);
            } catch (err){
                console.error(err);
            }
        }
        makeTempaccount();
    }
    const findAccount = async () =>{
        try{
            const response = await fetch('http://localhost:8080/account/user?username=test', {
                method: "GET",
                headers: {
                    'FE_XP': 'react-frontend', 
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(user => {
                console.log(`User ID: ${user.id}, Username: ${user.username}`);
                });
            } else {
                console.log("No users found");
            }

        } catch(err){
            console.error(err);
        }
    }

    return (
        <>
            <button onClick={createAccount}>test run</button>
            <button onClick={findAccount}>test find</button>
        </>
    )
}

export default OverViewTextRoom;