import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import AddButton from "../components/AddButton";
import ListItem from "../components/ListItem";

const NoteListPage = () => {
    const [notes, setNotes] = useState([]); //! map yapacağımız için useState( "buraya bracket koyuyoruz [] " )

    //! React 18 useEffect twice bug

    let shouldLog = useRef(true);
    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
            getNotes();
        }
    }, []);

    // const getNotes = async () => {
    //     let response = await fetch('http://127.0.0.1:8000/api/notes/')
    //     let data = await response.json()
    //     console.log(data);
    //     setNotes(data)
    // }

    const getNotes = async () => {
        // await axios('http://127.0.0.1:8000/api/notes/')
        await axios
            .get("/api/notes/") //! bu şekilde kullabilmek için önce react-router-dom install et, sonra package.json 'da name kısmının altına "proxy":"http://127.0.0.1:8000/#/" bu girdiyi yazarız.
            .then((res) => {
                // console.log(res);
                setNotes(res.data);
            });
    };


    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, id) => (
                    <ListItem key={id} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    );
};

export default NoteListPage;
