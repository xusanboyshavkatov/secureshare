import { React, useState, useEffect } from 'react'
import './securemsg.css'
import { useParams } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import CryptoJS from 'crypto-js';

const Securmsg = () => {

    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [correctPassword, setCorrectPassword] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchMessage = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("msg")
                .select("msg")
                .eq("token", token)
                .single();

            if (error || !data) {
                setError("Bu xabar o'chirilgan yoki mavjud emas.");
                setLoading(false);
                return;
            }

            setMessage(data.msg);
            setLoading(false);
        };

        fetchMessage();
    }, [token]);

    const handleCheckPassword = async () => {
        const bytes = CryptoJS.AES.decrypt(message, password);
        const decryptedMSg = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedMSg) {
            setMessage(decryptedMSg)
            setShowMessage(true);
            setError("");

            // Tokenning statusini 'active' dan 'disabled' ga o'zgartirish
            const { error } = await supabase
                .from('msg')
                .update({ status: 'disabled' })
                .eq('token', token);

            if (error) {
                console.error("Status yangilashda xatolik:", error.message);
            }

            // Disable statusli yozuvlarni o'chirish
            const { deleteError } = await supabase
                .from('msg')
                .delete()
                .eq('status', 'disabled');

            if (deleteError) {
                console.error("Yozuvni o'chirishda xatolik:", deleteError.message);
            }

        } else {
            setError("Parol noto‘g‘ri!");
        }
    };


    const copymsg = async () =>{
        await navigator.clipboard.writeText(message)
        await alert("xabar muofaqiyatli nusxalandi")
    }

    const Msgpassword = () => {
        return (
            <div className="msg-password">
<h1>{error ? error : "Maxfiy xabar parollangan"}</h1>
                <div className="msg-password-container">
                    <input
                        type="password"
                        placeholder='Parol kiriting'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleCheckPassword}>Tasdiqlash</button>
                </div>
            </div>
        )

    };

    const Msg = () => {
        return (
            <div className="msg">
                <h1>Maxfiy xabar:</h1>
                <p>{message}</p>
                <button onClick={copymsg}>Xabar nusxlash</button>
            </div>
        )
    };



    return (
        <div className='Securmsg'>
            {showMessage ? Msg() : Msgpassword()}
        </div>
    )
}

export default Securmsg