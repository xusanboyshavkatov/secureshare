import { useState, React } from 'react';
import { supabase } from '../../../supabaseClient';
import './home.css'

const Home = () => {

    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [successLink, setSuccessLink] = useState(false);

    const generateToken = (length = 20) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    };

    const handleSubmit = async () => {
        const newToken = generateToken()
        setToken(newToken)
        const { data, error } = await supabase
            .from("msg")
            .insert([
                {
                    token: newToken,
                    password: password,
                    msg: message,
                },
            ]);

        if (error) {
            console.error("Xatolik:", error.message);
        } else {
            setSuccessLink(true);
            setPassword("");
            setMessage("");
            console.log("barchasi ishladi");
            console.log(token);
            console.log(newToken);
        }
    };

    async function copybtn() {
        const url = `https://secureshare.x-server.uz/secret/${token}`;
        await navigator.clipboard.writeText(url);
        alert(`Nusxalandi! Sizning havolangiz: ${url}`);
        await setSuccessLink(false)
    }
    return (
        <div className='app-container'>
            <h1 className='app-container-title'>Maxfiy maʼlumotlarni elektron pochta va chat jurnallaridan uzoqroq tuting.</h1>
            <h2 className='app-container-subtitle'>Parol, maxfiy xabar yoki shaxsiy havolani quyiga joylashtiring</h2>
            <div className="secret-message-create">
                <textarea type="text" placeholder='Maxfiy xabar shu yerga kiriting' className='secret-message-create-message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="secret-message-create-pass-btn">
                    <input type="password" placeholder='parol kiriting'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit}>Havola yaratish</button>
                </div>
                {successLink ? (
                    <div className="secret-message-create-link">
                        <h1>https://secureshare.x-server.uz/secret/{token}</h1>
                        <button onClick={copybtn}>Nusxalab olish</button>
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default Home