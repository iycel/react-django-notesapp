import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
    const [note, setNote] = useState(null);
    const { id } = useParams();
    let navigate = useNavigate();

    let shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
            getNote();
        }
    }, [id]);

    const getNote = async () => {
        if (id === 'new') return
        await axios(`/api/notes/${id}`).then((res) => setNote(res.data));
    };
    // let getNote = async () => {
    //     if (id === 'new') return

    //     let response = await fetch(`/api/notes/${id}/`)
    //     let data = await response.json()
    //     setNote(data)
    // }

    const handleChange = (e) => {
        setNote({ ...note, 'body': e.target.value });
        // console.log('Handle Change:', note)
    };

    const addNote = async () => {
        axios
            .post('/api/notes/', {
                headers: { 'Content-Type': 'application/json' }, body: note.body
            })
            .then((res) => setNote(res.data))
            .catch(err => {
                console.log("Can't Post!!");
                console.log(err);
            })
        // navigate('/')
    };

    const updateNote = async () => {
        try {
            const data = await axios
                .put(`/api/notes/${id}/`, {
                    headers: { 'Content-Type': 'application/json' }, body: note.body
                })
            setNote(data)
        } catch (error) {
            console.log(error);
        }
        // navigate('/')
    }



    const deleteNote = async () => {
        axios.delete(`/api/notes/${id}/`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => setNote(res.data))
            .catch(err => {
                console.log('Oh noooo!!');
                console.log(err);
            })
        navigate('/')
    };

    const handleSubmit = () => {
        console.log('NOTE:', note.body)
        if (id !== 'new' && !note.body === '') {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            addNote()
        }
        navigate('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {(id !== 'new') ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={handleChange} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;

